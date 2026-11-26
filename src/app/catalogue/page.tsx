"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  MessageCircle,
  Plus
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Product, Category } from "@/types";
import { siteConfig } from "@/config/site";
import { useAdmin } from "@/context/AdminContext";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categorie") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<Category[]>(CATEGORIES);
  const { refreshTrigger, isAdmin, editMode, setEditingProduct } = useAdmin();

  // Load dynamic products from live store
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProductsList(data.products);
          if (data.categories) setCategoriesList(data.categories);
        }
      })
      .catch((err) => console.error("Erreur chargement catalogue:", err));
  }, [refreshTrigger]);

  // Sync state if URL search params change
  useEffect(() => {
    const cat = searchParams.get("categorie");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Extract all unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    productsList.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [productsList]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesRef = product.reference.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesRef && !matchesBrand) {
          return false;
        }
      }
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }
      return true;
    });
  }, [productsList, selectedCategory, searchQuery, selectedBrand]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedBrand("all");
  };

  const hasActiveFilters =
    selectedCategory !== "all" || searchQuery !== "" || selectedBrand !== "all";

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Page Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
                Catalogue Matériel & Consommables
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                Nos Équipements de Laboratoire
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Cliquez sur « Demander le Prix » pour recevoir une offre immédiate par WhatsApp ou par email.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {isAdmin && editMode && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct({
                      name: "",
                      reference: "",
                      brand: "Ohaus",
                      category: selectedCategory !== "all" ? selectedCategory : "balances",
                      categoryLabel:
                        categoriesList.find((c) => c.id === selectedCategory)?.name ||
                        "Balances & Pesage de Précision",
                      subcategory: "Général",
                      price: "Sur devis",
                      inStock: true,
                      image: "",
                      shortDescription: "",
                      description: "",
                      specifications: [
                        { name: "Portée max", value: "" },
                        { name: "Précision", value: "" }
                      ],
                      features: ["Conforme ISO / BPF"],
                      applications: ["Contrôle Qualité"]
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
                  title="Ajouter directement un produit dans ce catalogue"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Ajouter un Produit</span>
                </button>
              )}

              {/* Quick search input */}
              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  placeholder="Rechercher équipement, réf..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Quick horizontal category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Tous les produits ({productsList.length})
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-lime-500 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.name.split("&")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden col-span-1">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-800 flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-lime-600" />
                <span>Filtrer par marque ({filteredProducts.length} résultats)</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar */}
          <aside
            className={`col-span-1 lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Filter className="w-4 h-4 text-lime-600" />
                  <span>Filtrer par Marque</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-semibold text-lime-700 hover:underline"
                  >
                    Effacer
                  </button>
                )}
              </div>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="all">Toutes les marques ({brands.length})</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">
                Besoin d&apos;aide ?
              </span>
              <h4 className="text-sm font-bold leading-snug">
                Vous cherchez une référence précise ?
              </h4>
              <p className="text-xs text-slate-300">
                Envoyez-nous la référence ou la photo de votre matériel, nous vous répondons immédiatement.
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20cherche%20une%20reference%20specifique`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp : {siteConfig.contact.whatsappDisplay}</span>
              </a>
            </div>
          </aside>

          {/* Main Products Grid */}
          <main className="col-span-1 lg:col-span-3 space-y-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Aucun équipement trouvé
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Essayez avec un autre mot-clé ou contactez notre équipe commerciale.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-lime-600 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Chargement du catalogue ROBOLAB...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
