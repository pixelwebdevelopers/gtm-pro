import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/siteSettingsServer";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      activatedToday: settings.stats.activatedToday,
      runningNow: settings.stats.runningNow,
      liveBadgeText: settings.stats.liveBadgeText,
      activatedLabel: settings.stats.activatedLabel,
      runningLabel: settings.stats.runningLabel,
      lastUpdated: settings.updatedAt || new Date().toISOString(),
    });
  } catch (error) {
    console.error("[LIVE_STATS_GET_ERROR]", error);
    return NextResponse.json(
      { activatedToday: 17, runningNow: 2037 },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activatedToday, runningNow, adminKey } = body;

    // Verify either via session cookie or legacy ADMIN_SECRET
    const isAuthedSession = verifyAdminRequest(request);
    const expectedSecret = process.env.ADMIN_SECRET || "gtmpro-secret-2026";
    const isAuthedKey = adminKey && adminKey === expectedSecret;

    if (!isAuthedSession && !isAuthedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const current = await getSiteSettings();
    const updatedStats = {
      ...current.stats,
      ...(typeof activatedToday === "number" ? { activatedToday } : {}),
      ...(typeof runningNow === "number" ? { runningNow } : {}),
    };

    await saveSiteSettings({
      ...current,
      stats: updatedStats,
    });

    return NextResponse.json({ success: true, data: updatedStats });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
