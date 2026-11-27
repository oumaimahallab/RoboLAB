"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ArrowLeft,
  Package,
  Plus
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Product, Category } from "@/types";
import { useAdmin } from "@/context/AdminContext";

export default function CategoryCataloguePage() {
  const params = useParams();
  const categoryParam = (params?.category as string) || "all";
  const router = useRouter();

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<Category[]>(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { refreshTrigger, isAdmin, editMode, setEditingProduct } = useAdmin();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProductsList(data.products);
          if (data.categories) setCategoriesList(data.categories);
        }
      })
      .catch((err) => console.error("Erreur chargement:", err));
  }, [refreshTrigger]);

  const currentCategory = categoriesList.find(
    (c) => c.id === categoryParam || c.slug === categoryParam
  );

  const categoryName = currentCategory?.name || categoryParam;

  // Unique brands for this category
  const brands = useMemo(() => {
    const set = new Set<string>();
    productsList
      .filter((p) => p.category === categoryParam || categoryParam === "all")
      .forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [productsList, categoryParam]);

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      if (categoryParam !== "all" && product.category !== categoryParam) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesRef = product.reference.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesRef && !matchesBrand) return false;
      }
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }
      return true;
    });
  }, [productsList, categoryParam, searchQuery, selectedBrand]);

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-lime-700 font-medium transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/catalogue" className="hover:text-lime-700 font-medium transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">{categoryName}</span>
        </nav>

        {/* Category Header Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
                Gamme Spécialisée
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                {categoryName}
              </h1>
              {currentCategory?.description && (
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  {currentCategory.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && editMode && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct({
                      name: "",
                      reference: "",
                      brand: "Ohaus",
                      category: categoryParam,
                      categoryLabel: categoryName,
                      subcategory: "Général",
                      price: "Sur devis",
                      inStock: true,
                      image: "",
                      shortDescription: "",
                      description: "",
                      specifications: [{ name: "Spécification", value: "" }],
                      features: ["Conforme ISO / BPF"],
                      applications: ["Contrôle Qualité"]
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Ajouter dans cette catégorie</span>
                </button>
              )}

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Rechercher équipement, réf..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Quick other categories switch */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 no-scrollbar">
            <Link
              href="/catalogue"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              ← Tous les équipements
            </Link>
            {categoriesList.map((cat) => {
              const isCurrent = cat.id === categoryParam;
              return (
                <Link
                  key={cat.id}
                  href={`/catalogue/${cat.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                    isCurrent
                      ? "bg-lime-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>
              <strong>{filteredProducts.length}</strong> équipement(s) disponible(s) dans cette catégorie
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Aucun équipement trouvé</p>
              <p className="text-xs text-slate-400 mt-1">
                Aucun produit ne correspond à vos filtres dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
