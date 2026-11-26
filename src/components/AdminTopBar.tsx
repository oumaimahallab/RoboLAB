"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import {
  ShieldCheck,
  Plus,
  Edit3,
  FileCheck,
  LogOut,
  Sliders,
  Check,
  Sparkles,
  Layers
} from "lucide-react";

export default function AdminTopBar() {
  const pathname = usePathname();
  const {
    isAdmin,
    editMode,
    setEditMode,
    setEditingProduct,
    setIsTextEditorOpen,
    logout
  } = useAdmin();

  // Si pas connecté en tant qu'admin, ne rien afficher (invisible pour les clients normaux)
  if (!isAdmin) return null;

  const handleOpenAddProduct = () => {
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

  return (
    <div className="bg-slate-950 text-white border-b border-lime-500/40 text-xs py-2 px-4 sticky top-0 z-50 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse"></span>
            <span className="font-black text-lime-400 tracking-tight uppercase text-[11px]">
              ROBOLAB ADMIN
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              • Vue Visuelle Utilisateur avec CRUD Actif
            </span>
          </div>

          {/* Toggle Edit Mode */}
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1.5 ${
              editMode
                ? "bg-lime-500/20 text-lime-300 border-lime-500/40"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
            title="Activer ou masquer les boutons de modification directe sur les produits"
          >
            <Sliders className="w-3 h-3" />
            <span>{editMode ? "Boutons CRUD : Activés" : "Boutons CRUD : Masqués"}</span>
          </button>
        </div>

        {/* Center / Right: Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleOpenAddProduct}
            className="px-3 py-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Ajouter un Produit</span>
          </button>

          {/* Edit Texts Button */}
          <button
            type="button"
            onClick={() => setIsTextEditorOpen(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-lime-400" />
            <span>Modifier Textes & Coordonnées</span>
          </button>

          {/* Dashboard link */}
          {!pathname.startsWith("/admin") && (
            <Link
              href="/admin"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Tableau de Bord / Devis</span>
            </Link>
          )}

          {/* Logout / Switch to Public User View */}
          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 text-xs font-bold text-red-300 hover:text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors flex items-center gap-1.5 ml-1"
            title="Quitter le mode Admin et revenir à la vue utilisateur normale"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Vue Client (Quitter Admin)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
