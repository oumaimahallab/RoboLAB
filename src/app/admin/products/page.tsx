"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit3,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Filter
} from "lucide-react";
import { Product, Category } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Erreur chargement produits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const flashNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleToggleStock = async (product: Product) => {
    const updated = { ...product, inStock: !product.inStock };
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
        flashNotification(
          `Disponibilité mise à jour : "${product.name}" est désormais ${
            updated.inStock ? "en stock" : "sur commande"
          }.`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(productToDelete.id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        flashNotification(`Le produit "${productToDelete.name}" a été définitivement supprimé.`);
        setProductToDelete(null);
      } else {
        alert(data.error || "Erreur lors de la suppression.");
      }
    } catch (err) {
      alert("Erreur de connexion lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    if (stockFilter === "inStock" && p.inStock === false) return false;
    if (stockFilter === "outOfStock" && p.inStock !== false) return false;

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.reference.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
            <Package className="w-6 h-6 text-lime-400" />
            <span>Catalogue Produits & Équipements</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gérez la liste officielle, les prix, les photos et les disponibilités en temps réel.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="px-5 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter un Produit</span>
        </Link>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Search & Filters Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher nom, réf, marque (ex: PX224, Ohaus)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-750 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-slate-200 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          >
            <option value="all">Toutes les Catégories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="text-xs p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-slate-200 focus:ring-2 focus:ring-lime-500 focus:outline-none"
          >
            <option value="all">Tous les stocks</option>
            <option value="inStock">En Stock uniquement</option>
            <option value="outOfStock">Sur Commande uniquement</option>
          </select>

          <button
            onClick={loadProducts}
            disabled={loading}
            className="p-2.5 bg-slate-900 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors shrink-0 self-center"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <span className="text-xs text-slate-400 self-center">
          <strong>{filteredProducts.length}</strong> équipement(s)
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-850">
            <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              <tr>
                <th className="py-3.5 px-4">Photo</th>
                <th className="py-3.5 px-4">Référence</th>
                <th className="py-3.5 px-4">Désignation</th>
                <th className="py-3.5 px-4">Marque</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Prix Public</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  {/* Photo */}
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Ref */}
                  <td className="py-3 px-4 font-mono font-bold text-lime-400">
                    {p.reference}
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4 max-w-xs font-semibold text-white">
                    <p className="line-clamp-2">{p.name}</p>
                    {p.shortDescription && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 font-normal mt-0.5">
                        {p.shortDescription}
                      </p>
                    )}
                  </td>

                  {/* Brand */}
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    <span className="bg-slate-900 px-2 py-1 rounded-md border border-slate-800 text-[11px]">
                      {p.brand}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-slate-400">
                    <span className="block text-slate-300">{p.categoryLabel || p.category}</span>
                    <span className="text-[10px] text-slate-500">{p.subcategory}</span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span
                      className={`font-mono font-bold text-xs ${
                        p.price && p.price !== "Sur devis"
                          ? "text-lime-400 bg-lime-500/10 border border-lime-500/20 px-2 py-0.5 rounded-md inline-block"
                          : "text-slate-400"
                      }`}
                    >
                      {p.price || "Sur devis"}
                    </span>
                  </td>

                  {/* Stock Toggle */}
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStock(p)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                        p.inStock !== false
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30"
                      }`}
                      title="Cliquer pour basculer la disponibilité"
                    >
                      {p.inStock !== false ? "✓ En Stock" : "⏳ Sur Commande"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/produit/${p.id}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="Voir la fiche publique"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Modifier les données"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setProductToDelete(p)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Supprimer définitivement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    Aucun produit trouvé correspondant à vos critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sophisticated Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  Confirmer la suppression ?
                </h3>
                <p className="text-xs text-slate-400">
                  Êtes-vous sûr de vouloir supprimer définitivement ce produit du catalogue ROBOLAB ?
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                {productToDelete.image ? (
                  <Image
                    src={productToDelete.image}
                    alt={productToDelete.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Package className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0 text-xs">
                <p className="font-bold text-white truncate">{productToDelete.name}</p>
                <p className="text-slate-400 font-mono text-[11px]">{productToDelete.reference}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/20 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <span>Suppression...</span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer Définitivement</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
