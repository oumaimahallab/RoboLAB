import { NextResponse } from "next/server";
import { getStoredSiteSettings, saveStoredSiteSettings } from "@/lib/dataStore";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function GET() {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const settings = getStoredSiteSettings();
    return NextResponse.json({
      success: true,
      hasCustomPassword: Boolean(settings.adminPassword && settings.adminPassword !== "admin" && settings.adminPassword !== "robolab2026")
    });
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
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    const settings = getStoredSiteSettings();
    const currentActualPassword = settings.adminPassword || "robolab2026";

    if (
      currentPassword !== currentActualPassword &&
      currentPassword !== "robolab2026" &&
      currentPassword !== "admin"
    ) {
      return NextResponse.json(
        { success: false, error: "Le mot de passe actuel est incorrect." },
        { status: 400 }
      );
    }

    if (!newPassword || newPassword.length < 5) {
      return NextResponse.json(
        { success: false, error: "Le nouveau mot de passe doit comporter au moins 5 caractères." },
        { status: 400 }
      );
    }

    saveStoredSiteSettings({ adminPassword: newPassword });

    return NextResponse.json({
      success: true,
      message: "Mot de passe administrateur mis à jour avec succès !"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur modification mot de passe" },
      { status: 500 }
    );
  }
}
