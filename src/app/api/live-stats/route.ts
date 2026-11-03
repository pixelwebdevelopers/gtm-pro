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
  // Strict admin check on server — only authenticated admin sessions can modify live stats
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { activatedToday, runningNow } = body;

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
