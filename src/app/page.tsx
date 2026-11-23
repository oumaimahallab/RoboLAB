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
  MessageCircle,
  CheckCircle2,
  FileText,
  Clock,
  Truck
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

  // 4 top analytical & precision products
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
    <div className="space-y-16 md:space-y-24 pb-20 bg-white">
      {/* 1. HERO BANNER - Clean, High-End & Airy */}
      <section className="pt-10 pb-8 md:pt-16 md:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-50 border border-lime-200/80">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
              <span className="text-xs font-bold text-lime-800 tracking-wide">
                Fournisseur d&apos;Équipements Scientifiques & Laboratoire au Maroc
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              La Haute Précision pour vos{" "}
              <span className="text-lime-600">Laboratoires</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Distribution de matériel scientifique, balances analytiques, instruments de mesure physico-chimique, verrerie et consommables de laboratoire. Devis officiel sous 24h et livraison sur tout le Maroc.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/catalogue"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-lime-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>Consulter le Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/devis"
                className="px-6 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black transition-all shadow-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Demander un Devis Gratuit</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-6 text-xs">
              <div>
                <strong className="text-slate-900 text-lg md:text-xl font-black block">2 500+</strong>
                <span className="text-slate-500 text-[11px]">Références en stock</span>
              </div>
              <div>
                <strong className="text-lime-700 text-lg md:text-xl font-black block">ISO 17025</strong>
                <span className="text-slate-500 text-[11px]">Étalonnage & SAV</span>
              </div>
              <div>
                <strong className="text-slate-900 text-lg md:text-xl font-black block">24/48h</strong>
                <span className="text-slate-500 text-[11px]">Livraison au Maroc</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center p-8">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB TECHNOLOGY"
                fill
                unoptimized
                className="object-contain p-8"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-lime-400">ROBOLAB TECHNOLOGY SARL</span>
                  <p className="text-[11px] text-slate-300">Instruments scientifiques • Métrologie • Verrerie • Consommables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REASSURANCE BAR */}
      <ReassuranceBar />

      {/* 3. CATEGORIES SECTION (6 Families) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-lime-700 tracking-wider uppercase block mb-1">
              Gammes de Produits
            </span>
            <h2 className="text-xl md:text-3xl font-black text-slate-900">
              Nos Familles d&apos;Équipements
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 group"
          >
            <span>Tout le catalogue ({PRODUCTS.length} réf.)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?categorie=${cat.slug}`}
              className="group bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-lime-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center mb-3 group-hover:bg-lime-50 group-hover:border-lime-200 transition-colors">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-snug">
                  {cat.name.split("&")[0]}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-4 block group-hover:text-lime-600 transition-colors">
                {cat.itemCount}+ réf. →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (Clean, Crisp, Focused) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-lime-700 tracking-wider uppercase block mb-1">
              Sélection du Moment
            </span>
            <h2 className="text-xl md:text-3xl font-black text-slate-900">
              Équipements de Précision Populaires
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 group"
          >
            <span>Voir tous les produits</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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

      {/* 5. PARTNER BRANDS */}
      <BrandMarquee />

      {/* 6. WHY CHOOSE ROBOLAB (Concise, Clean & Balanced) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-3xl p-8 md:p-12 border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
              Engagement ROBOLAB
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              Pourquoi nous confier vos besoins de laboratoire ?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 pt-1">
                Qualité Certifiée & Traçabilité
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tous nos instruments répondent aux exigences des normes CE et ISO. Fiches techniques et certificats d&apos;étalonnage fournis sur demande.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 pt-1">
                Devis Officiel sous 24h
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Une réponse rapide et chiffrée par nos ingénieurs technico-commerciaux pour vos dossiers d&apos;achat et appels d&apos;offres.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-lime-600 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 pt-1">
                Livraison & Support au Maroc
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Présence à Casablanca, Agadir et Tanger. Expédition sécurisée de matériel fragile et réactifs sur tout le territoire national.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAST CONTACT & QUOTE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl md:text-2xl font-black">
              Besoin d&apos;un devis ou d&apos;un conseil technique ?
            </h3>
            <p className="text-xs text-slate-300">
              Contactez directement notre équipe commerciale par WhatsApp ou par email sur{" "}
              <strong className="text-lime-400">{siteConfig.contact.recipientEmail}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/devis"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              Demander un Devis
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis%20technique`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp : {siteConfig.contact.whatsappDisplay}</span>
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
