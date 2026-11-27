"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  MessageCircle,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function AdminRequestsPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "quotes" | "contacts">("all");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/requests");
      const data = await res.json();
      if (data.success) {
        setQuotes(data.quotes || []);
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error("Erreur chargement demandes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id || q.quoteReference === id ? { ...q, status } : q))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous supprimer définitivement cette demande du tableau de bord ?")) return;

    try {
      const res = await fetch(`/api/admin/requests?id=${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setQuotes((prev) => prev.filter((q) => q.id !== id && q.quoteReference !== id));
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  // Combine and sort by date descending
  const allRequests = [
    ...quotes.map((q) => ({ ...q, type: "quote" })),
    ...contacts.map((c) => ({
      id: c.id,
      quoteReference: c.id,
      fullName: c.name,
      company: c.company || "Particulier",
      phone: c.phone,
      email: c.email,
      city: c.city,
      sector: c.subject,
      notes: c.message,
      items: [],
      totalItems: 0,
      status: "Message Contact",
      createdAt: c.createdAt,
      type: "contact"
    }))
  ].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  // Deduplicate if ID matches
  const uniqueRequests = allRequests.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const filteredRequests = uniqueRequests.filter((item) => {
    if (typeFilter === "quotes" && item.type !== "quote") return false;
    if (typeFilter === "contacts" && item.type !== "contact") return false;

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      return (
        item.fullName?.toLowerCase().includes(query) ||
        item.company?.toLowerCase().includes(query) ||
        item.id?.toLowerCase().includes(query) ||
        item.city?.toLowerCase().includes(query) ||
        item.phone?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-lime-400" />
            <span>Demandes de Devis & Messages Clients</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Traitez les demandes de devis et réclamations envoyées depuis le site.
          </p>
        </div>

        <button
          onClick={loadRequests}
          disabled={loading}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher client, société, ticket (ex: RB-DEV-123)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-750 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                typeFilter === "all"
                  ? "bg-lime-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-850"
              }`}
            >
              Tous ({uniqueRequests.length})
            </button>
            <button
              onClick={() => setTypeFilter("quotes")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                typeFilter === "quotes"
                  ? "bg-lime-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-850"
              }`}
            >
              Devis
            </button>
            <button
              onClick={() => setTypeFilter("contacts")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                typeFilter === "contacts"
                  ? "bg-lime-500 text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-850"
              }`}
            >
              Contacts
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of Cards */}
        <div className="lg:col-span-2 space-y-3">
          {filteredRequests.map((req) => {
            const cleanPhone = (req.phone || "").replace(/[^0-9]/g, "");
            const waUrl = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Bonjour ${req.fullName}, suite à votre demande ROBOLAB (${req.id})...`
                )}`
              : null;

            const isSelected = selectedItem?.id === req.id;

            return (
              <div
                key={req.id}
                onClick={() => setSelectedItem(req)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                  isSelected
                    ? "bg-slate-900 border-lime-500 ring-1 ring-lime-500/50 shadow-xl"
                    : "bg-slate-950 border-slate-800 hover:border-slate-750"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lime-400 text-xs bg-lime-500/10 px-2.5 py-1 rounded-lg border border-lime-500/20">
                      #{req.quoteReference || req.id}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                      {req.type === "quote" ? "📋 Demande Devis" : "✉️ Formulaire Contact"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          : "Récent"}
                      </span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(req.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Client info summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Client & Société</span>
                    <p className="font-bold text-white text-sm">{req.fullName}</p>
                    <p className="text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.company || "Particulier / Labo"}</span>
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Localisation & Contact</span>
                    <p className="text-slate-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{req.city || "Maroc"}</span>
                    </p>
                    <p className="text-slate-300 font-mono text-[11px]">{req.phone || "Tél non renseigné"}</p>
                  </div>
                </div>

                {/* Articles summary or message */}
                {req.items && req.items.length > 0 ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider block">
                      {req.items.length} équipement(s) demandé(s) :
                    </span>
                    <ul className="divide-y divide-slate-800/60">
                      {req.items.slice(0, 3).map((it: any, i: number) => (
                        <li key={i} className="py-1 text-slate-300 flex justify-between">
                          <span>
                            {it.product?.name || "Équipement"} ({it.product?.reference || "N/A"})
                          </span>
                          <span className="font-bold text-white">Qté: {it.quantity || 1}</span>
                        </li>
                      ))}
                      {req.items.length > 3 && (
                        <li className="pt-1 text-[11px] text-slate-400 italic">
                          + {req.items.length - 3} autre(s) équipement(s)...
                        </li>
                      )}
                    </ul>
                  </div>
                ) : req.notes ? (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">Message :</span>
                    <p className="text-slate-300 line-clamp-2">{req.notes}</p>
                  </div>
                ) : null}

                {/* Quick actions buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={req.status || "Nouveau"}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleUpdateStatus(req.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs p-1.5 bg-slate-900 border border-slate-750 rounded-lg text-slate-200 focus:ring-1 focus:ring-lime-500 cursor-pointer"
                    >
                      <option value="Nouveau">🟡 Nouveau</option>
                      <option value="En cours">🔵 En cours d&apos;étude</option>
                      <option value="Devis envoyé">🟢 Devis Envoyé</option>
                      <option value="Traité">✅ Traité / Finalisé</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Répondre WhatsApp</span>
                      </a>
                    )}

                    {req.email && (
                      <a
                        href={`mailto:${req.email}?subject=Suite%20%C3%A0%20votre%20demande%20ROBOLAB%20%23${req.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs border border-slate-750 flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredRequests.length === 0 && !loading && (
            <div className="p-12 text-center bg-slate-950 rounded-3xl border border-slate-800 text-slate-500 text-xs">
              Aucune demande ne correspond aux critères de recherche.
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-6 h-fit sticky top-24">
          {selectedItem ? (
            <div className="space-y-5">
              <div className="border-b border-slate-850 pb-4">
                <span className="font-mono text-lime-400 font-bold text-xs">
                  {selectedItem.quoteReference || selectedItem.id}
                </span>
                <h3 className="text-base font-bold text-white mt-1">Détails de la demande</h3>
                <p className="text-xs text-slate-400">Reçue le {new Date(selectedItem.createdAt || Date.now()).toLocaleString("fr-FR")}</p>
              </div>

              {/* Client info */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 space-y-1">
                  <p className="font-bold text-white text-sm">{selectedItem.fullName}</p>
                  <p className="text-slate-300">{selectedItem.company}</p>
                  <p className="text-slate-400">Ville : {selectedItem.city || "Maroc"}</p>
                  <p className="text-lime-400 font-mono pt-1">📞 {selectedItem.phone}</p>
                  <p className="text-blue-400 font-mono text-[11px]">✉️ {selectedItem.email}</p>
                </div>
              </div>

              {/* Items */}
              {selectedItem.items && selectedItem.items.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white">Articles sélectionnés :</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedItem.items.map((it: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-xs space-y-1">
                        <p className="font-bold text-white">{it.product?.name || "Équipement"}</p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Réf: {it.product?.reference} • Marque: {it.product?.brand}
                        </p>
                        <p className="text-lime-400 font-bold">Quantité : {it.quantity || 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              {selectedItem.notes && (
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Commentaires client :</h4>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 text-xs text-slate-300 leading-relaxed">
                    {selectedItem.notes}
                  </div>
                </div>
              )}

              {/* Direct Actions */}
              <div className="pt-4 border-t border-slate-850 space-y-2">
                {selectedItem.phone && (
                  <a
                    href={`https://wa.me/${(selectedItem.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Bonjour ${selectedItem.fullName}, suite à votre demande de devis ROBOLAB (#${selectedItem.id})...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contacter via WhatsApp</span>
                  </a>
                )}

                {selectedItem.email && (
                  <a
                    href={`mailto:${selectedItem.email}?subject=Devis%20ROBOLAB%20%23${selectedItem.id}`}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 font-bold text-xs rounded-xl border border-slate-750 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-lime-400" />
                    <span>Envoyer un Email Officiel</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-2 text-slate-500">
              <FileText className="w-10 h-10 mx-auto text-slate-700" />
              <p className="text-xs">Sélectionnez une demande dans la liste pour voir l&apos;intégralité des détails.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
