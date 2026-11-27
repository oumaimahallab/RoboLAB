"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Package,
  Plus,
  FileText,
  Sliders,
  Globe,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Product } from "@/types";
import { useAdmin } from "@/context/AdminContext";
import { siteConfig } from "@/config/site";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { setViewMode } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, reqRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/admin/requests")
      ]);

      const prodData = await prodRes.json();
      if (prodData.success) {
        setProducts(prodData.products || []);
      }

      const reqData = await reqRes.json();
      if (reqData.success) {
        setQuotes(reqData.quotes || []);
        setContacts(reqData.contacts || []);
      }
    } catch (err) {
      console.error("Erreur chargement dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.inStock !== false).length;
  const onOrderProducts = totalProducts - inStockProducts;
  const totalRequests = quotes.length + contacts.length;
  const newRequests = quotes.filter((q) => q.status === "Nouveau" || !q.status).length;

  const handleGoToVisualEdit = () => {
    setViewMode("editor");
    router.push("/");
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-lime-500/20 text-lime-400 border border-lime-500/30 uppercase tracking-wider">
              Centre de Contrôle
            </span>
            <span className="text-xs text-slate-400">ROBOLAB TECHNOLOGY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Gérez en temps réel vos équipements de laboratoire, traitez les devis reçus et modifiez le contenu public du site.
          </p>
        </div>

        {/* Visual Edit CTA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
            onClick={handleGoToVisualEdit}
            className="px-5 py-3.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Globe className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Voir / Modifier le site en direct</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/admin/products/create"
            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-lime-400" />
            <span>+ Ajouter un Produit</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Catalogue Total</span>
            <div className="p-2 bg-slate-900 rounded-xl text-lime-400 border border-slate-800">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{totalProducts}</span>
            <Link
              href="/admin/products"
              className="text-[11px] font-bold text-lime-400 hover:underline flex items-center gap-1"
            >
              <span>Gérer</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-[11px] text-slate-500">
            Équipements actifs publiés sur le site
          </p>
        </div>

        {/* Card 2: Quotes & Requests */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Demandes & Devis</span>
            <div className="p-2 bg-slate-900 rounded-xl text-blue-400 border border-slate-800">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{totalRequests}</span>
            <Link
              href="/admin/requests"
              className="text-[11px] font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Consulter</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-[11px] text-slate-500">
            {newRequests} nouveau(x) devis à traiter
          </p>
        </div>

        {/* Card 3: In Stock */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Disponibilité Immédiate</span>
            <div className="p-2 bg-slate-900 rounded-xl text-emerald-400 border border-slate-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-400">{inStockProducts}</span>
            <span className="text-[11px] text-slate-500">
              {totalProducts ? Math.round((inStockProducts / totalProducts) * 100) : 0}% en stock
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Expédition 24/48h au Maroc</p>
        </div>

        {/* Card 4: Sur Commande */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Sur Commande</span>
            <div className="p-2 bg-slate-900 rounded-xl text-amber-400 border border-slate-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-400">{onOrderProducts}</span>
            <span className="text-[11px] text-slate-500">Délai import</span>
          </div>
          <p className="text-[11px] text-slate-500">Fournisseurs partenaires</p>
        </div>
      </div>

      {/* Two columns: Recent Quotes & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-850 pb-4">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-lime-400" />
              <h2 className="text-sm font-bold text-white">Dernières Demandes de Devis</h2>
            </div>
            <Link
              href="/admin/requests"
              className="text-xs font-bold text-lime-400 hover:underline flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {quotes.slice(0, 5).map((q: any) => {
              const cleanPhone = (q.phone || "").replace(/[^0-9]/g, "");
              const waUrl = cleanPhone
                ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Bonjour ${q.fullName}, suite à votre demande de devis ROBOLAB (#${q.quoteReference || q.id})...`
                  )}`
                : null;

              return (
                <div
                  key={q.id}
                  className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-850 hover:border-slate-800 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lime-400 text-[11px]">
                        {q.quoteReference || q.id}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-800 text-slate-300">
                        {q.city || "Maroc"}
                      </span>
                    </div>
                    <p className="font-semibold text-white truncate">
                      {q.fullName} • <span className="text-slate-400">{q.company || "Particulier"}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {q.totalItems ? `${q.totalItems} article(s)` : "Demande d'information"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold text-[11px] flex items-center gap-1 transition-colors"
                        title="Répondre au client sur WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {quotes.length === 0 && !loading && (
              <p className="text-xs text-slate-500 text-center py-8">
                Aucune demande de devis pour le moment.
              </p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-850 pb-4">
            <div className="flex items-center gap-2.5">
              <Package className="w-5 h-5 text-lime-400" />
              <h2 className="text-sm font-bold text-white">Catalogue Récent</h2>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-lime-400 hover:underline flex items-center gap-1"
            >
              <span>Gérer les {totalProducts} produits</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3 bg-slate-900/80 rounded-2xl border border-slate-850 hover:border-slate-800 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-800">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Package className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{p.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="font-mono text-lime-400">{p.reference}</span>
                      <span>•</span>
                      <span>{p.brand}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      p.inStock !== false
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {p.inStock !== false ? "En stock" : "Sur cde"}
                  </span>

                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
