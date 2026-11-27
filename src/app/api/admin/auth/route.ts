import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createAdminSessionToken,
  validateAdminPassword
} from "@/lib/authServer";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Mot de passe administrateur incorrect." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      token
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur authentification" },
      { status: 500 }
    );
  }
}
