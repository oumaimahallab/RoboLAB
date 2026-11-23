"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import { Plus, Check } from "lucide-react";

const LAB_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f8fafc'><rect width='400' height='300' fill='%23f8fafc'/><path d='M185 70h30v40l35 60v50H150v-50l35-60V70z' fill='%2384cc16' opacity='0.7'/><circle cx='200' cy='180' r='12' fill='%23a3e635'/><text x='200' y='260' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='13' font-weight='600'>ROBOLAB TECHNOLOGY</text></svg>";

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToQuote } = useQuote();
  const [imgSrc, setImgSrc] = useState(product.image);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQuote(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="group bg-white rounded-xl border border-slate-100 hover:border-lime-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-slate-50 overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          unoptimized
          onError={() => setImgSrc(LAB_FALLBACK)}
          className="object-cover group-hover:scale-102 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 backdrop-blur-sm text-slate-800 shadow-xs border border-slate-100">
            {product.brand}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-mono">
            Réf: {product.reference}
          </span>
          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5 group-hover:text-lime-700 transition-colors">
            {product.name}
          </h3>

          {product.specifications.length > 0 && (
            <p className="text-[11px] text-slate-500 mt-2 truncate">
              {product.specifications[0].name}: <strong className="text-slate-700">{product.specifications[0].value}</strong>
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400 font-medium group-hover:text-lime-600 transition-colors">
            Fiche technique →
          </span>
          <button
            onClick={handleAdd}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              added
                ? "bg-lime-600 text-white"
                : "bg-slate-100 hover:bg-lime-600 hover:text-white text-slate-800"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-lime-600 group-hover:text-white" />
                <span>Devis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
