"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { SiteSettings } from "@/lib/dataStore";

export default function AdminContentPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings || {});
      }
    } catch {
      setError("Erreur chargement des paramètres.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(data.error || "Erreur enregistrement.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 gap-3 text-xs">
        <RefreshCw className="w-5 h-5 animate-spin text-lime-400" />
        <span>Chargement des paramètres du site...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-lime-400" />
            <span>Contenu du Site & Coordonnées</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Modifiez en direct les coordonnées, numéros WhatsApp, emails officiels et textes d&apos;accroche.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Enregistrement..." : "Enregistrer"}</span>
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Les modifications ont été publiées sur le site avec succès !</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/15 border border-red-500/30 text-red-300 rounded-2xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Coordonnées Officielles */}
        <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-sm font-bold text-white border-b border-slate-850 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-lime-400" />
            <span>1. Coordonnées Officielles de Contact</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Numéro WhatsApp International (sans le +) *
              </label>
              <input
                type="text"
                required
                value={settings.contactWhatsApp || ""}
                onChange={(e) => setSettings({ ...settings, contactWhatsApp: e.target.value })}
                placeholder="212679706224"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Format d&apos;envoi WhatsApp (ex: 212679706224)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Numéro WhatsApp Affiché au Public *
              </label>
              <input
                type="text"
                required
                value={settings.contactPhone || ""}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                placeholder="06 79 70 62 24"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Visible sur l&apos;en-tête, le pied de page et les boutons
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Email Officiel de Réception des Devis *
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail || ""}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                placeholder="commercial@robolab-tech.com"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Adresse email qui reçoit les notifications de devis et contact
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Horaires d&apos;Ouverture
              </label>
              <input
                type="text"
                value={settings.hours || ""}
                onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                placeholder="Lun - Ven : 08h30 - 18h00 | Sam : 09h00 - 13h00"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Téléphone Fixe Siège Casablanca
              </label>
              <input
                type="text"
                value={settings.phoneCasablanca || ""}
                onChange={(e) => setSettings({ ...settings, phoneCasablanca: e.target.value })}
                placeholder="+212 (0) 522 35 06 66"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Téléphone Fixe Agence Agadir
              </label>
              <input
                type="text"
                value={settings.phoneAgadir || ""}
                onChange={(e) => setSettings({ ...settings, phoneAgadir: e.target.value })}
                placeholder="+212 (0) 528 28 88 44"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Textes & Slogans Page d'Accueil */}
        <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-sm font-bold text-white border-b border-slate-850 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>2. Textes & Slogans de la Page d&apos;Accueil</span>
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Titre Hero (Accroche Principale)
                </label>
                <input
                  type="text"
                  value={settings.heroHeadline || ""}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  placeholder="Matériel, Consommables & Équipements de"
                  className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Mot Mis en Valeur (En Vert Lime)
                </label>
                <input
                  type="text"
                  value={settings.heroHighlight || ""}
                  onChange={(e) => setSettings({ ...settings, heroHighlight: e.target.value })}
                  placeholder="Laboratoire"
                  className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-lime-400 font-bold focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Sous-titre / Paragraphe de Présentation Hero
              </label>
              <textarea
                rows={3}
                value={settings.heroSubheadline || ""}
                onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                placeholder="Distribution d'instruments scientifiques..."
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Chiffre Références Catalogue
                </label>
                <input
                  type="text"
                  value={settings.statReferences || ""}
                  onChange={(e) => setSettings({ ...settings, statReferences: e.target.value })}
                  placeholder="2 500+"
                  className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Délai Moyen Livraison
                </label>
                <input
                  type="text"
                  value={settings.statDelivery || ""}
                  onChange={(e) => setSettings({ ...settings, statDelivery: e.target.value })}
                  placeholder="24 / 48h"
                  className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Enregistrement..." : "Enregistrer les Modifications"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
