"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import {
  X,
  Plus,
  Minus,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

import { siteConfig } from "@/config/site";

const LAB_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='%23f1f5f9'><rect width='600' height='400' fill='%23f1f5f9'/><path d='M285 100h30v60l45 80v60H240v-60l45-80v-60z' fill='%230284c7' opacity='0.7'/><circle cx='300' cy='240' r='16' fill='%2338bdf8'/><text x='300' y='340' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='16' font-weight='bold'>ROBOLAB INSTRUMENTS SCIENTIFIQUES</text></svg>";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToQuote } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(product?.image || LAB_FALLBACK);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0].label : undefined
  );

  // Sync image when product changes
  React.useEffect(() => {
    if (product) {
      setImgSrc(product.image);
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0].label : undefined);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    addToQuote(product, quantity, selectedVariant);
    onClose();
  };

  const getWhatsAppProductUrl = () => {
    const msg = `Bonjour ROBOLAB, je souhaite avoir des informations et un devis pour le produit suivant :\n\n- Nom : *${product.name}*\n- Réf : *${product.reference}*\n- Marque : ${product.brand}\n${selectedVariant ? `- Variante : ${selectedVariant}\n` : ""}- Quantité souhaitée : ${quantity}\n\nMerci de me répondre avec le prix et disponibilité.`;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Preview */}
            <div className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                unoptimized
                onError={() => setImgSrc(LAB_FALLBACK)}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                Garantie 2 ans ROBOLAB
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-lime-700 uppercase tracking-wider">
                  <span>{product.brand}</span>
                  <span>•</span>
                  <span>{product.categoryLabel}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1">{product.name}</h2>
                <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
                  <p className="text-xs font-mono text-slate-500">
                    Référence Catalogue : <span className="font-bold text-slate-800">{product.reference}</span>
                  </p>
                  <a
                    href={`/produit/${product.id}`}
                    className="text-xs font-bold text-lime-700 hover:text-lime-800 hover:underline flex items-center gap-1"
                  >
                    <span>Fiche complète</span>
                    <span>→</span>
                  </a>
                </div>
                {product.price && product.price !== "Sur devis" ? (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-lime-50 text-lime-800 border border-lime-300 rounded-lg text-xs font-mono font-bold">
                    <span>Prix indicatif :</span>
                    <span className="text-sm font-black">{product.price}</span>
                  </div>
                ) : (
                  <div className="mt-2 inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                    Tarif officiel sur devis
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Applications pills */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Secteurs d&apos;application :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-800 border border-sky-100"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sélectionner la capacité / variante :
                  </label>
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {product.variants.map((v) => (
                      <option key={v.sku} value={v.label}>
                        {v.label} (Réf: {v.sku})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Stepper & Add Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between border border-slate-300 rounded-xl px-2 py-1 bg-slate-50 w-32 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-slate-200 rounded text-slate-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-5 rounded-xl bg-slate-900 hover:bg-lime-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-lime-400" />
                  <span>Ajouter au Panier de Devis</span>
                </button>
              </div>

              <a
                href={getWhatsAppProductUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Demander par WhatsApp en 1 Clic</span>
              </a>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Caractéristiques Techniques Détaillées</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 px-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <span className="text-slate-500 font-medium">{spec.name}</span>
                  <span className="text-slate-900 font-bold text-right ml-2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features & Reassurance */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Avantages & Conformités</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reassurance Footer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-3 text-center text-[11px] text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span className="font-semibold">Certifié Métrologie</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-sky-600" />
              <span className="font-semibold">Livraison Maroc Express</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-sky-600" />
              <span className="font-semibold">SAV & Pièces Disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
