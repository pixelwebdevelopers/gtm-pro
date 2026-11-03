import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { verifyPresetRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const file = url.searchParams.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Missing required parameter: file" },
        { status: 400 }
      );
    }

    // Security check: Must have valid preset unlock token or admin session
    if (!verifyPresetRequest(request)) {
      return NextResponse.json(
        {
          error:
            "Unauthorized. Preset files require an active GTM PRO license key. Enter your license key at /download-set-files to unlock.",
        },
        { status: 401 }
      );
    }

    // Path traversal defense
    const cleanFile = path.normalize(file).replace(/^(\.\.[\/\\])+/, "");
    if (cleanFile.includes("..")) {
      return NextResponse.json(
        { error: "Invalid file path specified." },
        { status: 400 }
      );
    }

    const baseDir = path.join(process.cwd(), "public", "downloads", "presets");
    const fullPath = path.resolve(baseDir, cleanFile);

    // Ensure path stays within presets directory
    if (!fullPath.startsWith(baseDir)) {
      return NextResponse.json(
        { error: "Access denied to requested path." },
        { status: 403 }
      );
    }

    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      return NextResponse.json(
        { error: "Requested preset file not found." },
        { status: 404 }
      );
    }

    const filename = path.basename(fullPath);
    const fileBuffer = fs.readFileSync(fullPath);
    const contentType = filename.endsWith(".zip")
      ? "application/zip"
      : "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[PRESET_DOWNLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Server error serving download." },
      { status: 500 }
    );
  }
}

