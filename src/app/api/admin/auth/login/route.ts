import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createAdminSessionToken,
  validateAdminPassword
} from "@/lib/authServer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || !validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Mot de passe administrateur incorrect." },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Connexion réussie.",
      token
    });

    // Set secure, HttpOnly cookie for server-side middleware validation
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Erreur login admin:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la connexion." },
      { status: 500 }
    );
  }
}
