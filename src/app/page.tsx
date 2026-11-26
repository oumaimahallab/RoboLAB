"use client";

import React, { useState, useEffect } from "react";
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
  FileCheck,
  Truck,
  Award
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import BrandMarquee from "@/components/BrandMarquee";
import { Product } from "@/types";
import { siteConfig } from "@/config/site";
import { useAdmin } from "@/context/AdminContext";
import { Edit3 } from "lucide-react";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [siteTexts, setSiteTexts] = useState<any>(null);
  const { refreshTrigger, isAdmin, editMode, setIsTextEditorOpen } = useAdmin();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProductsList(data.products);
        }
      })
      .catch(() => {});

    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSiteTexts(data.settings);
        }
      })
      .catch(() => {});
  }, [refreshTrigger]);

  // 4 top featured / popular products
  const popularList = productsList.filter((p) => p.isPopular);
  const featuredProducts = (popularList.length >= 4 ? popularList : productsList).slice(0, 4);

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
      {/* 1. HERO BANNER - Clean, airy, no redundant search bar */}
      <section className="pt-8 pb-4 md:pt-14 md:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-50 border border-lime-200">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
              <span className="text-xs font-bold text-lime-800 tracking-wide uppercase">
                Le Partenaire des Laboratoires & de la Recherche au Maroc
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {siteTexts?.heroHeadline || "Matériel, Consommables & Équipements de"}{" "}
              <span className="text-lime-600">{siteTexts?.heroHighlight || "Laboratoire"}</span>
              {isAdmin && editMode && (
                <button
                  type="button"
                  onClick={() => setIsTextEditorOpen(true)}
                  className="inline-flex items-center gap-1 ml-3 px-2.5 py-1 bg-lime-100 hover:bg-lime-200 text-lime-900 text-xs font-bold rounded-lg border border-lime-300 align-middle transition-colors cursor-pointer"
                  title="Modifier ce titre et les coordonnées"
                >
                  <Edit3 className="w-3 h-3 text-lime-700" />
                  <span>Modifier ce texte</span>
                </button>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              {siteTexts?.heroSubheadline ||
                "Distribution d'instruments scientifiques de haute précision, balances d'analyse, verrerie technique, réactifs et consommables. Devis officiel sous 24h ouvrées et livraison partout au Maroc."}
            </p>

            {/* Trust Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 text-xs">
              <div>
                <strong className="text-slate-900 text-base md:text-lg font-black block">
                  {siteTexts?.statReferences || "2 500+"}
                </strong>
                <span className="text-slate-500 text-[11px]">Références en catalogue</span>
              </div>
              <div>
                <strong className="text-lime-700 text-base md:text-lg font-black block">ISO & CE</strong>
                <span className="text-slate-500 text-[11px]">Certificats & Traçabilité</span>
              </div>
              <div>
                <strong className="text-slate-900 text-base md:text-lg font-black block">
                  {siteTexts?.statDelivery || "24 / 48h"}
                </strong>
                <span className="text-slate-500 text-[11px]">Livraison partout au Maroc</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-92 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center p-8">
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
                  <p className="text-[11px] text-slate-300">Siège social à Casablanca • Agences Agadir & Tanger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNIVERS PRODUITS (6 Major Lab Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest block mb-1">
              Univers Produits
            </span>
            <h2 className="text-xl md:text-3xl font-black text-slate-900">
              Nos Familles d&apos;Équipements & Consommables
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 group"
          >
            <span>Voir tout le catalogue ({PRODUCTS.length} réf.)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?categorie=${cat.slug}`}
              className="group bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-lime-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:bg-lime-50 group-hover:border-lime-300 transition-colors">
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

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-lime-700 uppercase tracking-widest block mb-1">
              Focus Matériel
            </span>
            <h2 className="text-xl md:text-3xl font-black text-slate-900">
              Sélection d&apos;Équipements Phares
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Disponibilité immédiate en stock marocain avec garantie constructeur
            </p>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-bold text-lime-700 hover:text-lime-800 flex items-center gap-1 group"
          >
            <span>Tous les équipements</span>
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

      {/* 4. REASSURANCE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 rounded-3xl p-8 md:p-12 border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
              L&apos;Engagement ROBOLAB
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900">
              La Rigueur Scientifique à Votre Service
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <strong className="text-slate-900 text-sm font-bold block pt-1">
                Fiches & Certificats
              </strong>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Fiches de données de sécurité (FDS), manuels techniques et certificats d&apos;étalonnage traçables ISO 17025.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <strong className="text-slate-900 text-sm font-bold block pt-1">
                Livraison Sécurisée Maroc
              </strong>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Conditionnement adapté aux produits chimiques et verrerie fragile avec expédition 24/48h dans tout le Royaume.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <strong className="text-slate-900 text-sm font-bold block pt-1">
                Marques Mondiales
              </strong>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Partenaire distributeur des marques leaders mondiales : Ohaus, Mettler, Hanna, Memmert, IKA, Sartorius.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-lime-50 text-lime-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <strong className="text-slate-900 text-sm font-bold block pt-1">
                SAV & Mise en Service
              </strong>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Assistance technique par des ingénieurs biomédicaux, qualification QI/QO et stock de pièces d&apos;origine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND MARQUEE */}
      <BrandMarquee />

      {/* 6. CLEAN DIRECT CLOSING CTA (No redundant form!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Besoin d&apos;un Devis ou d&apos;un Conseil ?
            </span>
            <h3 className="text-xl md:text-2xl font-black">
              Notre équipe commerciale vous répond sous 24h ouvrées
            </h3>
            <p className="text-xs text-slate-300">
              Contactez-nous directement par téléphone, WhatsApp ou via notre formulaire officiel à Casablanca, Agadir et Tanger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              Formulaire de Contact
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis`}
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
