import { NextResponse } from "next/server";
import {
  getStoredProducts,
  addOrUpdateProduct,
  deleteStoredProduct
} from "@/lib/dataStore";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function GET() {
  try {
    const products = getStoredProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur lecture produits" },
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
    if (!body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "Le nom et la catégorie sont obligatoires." },
        { status: 400 }
      );
    }
    const saved = addOrUpdateProduct(body);
    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur enregistrement produit" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé. Authentification admin requise." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID de produit manquant" },
        { status: 400 }
      );
    }
    const deleted = deleteStoredProduct(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur suppression produit" },
      { status: 500 }
    );
  }
}
