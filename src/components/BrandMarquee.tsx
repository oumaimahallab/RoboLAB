import React from "react";
import { PARTNER_BRANDS } from "@/data/products";

export default function BrandMarquee() {
  return (
    <section className="py-14 bg-slate-50/70 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-700">
            Partenariats & Marques Mondiales
          </p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
            Les Plus Grands Fabricants Scientifiques Représentés au Maroc
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PARTNER_BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="px-5 py-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center min-w-[130px] hover:border-lime-400 hover:shadow-sm transition-all group"
            >
              <span className="font-black text-sm tracking-wider text-slate-800 group-hover:text-lime-700 transition-colors">
                {brand.logo}
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                {brand.country}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
