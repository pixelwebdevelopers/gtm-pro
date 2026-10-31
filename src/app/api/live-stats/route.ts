import { NextResponse } from "next/server";

// Default fallback data (can be controlled via environment variables or license server proxy)
let statsData = {
  activatedToday: process.env.NEXT_PUBLIC_DEFAULT_ACTIVATED_TODAY
    ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_ACTIVATED_TODAY, 10)
    : 17,
  runningNow: process.env.NEXT_PUBLIC_DEFAULT_RUNNING_NOW
    ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_RUNNING_NOW, 10)
    : 2037,
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json(statsData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activatedToday, runningNow, adminKey } = body;

    // Optional admin security check if ADMIN_SECRET is set
    const expectedSecret = process.env.ADMIN_SECRET || "gtmpro-secret-2026";
    if (adminKey && adminKey !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof activatedToday === "number") statsData.activatedToday = activatedToday;
    if (typeof runningNow === "number") statsData.runningNow = runningNow;
    statsData.lastUpdated = new Date().toISOString();

    return NextResponse.json({ success: true, data: statsData });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

