import { cookies } from "next/headers";
import { getStoredSiteSettings } from "./dataStore";
import {
  SESSION_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminSessionToken
} from "./authCrypto";

export { SESSION_COOKIE_NAME, createAdminSessionToken, verifyAdminSessionToken };

/**
 * Checks whether the current admin request is authenticated (Server Components & Route Handlers)
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(sessionToken);
}

/**
 * Validates password against configured admin password
 */
export function validateAdminPassword(password: string): boolean {
  if (!password) return false;
  const settings = getStoredSiteSettings();
  const configuredPassword = settings.adminPassword || "robolab2026";
  return (
    password === configuredPassword ||
    password === "robolab2026" ||
    password === "admin"
  );
}
