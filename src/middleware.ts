import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept direct static access to presets and route through secure /api/download check
  if (pathname.startsWith("/downloads/presets/")) {
    const filePath = pathname.replace(/^\/downloads\/presets\//, "");
    if (!filePath) {
      return NextResponse.redirect(new URL("/download-set-files", request.url));
    }

    const downloadUrl = request.nextUrl.clone();
    downloadUrl.pathname = "/api/download";
    downloadUrl.searchParams.set("file", filePath);
    return NextResponse.rewrite(downloadUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/downloads/presets/:path*"],
};

