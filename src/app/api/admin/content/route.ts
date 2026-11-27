import { NextResponse } from "next/server";
import { getStoredSiteSettings, saveStoredSiteSettings } from "@/lib/dataStore";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function GET() {
  try {
    const settings = getStoredSiteSettings();
    // Ne pas exposer le mot de passe dans le GET public
    const { adminPassword, ...safeSettings } = settings;
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur lecture paramètres" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Authentification admin requise." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = saveStoredSiteSettings(body);
    const { adminPassword, ...safeSettings } = updated;
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur enregistrement paramètres" },
      { status: 500 }
    );
  }
}
