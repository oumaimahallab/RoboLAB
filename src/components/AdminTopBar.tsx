"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { useCms } from "@/context/CmsContext";
import {
  Plus,
  Eye,
  LayoutDashboard,
  LogOut,
  Save,
  Rocket,
  Sliders,
  Check,
  AlertTriangle,
  ChevronDown
} from "lucide-react";

export default function AdminTopBar() {
  const pathname = usePathname();
  const {
    isAdmin,
    viewMode,
    setViewMode,
    setEditingProduct,
    logout
  } = useAdmin();

  const {
    hasUnpublishedChanges,
    publishChanges,
    isPublishing,
    statusMessage
  } = useCms();

  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  // If on /admin/* back-office pages, hide this visual bar
  if (pathname?.startsWith("/admin")) return null;

  // If not authenticated admin, never show anything
  if (!isAdmin) return null;

  // In "Vue Client" mode, hide top bar completely
  if (viewMode === "client") return null;

  const handleOpenAddProduct = () => {
    setAddMenuOpen(false);
    setEditingProduct({
      name: "",
      reference: "",
      brand: "Ohaus",
      category: "balances",
      categoryLabel: "Balances & Pesage de Précision",
      subcategory: "Balances Analytiques (0.1 mg)",
      price: "Sur devis",
      inStock: true,
      image: "",
      shortDescription: "",
      description: "",
      specifications: [
        { name: "Portée max", value: "220 g" },
        { name: "Précision", value: "0.1 mg" }
      ],
      features: ["Conforme ISO / BPF"],
      applications: ["Contrôle Qualité", "Recherche"]
    });
  };

  const handleConfirmPublish = async () => {
    setShowPublishConfirm(false);
    await publishChanges();
  };

  return (
    <aside aria-label="Bandeau Administration ROBOLAB" className="bg-slate-950 text-white border-b border-lime-500/40 text-xs py-2 px-4 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="font-black text-lime-400 tracking-tight uppercase text-[11px]">
              ROBOLAB CMS
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("editor")}
              className={`px-2.5 py-1 rounded-md text-[10px] font-black transition-all ${
                viewMode === "editor"
                  ? "bg-lime-500 text-slate-950 shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mode Édition
            </button>
            <button
              type="button"
              onClick={() => setViewMode("client")}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-400 hover:text-white transition-all"
              title="Prévisualiser le site tel que le client le voit"
            >
              Aperçu Client
            </button>
          </div>

          {/* Draft vs Published State Indicator */}
          <span
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
              hasUnpublishedChanges
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                hasUnpublishedChanges ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <span>{hasUnpublishedChanges ? "Brouillon non publié" : "Site à jour (Publié)"}</span>
          </span>
        </div>

        {/* Center / Right: Action Commands */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Add Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAddMenuOpen(!addMenuOpen)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-lg text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-lime-400" />
              <span>Ajouter</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {addMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-48 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-1.5 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-lime-400" />
                  <span>+ Nouveau Produit</span>
                </button>
                <Link
                  href="/admin/products/create"
                  onClick={() => setAddMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                >
                  <span>Fiche Produit Complète</span>
                </Link>
              </div>
            )}
          </div>

          {/* Publish Button */}
          <button
            type="button"
            onClick={() => setShowPublishConfirm(true)}
            disabled={isPublishing}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
              hasUnpublishedChanges
                ? "bg-lime-500 hover:bg-lime-400 text-slate-950 shadow-lime-500/20 animate-bounce-subtle"
                : "bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-750"
            }`}
            title="Déployer les modifications pour tous les visiteurs"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>{isPublishing ? "Publication..." : "Publier le Site"}</span>
          </button>

          {/* View Client */}
          <button
            type="button"
            onClick={() => setViewMode("client")}
            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Masquer les outils et voir le site exactement comme un client sans vous déconnecter"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Vue Client</span>
          </button>

          {/* Dashboard Link */}
          <Link
            href="/admin/dashboard"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-750 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
            title="Consulter les devis reçus et statistiques"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-lime-400" />
            <span>Dashboard</span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={() => logout()}
            className="px-2.5 py-1.5 text-xs font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors flex items-center gap-1 ml-1 cursor-pointer"
            title="Quitter la session administrateur"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal Before Publishing */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-lime-500/15 border border-lime-500/30 text-lime-400 rounded-2xl shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Publier les modifications en ligne ?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toutes vos modifications de textes, bannières et coordonnées deviendront immédiatement visibles par tous les visiteurs du site.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPublishConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmPublish}
                className="px-5 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/20 transition-colors flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                <span>Confirmer & Publier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
