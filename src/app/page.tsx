"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Scale,
  Gauge,
  Cpu,
  FlaskConical,
  Atom,
  ShieldCheck,
  ChevronRight,
  MessageCircle
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import ReassuranceBar from "@/components/ReassuranceBar";
import BrandMarquee from "@/components/BrandMarquee";
import { Product } from "@/types";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Take top 4 products for clean, spacious look
  const featuredProducts = PRODUCTS.filter((p) => p.isPopular).slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Scale":
        return <Scale className="w-5 h-5 text-lime-600" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-lime-600" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-lime-600" />;
      case "FlaskConical":
        return <FlaskConical className="w-5 h-5 text-lime-600" />;
      case "Atom":
        return <Atom className="w-5 h-5 text-lime-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-lime-600" />;
      default:
        return <FlaskConical className="w-5 h-5 text-lime-600" />;
    }
  };

  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* 1. HERO SECTION (Lime & Deep Charcoal Accent) */}
      <section className="pt-14 pb-10 md:pt-20 md:pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-lime-700 bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
              ROBOLAB TECHNOLOGY MAROC
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              La Précision Scientifique pour vos{" "}
              <span className="text-lime-600">Laboratoires</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
              Balances haute précision, instruments de mesure, verrerie technique et réactifs certifiés. Devis B2B sous 24h et livraison sécurisée partout au Maroc.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/catalogue"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-lime-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/devis"
                className="px-6 py-3 rounded-xl bg-lime-50 hover:bg-lime-100 text-lime-900 border border-lime-200 text-xs font-bold transition-all"
              >
                Demander un Devis
              </Link>
            </div>
          </div>

          {/* Right Visual Card with matching 3D dark charcoal atmosphere */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB TECHNOLOGY"
                fill
                unoptimized
                className="object-contain p-8"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-0.5">
                  <span className="text-xs font-bold text-lime-400">Excellence & Traçabilité Métrologique</span>
                  <p className="text-xs text-slate-300">Certificats d&apos;étalonnage ISO 17025 et SAV sur site au Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REASSURANCE BAR */}
      <ReassuranceBar />

      {/* 3. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Nos Familles d&apos;Équipements
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sélectionnez une catégorie pour composer votre devis
            </p>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1"
          >
            <span>Tout voir</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?categorie=${cat.slug}`}
              className="group bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-lime-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center mb-3 group-hover:bg-lime-50 transition-colors">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug">
                  {cat.name.split("&")[0]}
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-3 block group-hover:text-lime-600 transition-colors">
                {cat.itemCount}+ réf. →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Équipements Phares
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Les références les plus demandées par les laboratoires au Maroc
            </p>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1"
          >
            <span>Catalogue complet</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. BRAND MARQUEE */}
      <BrandMarquee />

      {/* 6. CLEAN FAST CONTACT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-lg">
            <h3 className="text-xl md:text-2xl font-black">
              Besoin d&apos;un conseil technique ou d&apos;un devis ?
            </h3>
            <p className="text-xs text-slate-300">
              Nos ingénieurs vous répondent immédiatement par WhatsApp ou établissent une offre officielle sous 24h.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/devis"
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Formulaire de Devis
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
