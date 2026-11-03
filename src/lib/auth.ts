import crypto from "crypto";

const SESSION_COOKIE_NAME = "gtm_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "gtm_pro_fallback_secret_key_2026_xyz98234"
  );
}

export interface SessionPayload {
  username: string;
  createdAt: number;
  expiresAt: number;
}

export function createSessionToken(username: string): string {
  const secret = getSecretKey();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    username,
    createdAt: now,
    expiresAt: now + SESSION_MAX_AGE,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): SessionPayload | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadBase64, providedSig] = parts;
  const secret = getSecretKey();

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(providedSig), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const jsonStr = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload: SessionPayload = JSON.parse(jsonStr);

    const now = Math.floor(Date.now() / 1000);
    if (payload.expiresAt < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const key = parts.shift()?.trim();
    if (key) {
      const val = parts.join("=").trim();
      list[key] = decodeURIComponent(val);
    }
  });

  return list;
}

export function verifyAdminRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies[SESSION_COOKIE_NAME];
  const payload = verifySessionToken(token);
  return payload !== null;
}

export const PRESET_COOKIE_NAME = "gtm_preset_access";
export const PRESET_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export function createPresetDownloadToken(): string {
  const secret = getSecretKey();
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    scope: "preset_download",
    createdAt: now,
    expiresAt: now + PRESET_TOKEN_MAX_AGE,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

export function verifyPresetDownloadToken(
  token: string | null | undefined
): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadBase64, providedSig] = parts;
  const secret = getSecretKey();

  const expectedSig = crypto
    .createHmac("sha256", secret)
    .update(payloadBase64)
    .digest("base64url");

  if (providedSig.length !== expectedSig.length) return false;

  try {
    if (
      !crypto.timingSafeEqual(
        Buffer.from(providedSig),
        Buffer.from(expectedSig)
      )
    ) {
      return false;
    }

    const jsonStr = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr);

    const now = Math.floor(Date.now() / 1000);
    if (payload.scope !== "preset_download" || payload.expiresAt < now) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function verifyPresetRequest(request: Request): boolean {
  // 1. Allow authenticated admin
  if (verifyAdminRequest(request)) {
    return true;
  }

  // 2. Check query parameter token
  try {
    const url = new URL(request.url);
    const tokenParam = url.searchParams.get("token");
    if (tokenParam && verifyPresetDownloadToken(tokenParam)) {
      return true;
    }
  } catch {
    // URL parsing fallback
  }

  // 3. Check preset access cookie
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const cookieToken = cookies[PRESET_COOKIE_NAME];
  if (cookieToken && verifyPresetDownloadToken(cookieToken)) {
    return true;
  }

  // 4. Check Authorization: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    if (verifyPresetDownloadToken(bearerToken)) {
      return true;
    }
  }

  return false;
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };
