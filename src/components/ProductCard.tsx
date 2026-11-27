"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { MessageCircle, FileText, CheckCircle2, Edit3, Trash2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAdmin } from "@/context/AdminContext";

const LAB_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f8fafc'><rect width='400' height='300' fill='%23f8fafc'/><path d='M185 70h30v40l35 60v50H150v-50l35-60V70z' fill='%2384cc16' opacity='0.7'/><circle cx='200' cy='180' r='12' fill='%23a3e635'/><text x='200' y='260' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='13' font-weight='600'>ROBOLAB TECHNOLOGY</text></svg>";

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const { isAdmin, editMode, setEditingProduct, setProductToDelete, triggerRefresh } = useAdmin();

  // Mettre à jour l'image locale si la prop change (après édition)
  React.useEffect(() => {
    setImgSrc(product.image);
  }, [product.image]);

  const handleToggleStock = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...product, inStock: product.inStock === false ? true : false };
    try {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      triggerRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const getWhatsAppProductUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Bonjour ROBOLAB, je souhaite recevoir le prix et la disponibilité pour :\n- Produit : *${product.name}*\n- Référence : *${product.reference}*\n- Marque : *${product.brand}*`;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="group bg-[#F8FAFC] hover:bg-white rounded-2xl border border-slate-300/60 hover:border-[#4D7C0F]/60 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer overflow-hidden relative"
    >
      {/* Admin In-Place CRUD Bar */}
      {isAdmin && editMode && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-950 text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-bold border-b border-lime-500/40 z-20"
        >
          <span className="text-[10px] text-lime-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400"></span>
            <span>ADMIN CRUD</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleStock}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                product.inStock !== false
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-amber-500 text-slate-950 hover:bg-amber-400"
              }`}
              title="Cliquer pour basculer le stock (En stock / Sur commande)"
            >
              {product.inStock !== false ? "✓ En Stock" : "⏳ Sur Cde"}
            </button>
            <button
              type="button"
              onClick={() => setEditingProduct(product)}
              className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
              title="Modifier ce produit (Nom, Prix, Photo, Réf)"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            </button>
            <button
              type="button"
              onClick={() => setProductToDelete(product)}
              className="p-1 text-slate-300 hover:text-red-400 hover:bg-red-500/20 rounded transition-colors"
              title="Supprimer définitivement"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>
      )}
      {/* Product Image & Badges (Dutscher Style) */}
      <div className="relative w-full h-48 bg-slate-50 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          unoptimized
          onError={() => setImgSrc(LAB_FALLBACK)}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Brand Tag (Top Left) */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 backdrop-blur-sm text-slate-800 shadow-xs border border-slate-200">
            {product.brand}
          </span>
        </div>

        {/* Stock Tag (Top Right - Dutscher style) */}
        <div className="absolute top-2.5 right-2.5">
          {product.inStock !== false ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>En Stock</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Sur Commande</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Reference line */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Réf: <strong className="text-slate-600 font-semibold">{product.reference}</strong></span>
            <span className="text-[10px] text-lime-700 font-bold uppercase">{product.categoryLabel.split("&")[0]}</span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1 group-hover:text-lime-700 transition-colors">
            {product.name}
          </h3>

          {product.specifications && product.specifications.length > 0 && (
            <p className="text-xs text-slate-500 mt-2 line-clamp-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <span className="text-slate-400">{product.specifications[0].name} :</span>{" "}
              <strong className="text-slate-700">{product.specifications[0].value}</strong>
            </p>
          )}
        </div>

        {/* Action Button: Instant WhatsApp Price Request */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {product.price && product.price !== "Sur devis" ? (
            <span
              onClick={(e) => {
                if (isAdmin && editMode) {
                  e.stopPropagation();
                  setEditingProduct(product);
                }
              }}
              className={`font-mono font-bold text-xs text-lime-800 bg-lime-50 border border-lime-200 px-2 py-1 rounded-md ${
                isAdmin && editMode ? "hover:border-lime-500 hover:bg-lime-100 cursor-pointer" : ""
              }`}
              title={isAdmin && editMode ? "Cliquer pour modifier le prix" : undefined}
            >
              {product.price}
            </span>
          ) : (
            <button
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fiche</span>
            </button>
          )}

          <a
            href={getWhatsAppProductUrl({ stopPropagation: () => {} } as React.MouseEvent)}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3.5 rounded-xl bg-[#4D7C0F] hover:bg-[#3F6212] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Demander le Prix</span>
          </a>
        </div>
      </div>
    </div>
  );
}
