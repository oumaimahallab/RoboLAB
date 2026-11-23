"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileCheck,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminDashboardPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/devis");
      const data = await res.json();
      if (data.success) {
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      console.error("Erreur de chargement des devis", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter((q) => {
    if (filter !== "all" && q.status !== filter) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      const matchName = q.fullName?.toLowerCase().includes(term);
      const matchComp = q.company?.toLowerCase().includes(term);
      const matchRef = q.quoteReference?.toLowerCase().includes(term);
      const matchCity = q.city?.toLowerCase().includes(term);
      return matchName || matchComp || matchRef || matchCity;
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour au site public</span>
              </Link>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold uppercase tracking-wider text-lime-600 bg-lime-50 px-2 py-0.5 rounded-full">
                Espace Commercial Admin
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              Tableau de Bord des Demandes de Devis
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Boîte de réception configurée :{" "}
              <strong className="text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">
                {siteConfig.contact.recipientEmail}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchQuotes}
              disabled={loading}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Devis Enregistrés
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">{quotes.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Nouveaux Devis à Traiter
            </span>
            <div className="text-2xl font-black text-lime-600 mt-1">
              {quotes.filter((q) => q.status === "Nouveau").length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Destinataire E-mail
            </span>
            <div className="text-sm font-bold text-slate-800 mt-2 truncate">
              {siteConfig.contact.recipientEmail}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              placeholder="Rechercher par client, société, réf..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Affichage :</span>
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tous ({quotes.length})
            </button>
            <button
              onClick={() => setFilter("Nouveau")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                filter === "Nouveau"
                  ? "bg-lime-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Nouveaux
            </button>
          </div>
        </div>

        {/* Quotes List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-slate-500">
              Chargement des devis enregistrés...
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Aucun devis trouvé</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Faites un test en envoyant une demande depuis le panier de devis sur le site !
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Date / Réf</th>
                    <th className="py-3 px-4">Client & Société</th>
                    <th className="py-3 px-4">Ville & Contact</th>
                    <th className="py-3 px-4">Articles demandés</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions rapides</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuotes.map((q) => (
                    <tr
                      key={q.id || q.quoteReference}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedQuote(q)}
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-900 block">
                          {q.quoteReference}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {q.createdAt ? new Date(q.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : "Récemment"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <strong className="text-slate-900 block">{q.company}</strong>
                        <span className="text-slate-500">{q.fullName}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-slate-800 font-semibold block">{q.city}</span>
                        <span className="text-slate-500">{q.phone}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {q.items?.length || 0} produit(s)
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-lime-100 text-lime-800">
                          {q.status || "Nouveau"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://wa.me/${q.phone?.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(q.fullName)},%20ROBOLAB%20fait%20suite%20à%20votre%20demande%20de%20devis%20${q.quoteReference}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg inline-block transition-colors"
                          title="Répondre sur WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${q.email}?subject=Votre Devis ROBOLAB N° ${q.quoteReference}`}
                          className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg inline-block transition-colors"
                          title="Envoyer un e-mail"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Detailed Quote View */}
        {selectedQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono text-lime-600 font-bold">
                    Dossier N° {selectedQuote.quoteReference}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    {selectedQuote.company}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
                >
                  ✕
                </button>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-400 block font-medium">Contact :</span>
                  <strong className="text-slate-800">{selectedQuote.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Ville :</span>
                  <strong className="text-slate-800">{selectedQuote.city}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Téléphone :</span>
                  <a href={`tel:${selectedQuote.phone}`} className="text-sky-600 font-bold hover:underline">
                    {selectedQuote.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">E-mail :</span>
                  <a href={`mailto:${selectedQuote.email}`} className="text-sky-600 font-bold hover:underline">
                    {selectedQuote.email}
                  </a>
                </div>
                {selectedQuote.notes && (
                  <div className="col-span-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block font-medium">Notes du client :</span>
                    <p className="text-slate-700 mt-0.5">{selectedQuote.notes}</p>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Articles et Équipements Demandés :
                </h4>
                <div className="space-y-2">
                  {selectedQuote.items?.map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-slate-900 block">{it.product?.name}</strong>
                        <span className="text-slate-500 text-[11px]">
                          Réf: {it.product?.reference} • Marque: {it.product?.brand}
                          {it.selectedVariant && ` • Option: ${it.selectedVariant}`}
                        </span>
                      </div>
                      <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                        Qté: {it.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer la Fiche</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedQuote.phone?.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(selectedQuote.fullName)},%20ROBOLAB%20a%20bien%20reçu%20votre%20demande%20de%20devis%20${selectedQuote.quoteReference}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contacter sur WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Votre Devis ROBOLAB N° ${selectedQuote.quoteReference}`}
                    className="px-4 py-2 bg-slate-900 hover:bg-lime-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Répondre par E-mail</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
