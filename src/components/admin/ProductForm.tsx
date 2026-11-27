"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  Save,
  AlertCircle
} from "lucide-react";
import { Product, Category } from "@/types";

interface ProductFormProps {
  initialProduct?: Partial<Product>;
  isEdit?: boolean;
}

export default function ProductForm({ initialProduct, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialProduct?.name || "",
    reference: initialProduct?.reference || "",
    brand: initialProduct?.brand || "Ohaus",
    category: initialProduct?.category || "balances",
    categoryLabel: initialProduct?.categoryLabel || "Balances & Pesage de Précision",
    subcategory: initialProduct?.subcategory || "Balances Analytiques (0.1 mg)",
    price: initialProduct?.price || "Sur devis",
    inStock: initialProduct?.inStock !== undefined ? initialProduct.inStock : true,
    isPopular: initialProduct?.isPopular || false,
    image: initialProduct?.image || "",
    shortDescription: initialProduct?.shortDescription || "",
    description: initialProduct?.description || "",
    specifications: initialProduct?.specifications || [
      { name: "Portée max", value: "220 g" },
      { name: "Précision", value: "0.1 mg" }
    ],
    features: initialProduct?.features || ["Conforme ISO / BPF", "Écran tactile couleur"],
    applications: initialProduct?.applications || ["Contrôle Qualité", "Recherche"]
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Specifications helpers
  const handleAddSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), { name: "", value: "" }]
    }));
  };

  const handleUpdateSpec = (index: number, field: "name" | "value", val: string) => {
    setFormData((prev) => {
      const list = [...(prev.specifications || [])];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, specifications: list };
    });
  };

  const handleRemoveSpec = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== index)
    }));
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Erreur upload");
      }
    } catch {
      alert("Erreur réseau lors de l'upload de l'image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!formData.name || !formData.reference) {
      setError("Le nom et la référence du produit sont obligatoires.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        id: initialProduct?.id || formData.id
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1000);
      } else {
        setError(data.error || "Erreur lors de l'enregistrement du produit.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Return button & header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au catalogue</span>
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? "Enregistrement..." : isEdit ? "Enregistrer les Modifications" : "Créer le Produit"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/15 border border-red-500/30 text-red-300 rounded-2xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs flex items-center gap-2.5">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Produit enregistré avec succès ! Redirection en cours...</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-base font-bold text-white border-b border-slate-850 pb-4">
          Informations Générales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nom */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Désignation / Nom du Produit *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ex: Balance Analytique Ohaus Pioneer PX224"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          {/* Référence */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Référence Catalogue *
            </label>
            <input
              type="text"
              required
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="ex: PX224 / RB-OH-01"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          {/* Marque */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Marque Fabricant *
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="ex: Ohaus, Sartorius, Memmert, Testo, Robolab"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Catégorie Principale *
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                const val = e.target.value;
                const catMap: Record<string, string> = {
                  balances: "Balances & Pesage de Précision",
                  appareils: "Instruments & Appareils de Mesure",
                  optique: "Optique & Microscopie",
                  chimie: "Réactifs & Produits Chimiques",
                  consommables: "Consommables & Verrerie de Laboratoire",
                  mobilier: "Mobilier & Hottes de Sécurité"
                };
                setFormData({
                  ...formData,
                  category: val,
                  categoryLabel: catMap[val] || val
                });
              }}
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            >
              <option value="balances">Balances & Pesage de Précision</option>
              <option value="appareils">Instruments & Appareils de Mesure</option>
              <option value="optique">Optique & Microscopie</option>
              <option value="chimie">Réactifs & Produits Chimiques</option>
              <option value="consommables">Consommables & Verrerie</option>
              <option value="mobilier">Mobilier & Hottes</option>
            </select>
          </div>

          {/* Sous-catégorie */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Sous-catégorie (Précision)
            </label>
            <input
              type="text"
              value={formData.subcategory || ""}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              placeholder="ex: Balances Analytiques (0.1 mg)"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Prix (MAD HT ou &quot;Sur devis&quot;)
            </label>
            <input
              type="text"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder='ex: 18 500 DH HT ou "Sur devis"'
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          {/* Stock & Popular Toggles */}
          <div className="flex flex-col justify-end space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock !== false}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-4 h-4 accent-lime-500 rounded"
              />
              <span className="text-xs font-bold text-white">
                Produit En Stock (Expédition 24/48h)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.isPopular)}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-4 h-4 accent-lime-500 rounded"
              />
              <span className="text-xs font-bold text-slate-300">
                Mettre en avant sur la page d&apos;accueil (Populaire)
              </span>
            </label>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-3 pt-4 border-t border-slate-850">
          <label className="block text-xs font-bold text-slate-300">
            Photo de l&apos;Équipement
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-28 h-28 rounded-2xl bg-slate-900 border border-slate-750 overflow-hidden shrink-0">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Aperçu"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-1 text-[10px]">
                  <ImageIcon className="w-6 h-6" />
                  <span>Aucune photo</span>
                </div>
              )}
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <label className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-lime-400" />
                  <span>{uploadingImage ? "Upload en cours..." : "Choisir une Photo depuis mon PC"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>

                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Supprimer la photo
                  </button>
                )}
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">
                  Ou saisir une URL directe d&apos;image :
                </span>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4 pt-4 border-t border-slate-850">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Description Courte (Aperçu fiche & catalogue)
            </label>
            <input
              type="text"
              value={formData.shortDescription || ""}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="ex: Balance analytique 220g / 0.1mg avec cage de pesée en verre"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Description Détaillée
            </label>
            <textarea
              rows={4}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description technique complète, fonctionnement, avantages..."
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Specifications Table */}
        <div className="space-y-3 pt-4 border-t border-slate-850">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-300">
              Spécifications Techniques (Tableau Dynamique)
            </label>
            <button
              type="button"
              onClick={handleAddSpec}
              className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 text-lime-400 font-bold text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une ligne</span>
            </button>
          </div>

          <div className="space-y-2">
            {(formData.specifications || []).map((spec, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => handleUpdateSpec(idx, "name", e.target.value)}
                  placeholder="Paramètre (ex: Précision)"
                  className="w-1/2 text-xs p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleUpdateSpec(idx, "value", e.target.value)}
                  placeholder="Valeur (ex: 0.1 mg)"
                  className="w-1/2 text-xs p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 cursor-pointer"
                  title="Supprimer la ligne"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Link
          href="/admin/products"
          className="px-5 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? "Enregistrement..." : isEdit ? "Enregistrer les Modifications" : "Créer le Produit"}</span>
        </button>
      </div>
    </form>
  );
}
