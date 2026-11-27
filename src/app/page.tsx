"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Scale,
  Gauge,
  Microscope,
  FlaskConical,
  Atom,
  Package,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useCms } from "@/context/CmsContext";
import EditableSection from "@/components/cms/EditableSection";

export default function HomePage() {
  const { content } = useCms();
  const hero = content.hero;
  const categoryCards = content.categoryCards || [];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Scale":
        return <Scale className="w-5 h-5 text-[#4D7C0F]" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-[#4D7C0F]" />;
      case "Microscope":
        return <Microscope className="w-5 h-5 text-[#4D7C0F]" />;
      case "FlaskConical":
        return <FlaskConical className="w-5 h-5 text-[#4D7C0F]" />;
      case "Atom":
        return <Atom className="w-5 h-5 text-[#4D7C0F]" />;
      default:
        return <Package className="w-5 h-5 text-[#4D7C0F]" />;
    }
  };

  return (
    <div className="bg-[#EEF2F6] min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* ========================================================= */}
      {/* 1. ARCHITECTURAL SPLIT HERO — Aluminium Satiné & Sauge    */}
      {/* ========================================================= */}
      <EditableSection sectionId="hero" title="Bannière Hero & Accroche">
        <section className="relative overflow-hidden pt-10 pb-12 lg:pt-16 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Crisp Editorial Copy */}
              <div className="lg:col-span-5 space-y-6">
                {/* Refined Sage Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7EFE0] border border-[#C8DAB8] text-[#3F6212] text-[11px] font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#4D7C0F]" />
                  <span>ROBOLAB TECHNOLOGY MAROC</span>
                </div>

                {/* Clean High-Contrast Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-900 leading-[1.15]">
                  Votre partenaire en solutions de{" "}
                  <span className="text-[#4D7C0F]">laboratoire</span>
                </h1>

                {/* Concise Subheadline */}
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                  {hero.subheadline ||
                    "Innovation, fiabilité et performance au service des laboratoires de contrôle qualité, recherche et industrie au Maroc."}
                </p>

                {/* Balanced Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link
                    href={hero.primaryButtonLink || "/catalogue"}
                    className="px-6 py-3.5 rounded-full bg-[#4D7C0F] hover:bg-[#3F6212] text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>{hero.primaryButtonText || "Découvrir notre catalogue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={hero.secondaryButtonLink || "/contact"}
                    className="px-6 py-3.5 rounded-full bg-[#F8FAFC] hover:bg-white text-slate-700 font-semibold text-xs border border-slate-300/80 hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-[#4D7C0F]" />
                    <span>{hero.secondaryButtonText || "Nous contacter"}</span>
                  </Link>
                </div>

                {/* Single, Non-Redundant Key Trust Metrics */}
                <div className="pt-6 border-t border-slate-300/70 grid grid-cols-3 gap-4">
                  <div>
                    <strong className="text-slate-900 text-lg font-black block leading-none">
                      2 500+
                    </strong>
                    <span className="text-slate-600 text-[11px] mt-1 block">
                      Références en stock
                    </span>
                  </div>
                  <div className="border-l border-slate-300/70 pl-4">
                    <strong className="text-slate-900 text-lg font-black block leading-none">
                      ISO & CE
                    </strong>
                    <span className="text-slate-600 text-[11px] mt-1 block">
                      Certificats & Traçabilité
                    </span>
                  </div>
                  <div className="border-l border-slate-300/70 pl-4">
                    <strong className="text-slate-900 text-lg font-black block leading-none">
                      24 / 48h
                    </strong>
                    <span className="text-slate-600 text-[11px] mt-1 block">
                      Livraison Maroc
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Unobstructed Laboratory Showcase */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-[#E4E9F0] border border-slate-300/70 shadow-lg shadow-slate-300/50">
                  <Image
                    src={hero.backgroundImage || "/images/hero-robolab-lab.jpg"}
                    alt="Laboratoire ROBOLAB TECHNOLOGY"
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                  />

                  {/* Subtle floating pearl badge in bottom-left corner */}
                  <div className="hidden sm:flex items-center gap-2.5 absolute bottom-4 left-4 px-4 py-2.5 rounded-2xl bg-[#F8FAFC]/92 backdrop-blur-md border border-slate-200/80 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-[#E7EFE0] border border-[#C8DAB8] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#4D7C0F]" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[11px] font-bold text-slate-900">
                        Métrologie & SAV Certifié
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Casablanca • Agadir • Tanger
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* ========================================================= */}
      {/* 2. MINIMAL SPECIALTY QUICK-ACCESS BAR                     */}
      {/* ========================================================= */}
      {categoryCards.length > 0 && (
        <EditableSection sectionId="categoryCards" title="Accès Rapide Familles">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {categoryCards.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalogue/${cat.slug}`}
                  className="group p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-slate-300/60 hover:border-[#4D7C0F]/50 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-[#EEF2F6] group-hover:bg-[#E7EFE0] border border-slate-200/80 group-hover:border-[#C8DAB8] transition-colors shrink-0">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h2 className="text-xs font-bold text-slate-800 group-hover:text-[#3F6212] transition-colors line-clamp-2 leading-snug">
                      {cat.name}
                    </h2>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4D7C0F] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </EditableSection>
      )}
    </div>
  );
}
