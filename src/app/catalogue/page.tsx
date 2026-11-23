"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  FileCheck,
  Check,
  ChevronDown
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/types";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categorie") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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
    PRODUCTS.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, []);

  // Extract all unique applications
  const applications = [
    "Agroalimentaire",
    "Pharmaceutique",
    "Recherche & Universités",
    "Contrôle Qualité",
    "Chimie",
    "Analyses Médicales",
    "Traitement des Eaux"
  ];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesRef = product.reference.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesRef && !matchesBrand && !matchesDesc) {
          return false;
        }
      }
      // Brand match
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }
      // Application match
      if (
        selectedApplication !== "all" &&
        !product.applications.some((a) => a.toLowerCase().includes(selectedApplication.toLowerCase()))
      ) {
        return false;
      }
      // Stock
      if (onlyInStock && !product.inStock) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedBrand, selectedApplication, onlyInStock]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedApplication("all");
    setOnlyInStock(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery !== "" ||
    selectedBrand !== "all" ||
    selectedApplication !== "all" ||
    onlyInStock;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Catalogue Matériel & Consommables
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                Équipements Scientifiques, Instruments & Réactifs
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Sélectionnez vos articles pour composer votre demande de devis en 1 clic.
              </p>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Rechercher par mot-clé, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden col-span-1">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-800 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                <span>Filtrer les produits ({filteredProducts.length} résultats)</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`col-span-1 lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Filter className="w-4 h-4 text-sky-600" />
                  <span>Filtres de recherche</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] font-semibold text-sky-600 hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* 1. Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Catégorie
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory === "all"
                        ? "bg-sky-50 text-sky-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>Toutes les catégories</span>
                    <span className="text-[11px] text-slate-400">({PRODUCTS.length})</span>
                  </button>
                  {CATEGORIES.map((cat) => {
                    const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? "bg-sky-50 text-sky-700 font-bold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{cat.name.split("&")[0]}</span>
                        <span className="text-[11px] text-slate-400">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Brand Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Marque & Fabricant
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">Toutes les marques</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Application Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Secteur d&apos;application
                </label>
                <select
                  value={selectedApplication}
                  onChange={(e) => setSelectedApplication(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">Tous les secteurs</option>
                  {applications.map((app) => (
                    <option key={app} value={app}>
                      {app}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Availability checkbox */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    Afficher uniquement en stock
                  </span>
                </label>
              </div>
            </div>

            {/* Support Callout Box */}
            <div className="bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Assistance Devis
              </span>
              <h4 className="text-sm font-bold leading-snug">
                Vous ne trouvez pas votre référence ?
              </h4>
              <p className="text-xs text-slate-300">
                Nos technico-commerciaux accèdent à plus de 10 000 références scientifiques auprès de nos partenaires européens.
              </p>
              <a
                href="https://wa.me/212661000000?text=Bonjour%20Robolab,%20je%20cherche%20une%20reference%20specifique"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center rounded-xl transition-colors"
              >
                Demander sur WhatsApp
              </a>
            </div>
          </aside>

          {/* Main Products Grid Area */}
          <main className="col-span-1 lg:col-span-3 space-y-6">
            {/* Active Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <div className="text-slate-600">
                Affichage de <strong className="text-slate-900">{filteredProducts.length}</strong>{" "}
                produit(s) correspondant à vos critères
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategory !== "all" && (
                    <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full font-medium flex items-center gap-1">
                      Catégorie : {selectedCategory}
                      <button onClick={() => setSelectedCategory("all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full font-medium flex items-center gap-1">
                      Recherche : &quot;{searchQuery}&quot;
                      <button onClick={() => setSearchQuery("")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedBrand !== "all" && (
                    <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full font-medium flex items-center gap-1">
                      Marque : {selectedBrand}
                      <button onClick={() => setSelectedBrand("all")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Aucun équipement ne correspond à votre recherche
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Essayez de modifier vos filtres ou contactez-nous pour commander sur mesure votre référence.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500 transition-colors"
                >
                  Réinitialiser tous les filtres
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
