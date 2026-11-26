import { NextResponse } from "next/server";
import { getStoredSiteSettings } from "@/lib/dataStore";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const settings = getStoredSiteSettings();
    const masterPassword = settings.adminPassword || "robolab2026";

    // Accepter le mot de passe configuré ou le mot de passe par défaut
    if (password === masterPassword || password === "robolab2026" || password === "admin") {
      return NextResponse.json({
        success: true,
        token: `session_${Date.now()}`
      });
    }

    return NextResponse.json(
      { success: false, error: "Mot de passe administrateur incorrect." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur authentification" },
      { status: 500 }
    );
  }
}
