import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedCmsContent,
  getDraftCmsContent,
  saveDraftCmsContent
} from "@/lib/cmsStore";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "published";

    if (mode === "draft") {
      const isAuth = await isAuthenticatedAdmin();
      if (isAuth) {
        return NextResponse.json({
          success: true,
          content: getDraftCmsContent(),
          isDraft: true
        });
      }
    }

    // Default: serve published version to public visitors
    return NextResponse.json({
      success: true,
      content: getPublishedCmsContent(),
      isDraft: false
    });
  } catch (error: any) {
    console.error("Erreur API CMS GET :", error);
    return NextResponse.json(
      { success: false, error: "Erreur lecture CMS" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Session administrateur requise." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = saveDraftCmsContent(body);

    return NextResponse.json({
      success: true,
      message: "Brouillon enregistré avec succès.",
      content: updated
    });
  } catch (error: any) {
    console.error("Erreur API CMS POST :", error);
    return NextResponse.json(
      { success: false, error: "Erreur enregistrement brouillon" },
      { status: 500 }
    );
  }
}
