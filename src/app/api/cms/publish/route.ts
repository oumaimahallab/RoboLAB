import { NextResponse } from "next/server";
import { publishCmsContent, getPublishedCmsContent } from "@/lib/cmsStore";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function POST() {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Session administrateur requise." },
        { status: 401 }
      );
    }

    const published = publishCmsContent();

    return NextResponse.json({
      success: true,
      message: "Modifications publiées en direct avec succès sur le site ROBOLAB !",
      publishedAt: published.publishedAt,
      content: published
    });
  } catch (error: any) {
    console.error("Erreur API CMS Publish :", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la publication du CMS" },
      { status: 500 }
    );
  }
}
