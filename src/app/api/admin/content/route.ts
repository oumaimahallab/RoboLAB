import { NextResponse } from "next/server";
import { getStoredSiteSettings, saveStoredSiteSettings } from "@/lib/dataStore";

export async function GET() {
  try {
    const settings = getStoredSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur lecture paramètres" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = saveStoredSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur enregistrement paramètres" },
      { status: 500 }
    );
  }
}
