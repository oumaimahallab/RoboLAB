"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";
import {
  X,
  Upload,
  Check,
  Trash2,
  AlertTriangle,
  Package,
  Plus,
  Phone,
  Globe,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import { Category, Product } from "@/types";
import { SiteSettings } from "@/lib/dataStore";

export default function AdminVisualModals() {
  const {
    isAdmin,
    editingProduct,
    setEditingProduct,
    productToDelete,
    setProductToDelete,
    isTextEditorOpen,
    setIsTextEditorOpen,
    triggerRefresh
  } = useAdmin();

  // Categories list
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((data) => {
          if (data.categories) setCategories(data.categories);
        })
        .catch(() => {});
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isTextEditorOpen) {
      setLoadingSettings(true);
      fetch("/api/admin/content")
        .then((r) => r.json())
        .then((data) => {
          if (data.settings) setSettings(data.settings);
        })
        .finally(() => setLoadingSettings(false));
    }
  }, [isTextEditorOpen]);

  if (!isAdmin) return null;

  // --- SAVE PRODUCT ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSavingProduct(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (data.success) {
        setEditingProduct(null);
        triggerRefresh();
      } else {
        alert(data.error || "Erreur enregistrement.");
      }
    } catch (err) {
      alert("Erreur de connexion lors de l'enregistrement.");
    } finally {
      setIsSavingProduct(false);
    }
  };

  // --- UPLOAD IMAGE FROM PC ---
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditingProduct((prev: Partial<Product> | null) => (prev ? { ...prev, image: data.url } : null));
      } else {
        alert(data.error || "Erreur lors du téléversement.");
      }
    } catch (err) {
      alert("Erreur réseau upload.");
    } finally {
      setUploadingImage(false);
    }
  };

  // --- CONFIRM DELETE PRODUCT ---
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(productToDelete.id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setProductToDelete(null);
        triggerRefresh();
      } else {
        alert(data.error || "Erreur lors de la suppression.");
      }
    } catch (err) {
      alert("Erreur réseau.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- SAVE SITE TEXTS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaved(true);
        triggerRefresh();
        setTimeout(() => {
          setSettingsSaved(false);
          setIsTextEditorOpen(false);
        }, 1200);
      }
    } catch (err) {
      alert("Erreur lors de l'enregistrement des textes.");
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. PRODUCT ADD / EDIT MODAL                               */}
      {/* ========================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-slate-900">
            {/* Sticky Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {editingProduct.id ? "Modifier l'Équipement" : "Ajouter un Nouvel Équipement"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Les modifications sont appliquées instantanément sur la page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5 overscroll-contain">
                {/* Row 1: Name & Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom du Produit / Désignation *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="Ex: Viscosimètre Rotatif Numérique Haute Précision"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Référence Catalogue *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.reference || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, reference: e.target.value })
                      }
                      placeholder="Ex: RB-VISCO-DIGI"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono font-bold focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 2: Brand, Category, Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Marque *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.brand || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, brand: e.target.value })
                      }
                      placeholder="Ex: Ohaus, Hanna, Memmert, IKA..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-semibold focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie *</label>
                    <select
                      value={editingProduct.category || "balances"}
                      onChange={(e) => {
                        const cat = categories.find((c) => c.id === e.target.value);
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                          categoryLabel: cat ? cat.name : e.target.value
                        });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prix (MAD HT ou &quot;Sur devis&quot;)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.price || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                      placeholder="Ex: 14 500 DH HT ou Sur devis"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 3: Image Upload from PC */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Photo de l&apos;Équipement
                    </label>
                    {editingProduct.image && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Photo active
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Preview */}
                    <div className="relative w-24 h-24 rounded-2xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                      {editingProduct.image ? (
                        <Image
                          src={editingProduct.image}
                          alt="Aperçu"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-slate-300">
                          <ImageIcon className="w-8 h-8 mx-auto" />
                          <span className="text-[9px] text-slate-400 block mt-1">Pas d&apos;image</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-1 space-y-2.5 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5 text-lime-400" />
                          <span>
                            {uploadingImage ? "Téléversement..." : "Choisir une Photo depuis mon PC"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            disabled={uploadingImage}
                            className="hidden"
                          />
                        </label>

                        {editingProduct.image && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                            className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            Supprimer la photo
                          </button>
                        )}
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1">
                          Ou saisir une URL directe d&apos;image :
                        </span>
                        <input
                          type="text"
                          value={editingProduct.image || ""}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, image: e.target.value })
                          }
                          placeholder="https://... ou /uploads/..."
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Stock toggle & Popular */}
                <div className="flex flex-wrap items-center gap-6 p-3 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock ?? true}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 accent-lime-600"
                    />
                    <span>Produit En Stock (Expédition 24/48h)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isPopular ?? false}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isPopular: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 accent-lime-600"
                    />
                    <span>Mettre en avant sur la page d&apos;accueil (Populaire)</span>
                  </label>
                </div>

                {/* Row 5: Short description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description Courte (Aperçu dans les listes)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.shortDescription || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                    }
                    placeholder="Ex: Mesure directe et continue de la viscosité dynamique en cP / mPa.s avec sonde de température intégrée."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                  />
                </div>

                {/* Row 6: Detailed description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description Détaillée & Spécifications
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    placeholder="Détails techniques complets, applications recommandées..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                  />
                </div>

                {/* Row 7: Specifications */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Caractéristiques Techniques (Spécifications)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentSpecs = editingProduct.specifications || [];
                        setEditingProduct({
                          ...editingProduct,
                          specifications: [...currentSpecs, { name: "", value: "" }]
                        });
                      }}
                      className="text-[11px] font-bold text-lime-800 bg-lime-50 hover:bg-lime-100 px-3 py-1 rounded-xl border border-lime-200 transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-lime-700" />
                      <span>Ajouter une caractéristique</span>
                    </button>
                  </div>

                  {editingProduct.specifications && editingProduct.specifications.length > 0 ? (
                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {editingProduct.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Ex: Portée max, Précision..."
                            value={spec.name}
                            onChange={(e) => {
                              const updated = [...editingProduct.specifications!];
                              updated[idx].name = e.target.value;
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                          />
                          <input
                            type="text"
                            placeholder="Ex: 220 g, 0.1 mg..."
                            value={spec.value}
                            onChange={(e) => {
                              const updated = [...editingProduct.specifications!];
                              updated[idx].value = e.target.value;
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProduct.specifications!.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">
                      Aucune caractéristique ajoutée. Cliquez sur le bouton ci-dessus pour en ajouter.
                    </p>
                  )}
                </div>
              </div>

              {/* Sticky Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  * Champs obligatoires
                </span>

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 bg-white border border-slate-300 rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProduct}
                    className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSavingProduct ? "Enregistrement..." : "Enregistrer les Modifications"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SOPHISTICATED DELETION CONFIRMATION MODAL             */}
      {/* ========================================================= */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 text-slate-900">
            {/* Header */}
            <div className="p-6 bg-red-50/70 border-b border-red-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200 shadow-xs">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full border border-red-200">
                  Confirmation de Suppression
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Supprimer ce produit du catalogue ?
                </h3>
                <p className="text-xs text-slate-500">
                  Cette action est irréversible et retirera immédiatement l&apos;article du catalogue public.
                </p>
              </div>
            </div>

            {/* Product Card Preview */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative w-14 h-14 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {productToDelete.image ? (
                    <Image
                      src={productToDelete.image}
                      alt={productToDelete.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-slate-500 block">
                    Réf : {productToDelete.reference} • {productToDelete.brand}
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {productToDelete.name}
                  </p>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {productToDelete.categoryLabel || productToDelete.category}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm">⚠️</span>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Toutes les spécifications, photos et fiches associées à cette référence seront effacées du système.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Conserver le Produit
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Suppression en cours..." : "Oui, Supprimer Définitivement"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. SITE TEXTS & CONTENT EDIT MODAL                        */}
      {/* ========================================================= */}
      {isTextEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Modifier les Textes Clés & Coordonnées
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ces informations sont mises à jour immédiatement sur tout le site public.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsTextEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveSettings} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5">
                {/* 1. Coordonnées */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lime-700 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Coordonnées Commerciales</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Numéro WhatsApp Officiel
                      </label>
                      <input
                        type="text"
                        value={settings.contactWhatsApp || ""}
                        onChange={(e) => setSettings({ ...settings, contactWhatsApp: e.target.value })}
                        placeholder="212679706224"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Téléphone Affiché
                      </label>
                      <input
                        type="text"
                        value={settings.contactPhone || ""}
                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        placeholder="+212 6 79 70 62 24"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail Réception des Devis
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail || ""}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      placeholder="commercial@robolab-tech.com"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono"
                    />
                  </div>
                </div>

                {/* 2. Textes Hero */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lime-700 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Grand Titre de la Page d&apos;Accueil</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Titre Principal
                      </label>
                      <input
                        type="text"
                        value={settings.heroHeadline || ""}
                        onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mot Mis en Valeur (Vert)
                      </label>
                      <input
                        type="text"
                        value={settings.heroHighlight || ""}
                        onChange={(e) => setSettings({ ...settings, heroHighlight: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-lime-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sous-titre descriptif
                    </label>
                    <textarea
                      rows={2}
                      value={settings.heroSubheadline || ""}
                      onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nombre de Références
                      </label>
                      <input
                        type="text"
                        value={settings.statReferences || ""}
                        onChange={(e) => setSettings({ ...settings, statReferences: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Délai de Livraison
                      </label>
                      <input
                        type="text"
                        value={settings.statDelivery || ""}
                        onChange={(e) => setSettings({ ...settings, statDelivery: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
                {settingsSaved ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Modifications enregistrées !</span>
                  </span>
                ) : (
                  <span></span>
                )}

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsTextEditorOpen(false)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 bg-white border border-slate-300 rounded-xl transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-colors"
                  >
                    Sauvegarder les Textes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
