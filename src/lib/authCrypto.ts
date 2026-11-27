// Portable Web Crypto helper for token generation and verification
// Works in Next.js Edge Middleware, Node.js Server Components, and API Route Handlers

export const SESSION_COOKIE_NAME = "robolab_admin_session";
const SECRET_SALT = "robolab_secret_salt_2026_scientific_instruments";

function buf2hex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_SALT),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates an HMAC signed admin session token: `${timestamp}:${random}.${signature}`
 */
export async function createAdminSessionToken(): Promise<string> {
  const timestamp = Date.now();
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const randomHex = buf2hex(randomBytes.buffer);

  const payload = `${timestamp}:${randomHex}`;
  const enc = new TextEncoder();
  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const signatureHex = buf2hex(signatureBuffer);

  return `${payload}.${signatureHex}`;
}

/**
 * Verifies an HMAC signed admin session token.
 * Checks validity and expiration (7 days).
 */
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, signatureHex] = parts;

    const [timestampStr] = payload.split(":");
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Check expiration (7 days)
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) {
      return false;
    }

    const enc = new TextEncoder();
    const key = await getHmacKey();
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    const expectedSignatureHex = buf2hex(signatureBuffer);

    return signatureHex === expectedSignatureHex;
  } catch {
    return false;
  }
}
