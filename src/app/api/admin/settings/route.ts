import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/siteSettingsServer";

export async function GET(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("[ADMIN_SETTINGS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const success = await saveSiteSettings(payload);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update settings in MongoDB" },
        { status: 500 }
      );
    }

    const updated = await getSiteSettings();
    return NextResponse.json({
      success: true,
      message: "Site settings updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("[ADMIN_SETTINGS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Invalid payload or server error" },
      { status: 500 }
    );
  }
}
