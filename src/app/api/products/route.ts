import { NextResponse } from "next/server";
import { getStoredProducts, getStoredCategories } from "@/lib/dataStore";

export async function GET() {
  try {
    const products = getStoredProducts();
    const categories = getStoredCategories();
    return NextResponse.json({
      success: true,
      total: products.length,
      products,
      categories
    });
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Impossible de charger les produits" },
      { status: 500 }
    );
  }
}
