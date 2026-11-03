import { NextResponse } from "next/server";
import {
  createPresetDownloadToken,
  verifyPresetDownloadToken,
  PRESET_COOKIE_NAME,
  PRESET_TOKEN_MAX_AGE,
  parseCookies,
} from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tokenParam = url.searchParams.get("token");

    const cookieHeader = request.headers.get("cookie");
    const cookies = parseCookies(cookieHeader);
    const cookieToken = cookies[PRESET_COOKIE_NAME];

    const token = tokenParam || cookieToken;

    if (token && verifyPresetDownloadToken(token)) {
      return NextResponse.json({
        valid: true,
        authenticated: true,
      });
    }

    return NextResponse.json(
      { valid: false, authenticated: false },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: "Validation error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { licenseKey } = data;

    if (!licenseKey || typeof licenseKey !== "string") {
      return NextResponse.json(
        { valid: false, error: "License key is required." },
        { status: 400 }
      );
    }

    // Keep key strictly on server (from environment or default fallback)
    const expectedKey = (
      process.env.PRESET_UNLOCK_KEY ||
      process.env.NEXT_PUBLIC_PRESET_UNLOCK_KEY ||
      "GTEA-J8M7B-SHVRL-3P9WK"
    ).trim();

    const inputKey = licenseKey.trim();

    if (inputKey.toUpperCase() === expectedKey.toUpperCase()) {
      const token = createPresetDownloadToken();

      const response = NextResponse.json({
        valid: true,
        token,
        message: "License key verified successfully.",
      });

      // Set cookie for browser file downloads
      response.cookies.set({
        name: PRESET_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: PRESET_TOKEN_MAX_AGE,
      });

      return response;
    }

    return NextResponse.json(
      {
        valid: false,
        error: "Invalid license key. Please check your key and try again.",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("[VERIFY_LICENSE_API_ERROR]", error);
    return NextResponse.json(
      { valid: false, error: "Failed to verify key. Please try again." },
      { status: 500 }
    );
  }
}
