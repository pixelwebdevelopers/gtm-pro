import { NextResponse } from "next/server";

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

    const expectedKey = (
      process.env.PRESET_UNLOCK_KEY ||
      process.env.NEXT_PUBLIC_PRESET_UNLOCK_KEY ||
      "GTEA-J8M7B-SHVRL-3P9WK"
    ).trim();

    const inputKey = licenseKey.trim();

    if (inputKey.toUpperCase() === expectedKey.toUpperCase()) {
      return NextResponse.json({
        valid: true,
        message: "License key verified successfully.",
      });
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

