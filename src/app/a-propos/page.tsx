import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Wrench,
  Clock,
  MapPin,
  Phone
} from "lucide-react";
import BrandMarquee from "@/components/BrandMarquee";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "À Propos de ROBOLAB | Partenaire en Solutions et Équipements de Laboratoire au Maroc",
  description:
    "Découvrez ROBOLAB Maroc : notre mission, notre plateforme logistique dédiée, nos partenariats constructeurs mondiaux et nos agences à Casablanca, Agadir et Tanger.",
};

export default function AProposPage() {
  const stats = [
    { value: "2 500+", label: "Références en stock" },
    { value: "450+", label: "Laboratoires clients" },
    { value: "15+", label: "Constructeurs mondiaux" },
    { value: "100%", label: "Conformité ISO & CE" },
  ];

  const pillars = [
    {
      num: "01",
      icon: Award,
      title: "Qualité & Traçabilité Certifiée",
      desc: "Équipements et verreries conformes aux normes ISO 9001, CE et pharmacopées européennes, accompagnés de certificats d'étalonnage traçables."
    },
    {
      num: "02",
      icon: Users,
      title: "Conseil d'Ingénieurs Spécialisés",
      desc: "Une équipe formée en chimie, biologie et métrologie pour analyser vos protocoles et dimensionner avec précision vos installations."
    },
    {
      num: "03",
      icon: Clock,
      title: "Stock Permanent & Expédition 24/48h",
      desc: "Une plateforme logistique structurée assurant la disponibilité immédiate des consommables et une livraison sécurisée partout au Maroc."
    },
    {
      num: "04",
      icon: Wrench,
      title: "SAV & Support Métrologique",
      desc: "Installation, qualification QI/QO, étalonnages périodiques et maintenance préventive avec pièces d'origine constructeur."
    }
  ];

  return (
    <div className="bg-[#EEF2F6] min-h-screen">
      {/* ========================================================= */}
      {/* 1. EDITORIAL INTRO + PANORAMIC WAREHOUSE SHOWCASE         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 space-y-10">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.12]">
            L&apos;excellence analytique et logistique au service des{" "}
            <span className="text-[#4D7C0F]">laboratoires</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Acteur de référence au Maroc en équipements scientifiques, métrologie de précision et réactifs analytiques, ROBOLAB accompagne les laboratoires industriels, pharmaceutiques et de recherche avec rigueur.
          </p>
        </div>

        {/* Centerpiece Architectural Frame: Panoramic Photo + Docked Stats Bar */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-slate-300/70 shadow-md shadow-slate-300/40 overflow-hidden">
          <div className="relative w-full aspect-[1024/340] bg-[#E4E9F0]">
            <Image
              src="/images/robolab-entrepot-a-propos.jpg"
              alt="Plateforme Logistique et Stockage Général ROBOLAB TECHNOLOGY"
              fill
              unoptimized
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Integrated 4-Metric Architectural Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 border-t border-slate-200/80 bg-[#F8FAFC]">
            {stats.map((s, idx) => (
              <div key={idx} className="px-6 py-5 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black text-[#4D7C0F] tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs font-semibold text-slate-700 mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MISSION & 4 PILIERS — ASYMMETRIC BENTO LAYOUT          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Mission Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D7C0F]">
              Notre Mission & Engagements
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Des standards internationaux pour la fiabilité de vos analyses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Face aux exigences strictes des référentiels internationaux (<strong>ISO 17025, BPF, HACCP, ONSSA</strong>) dans l&apos;agroalimentaire, la pharmacie, les mines et la chimie, <strong>ROBOLAB</strong> garantit à chaque laboratoire des instruments certifiés, pérennes et immédiatement opérationnels.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Notre plateforme de stockage dédiée (verrerie borosilicatée 3.3, réactifs sous armoires de sécurité et équipements de pesage) assure une réactivité constante sur l&apos;ensemble du territoire.
            </p>

            <div className="pt-3 space-y-2.5 border-t border-slate-300/60">
              <div className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4D7C0F] shrink-0 mt-0.5" />
                <span>Partenariats directs avec les grands constructeurs européens et suisses</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4D7C0F] shrink-0 mt-0.5" />
                <span>Certificats d&apos;étalonnage raccordés COFRAC / DKD</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4D7C0F] shrink-0 mt-0.5" />
                <span>Pièces de rechange d&apos;origine et assistance technique dédiée</span>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Bento Grid of 4 Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-300/60 hover:border-[#4D7C0F]/50 shadow-2xs transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#E7EFE0] border border-[#C8DAB8] flex items-center justify-center text-[#4D7C0F]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {pillar.num}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BANDEAU DES MARQUES PARTENAIRES (BRAND MARQUEE)        */}
      {/* ========================================================= */}
      <BrandMarquee />

      {/* ========================================================= */}
      {/* 4. PRÉSENCE NATIONALE — 3 PÔLES AU MAROC                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4D7C0F]">
              Proximité & Logistique
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Notre Présence au Maroc
            </h2>
          </div>
          <Link
            href="/contact"
            className="text-xs font-semibold text-[#4D7C0F] hover:text-[#3F6212] inline-flex items-center gap-1.5"
          >
            <span>Prendre rendez-vous dans une agence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {siteConfig.branches.map((branch, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-300/60 shadow-2xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#E7EFE0] text-[#3F6212] border border-[#C8DAB8] text-[11px] font-semibold">
                    {branch.name}
                  </span>
                  <MapPin className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                </div>
                <h3 className="text-lg font-black text-slate-900">{branch.city}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {branch.address}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-mono text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#4D7C0F] shrink-0" />
                <span className="truncate">{branch.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
