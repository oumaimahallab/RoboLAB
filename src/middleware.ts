import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifyAdminSessionToken } from "./lib/authCrypto";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /api/admin/* endpoints
  if (pathname.startsWith("/api/admin")) {
    // Allow public auth endpoints
    if (
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/logout" ||
      pathname === "/api/admin/auth/me" ||
      pathname === "/api/admin/auth" // fallback compatibility
    ) {
      return NextResponse.next();
    }

    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Accès refusé. Session administrateur requise."
        },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Protect /admin/* UI routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);

    // If visiting /admin/login
    if (pathname === "/admin/login") {
      // If already logged in, redirect to dashboard
      if (isValid) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // For any other /admin/* page, if not authenticated -> redirect to /admin/login
    if (!isValid) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If visiting exact /admin root -> redirect to /admin/dashboard
    if (pathname === "/admin" || pathname === "/admin/") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
