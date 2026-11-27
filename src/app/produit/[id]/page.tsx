"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  FileText,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Truck,
  Wrench,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Edit3
} from "lucide-react";
import { Product } from "@/types";
import { useQuote } from "@/context/QuoteContext";
import { useAdmin } from "@/context/AdminContext";
import { siteConfig } from "@/config/site";

export default function PublicProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { addToQuote, openDrawer } = useQuote();
  const { isAdmin, editMode } = useAdmin();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          const found = data.products.find(
            (p: Product) => p.id === id || p.slug === id || p.reference === id
          );
          if (found) {
            setProduct(found);
          } else {
            setError("Équipement non trouvé dans le catalogue.");
          }
        }
      })
      .catch(() => setError("Erreur de connexion au catalogue."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToQuote(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
    openDrawer();
  };

  const getWhatsAppUrl = () => {
    if (!product) return "";
    const msg = `Bonjour ROBOLAB, je souhaite recevoir un devis et la disponibilité pour :\n- Produit : *${product.name}*\n- Référence : *${product.reference}*\n- Marque : *${product.brand}*\n- Quantité souhaitée : ${quantity}`;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
          <span className="w-5 h-5 border-2 border-lime-600 border-t-transparent rounded-full animate-spin"></span>
          <span>Chargement des spécifications techniques de l&apos;équipement...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-slate-50 text-center space-y-4">
        <p className="text-sm font-bold text-slate-700">{error || "Produit introuvable."}</p>
        <Link
          href="/catalogue"
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retourner au Catalogue</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-lime-700 font-medium transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/catalogue" className="hover:text-lime-700 font-medium transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/catalogue?categorie=${product.category}`}
            className="hover:text-lime-700 font-medium transition-colors"
          >
            {product.categoryLabel || product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative">
          {/* Admin Edit Link if in visual edit mode */}
          {isAdmin && editMode && (
            <div className="lg:col-span-12 -mt-4 mb-2 p-3 bg-slate-950 text-white rounded-2xl border border-lime-500/40 flex items-center justify-between text-xs">
              <span className="text-lime-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                <span>Mode Admin Actif sur cette fiche produit</span>
              </span>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="px-3 py-1 bg-lime-500 text-slate-950 rounded-lg font-black text-[11px] flex items-center gap-1.5 hover:bg-lime-400"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modifier cette fiche dans le Back-Office</span>
              </Link>
            </div>
          )}

          {/* Left: Product Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain p-4"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xs">
                  Photo technique ROBOLAB
                </div>
              )}
            </div>

            {/* Badges under image */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-lime-600 shrink-0" />
                <span className="font-bold text-[11px]">Garantie & SAV Maroc</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700">
                <Truck className="w-4 h-4 text-lime-600 shrink-0" />
                <span className="font-bold text-[11px]">Livraison Partout au Maroc</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                  RÉF : {product.reference}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-lime-50 text-lime-800 border border-lime-200">
                  Marque : {product.brand}
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    product.inStock !== false
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  {product.inStock !== false ? "✓ En Stock (Expédition 24/48h)" : "⏳ Sur Commande"}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Price Display */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Prix Indicatif HT</span>
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    {product.price || "Sur devis"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 max-w-xs text-right">
                  Devis officiel transmis sous 24h ouvrées avec fiche technique et certificat métrologique.
                </span>
              </div>
            </div>

            {/* Quantity and Actions (WhatsApp & Devis) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Quantité :</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-slate-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. WhatsApp Button */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Demander par WhatsApp</span>
                </a>

                {/* 2. Add to Quote Drawer */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-5 bg-slate-900 hover:bg-lime-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-lime-400" />
                      <span>Ajouté au Devis !</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Ajouter au Panier de Devis</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Besoin d&apos;un conseil technique immédiat ? Contactez notre ingénieur commercial au{" "}
                <strong className="text-slate-700">{siteConfig.contact.phoneDisplay}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Description & Applications */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xs space-y-8">
          {/* Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Wrench className="w-5 h-5 text-lime-600" />
                <span>Spécifications Techniques Officielles</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                  <tbody className="divide-y divide-slate-100">
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-slate-50/70" : "bg-white"}>
                        <td className="py-3 px-5 font-bold text-slate-700 w-1/3 border-r border-slate-100">
                          {spec.name}
                        </td>
                        <td className="py-3 px-5 text-slate-900 font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Description & Présentation de l&apos;Équipement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Applications */}
          {product.applications && product.applications.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Domaines d&apos;Application Recommandés
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200"
                  >
                    ✓ {app}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
