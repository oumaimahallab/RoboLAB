import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { PARTNER_BRANDS } from "@/data/products";

interface BrandMarqueeProps {
  showTitle?: boolean;
  className?: string;
}

export default function BrandMarquee({ showTitle = true, className = "" }: BrandMarqueeProps) {
  return (
    <section className={`py-14 bg-[#E4E9F0]/60 border-y border-slate-300/60 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D7C0F]">
              Partenariats & Marques Mondiales
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
              Les Plus Grands Fabricants Scientifiques Représentés au Maroc
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Cliquez sur une marque pour découvrir ses instruments et consommables disponibles dans notre catalogue.
            </p>
          </div>
        )}

        {/* Interactive Brand Cards Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PARTNER_BRANDS.map((brand, idx) => (
            <Link
              key={idx}
              href={`/catalogue?search=${encodeURIComponent(brand.name)}`}
              className="px-5 py-3.5 bg-[#F8FAFC] hover:bg-white rounded-2xl border border-slate-300/60 hover:border-[#4D7C0F]/60 shadow-2xs hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[140px] group cursor-pointer"
              title={`Voir les produits ${brand.name} dans le catalogue`}
            >
              <span className="font-black text-xs md:text-sm tracking-wider text-slate-800 group-hover:text-[#3F6212] transition-colors">
                {brand.logo}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-1 flex items-center gap-1 group-hover:text-[#4D7C0F] transition-colors">
                <Globe className="w-2.5 h-2.5" />
                <span>{brand.country}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Quick Link to Catalog */}
        <div className="mt-8 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#3F6212] hover:bg-[#E7EFE0] bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#C8DAB8] transition-all cursor-pointer"
          >
            <span>Explorer tous les produits par marques dans le catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
