"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCms } from "@/context/CmsContext";
import {
  X,
  Save,
  Rocket,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Phone,
  Layers,
  ArrowRight
} from "lucide-react";

export default function VisualCmsDrawer() {
  const {
    activeDrawerSection,
    closeDrawer,
    content,
    updateSection,
    publishChanges,
    isPublishing,
    statusMessage
  } = useCms();

  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Synchronize form data when the active section changes
  useEffect(() => {
    if (!activeDrawerSection) return;

    if (activeDrawerSection === "hero") {
      setFormData(content.hero);
    } else if (activeDrawerSection === "header") {
      setFormData(content.header);
    } else if (activeDrawerSection === "categoryCards") {
      setFormData(content.categoryCards);
    } else if (activeDrawerSection === "pillars") {
      setFormData(content.pillars);
    } else if (activeDrawerSection === "ctaBanner") {
      setFormData(content.ctaBanner);
    } else if (activeDrawerSection === "footer") {
      setFormData(content.footer);
    }
  }, [activeDrawerSection, content]);

  if (!activeDrawerSection) return null;

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = async () => {
    if (!activeDrawerSection) return;
    const ok = await updateSection(activeDrawerSection as any, formData);
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handlePublish = async () => {
    // Save draft first, then publish
    if (activeDrawerSection) {
      await updateSection(activeDrawerSection as any, formData);
    }
    await publishChanges();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleFieldChange("backgroundImage", data.url);
      } else {
        alert(data.error || "Erreur upload photo");
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setUploading(false);
    }
  };

  const getSectionTitle = () => {
    switch (activeDrawerSection) {
      case "hero":
        return "Bannière Hero & Accroche";
      case "header":
        return "En-tête & Coordonnées";
      case "categoryCards":
        return "Cartes Catégories Phares";
      case "pillars":
        return "Piliers d'Engagement ROBOLAB";
      case "ctaBanner":
        return "Bannière Devis & WhatsApp";
      case "footer":
        return "Pied de Page & Agences";
      default:
        return "Édition de Contenu";
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs pointer-events-auto animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative w-full sm:w-[480px] bg-slate-950 border-l border-slate-800 text-white shadow-2xl flex flex-col pointer-events-auto z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-850 flex items-center justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-lime-400 font-bold">
                VISUAL CMS • ÉDITION DIRECTE
              </span>
            </div>
            <h2 className="text-base font-black text-white mt-0.5">{getSectionTitle()}</h2>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="p-2.5 px-4 bg-lime-500/15 border-b border-lime-500/30 text-lime-300 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-lime-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 text-xs">
          {/* ========================================================= */}
          {/* HERO SECTION EDIT                                         */}
          {/* ========================================================= */}
          {activeDrawerSection === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Accroche Principale
                </label>
                <input
                  type="text"
                  value={formData.headline || ""}
                  onChange={(e) => handleFieldChange("headline", e.target.value)}
                  placeholder="Votre partenaire en solutions de"
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Mot Mis en Valeur (En surbrillance bleue/cyan)
                </label>
                <input
                  type="text"
                  value={formData.highlightWord || ""}
                  onChange={(e) => handleFieldChange("highlightWord", e.target.value)}
                  placeholder="laboratoire"
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-cyan-400 font-bold focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Sous-titre / Description de l&apos;Accroche
                </label>
                <textarea
                  rows={3}
                  value={formData.subheadline || ""}
                  onChange={(e) => handleFieldChange("subheadline", e.target.value)}
                  placeholder="Innovation, fiabilité et performance..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              {/* Photo Background */}
              <div className="space-y-2 pt-2 border-t border-slate-850">
                <label className="block font-bold text-slate-300">
                  Image de Fond High-Tech du Hero
                </label>
                <div className="relative w-full h-36 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                  {formData.backgroundImage ? (
                    <Image
                      src={formData.backgroundImage}
                      alt="Fond Hero"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleFieldChange("backgroundImage", "/images/hero-clean-lab.jpg")}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-cyan-300 border border-slate-750"
                  >
                    Labo Haute Précision (Officiel)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFieldChange("backgroundImage", "/images/hero-lab-tech.jpg")}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-750"
                  >
                    Équipements & Verrerie
                  </button>
                </div>

                <label className="mt-2 w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-xl border border-slate-750 flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-lime-400" />
                  <span>{uploading ? "Upload en cours..." : "Téléverser une autre photo depuis mon PC"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2 border-t border-slate-850">
                <label className="block font-bold text-slate-300">
                  Boutons d&apos;Action Principaux
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Bouton 1 (Texte)</span>
                    <input
                      type="text"
                      value={formData.primaryButtonText || ""}
                      onChange={(e) => handleFieldChange("primaryButtonText", e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Bouton 1 (Lien)</span>
                    <input
                      type="text"
                      value={formData.primaryButtonLink || ""}
                      onChange={(e) => handleFieldChange("primaryButtonLink", e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Bouton 2 (Texte)</span>
                    <input
                      type="text"
                      value={formData.secondaryButtonText || ""}
                      onChange={(e) => handleFieldChange("secondaryButtonText", e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Bouton 2 (Lien)</span>
                    <input
                      type="text"
                      value={formData.secondaryButtonLink || ""}
                      onChange={(e) => handleFieldChange("secondaryButtonLink", e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* HEADER & TOP REASSURANCE                                  */}
          {/* ========================================================= */}
          {activeDrawerSection === "header" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Numéro WhatsApp International (ex: 212679706224)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber || ""}
                  onChange={(e) => handleFieldChange("whatsappNumber", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Numéro Téléphone Affiché (ex: 06 79 70 62 24)
                </label>
                <input
                  type="text"
                  value={formData.phoneDisplay || ""}
                  onChange={(e) => handleFieldChange("phoneDisplay", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Email Officiel Devis
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Slogan Logo ROBOLAB
                </label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) => handleFieldChange("tagline", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white"
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORY CARDS EDIT                                       */}
          {/* ========================================================= */}
          {activeDrawerSection === "categoryCards" && (
            <div className="space-y-4">
              <p className="text-[11px] text-slate-400">
                Modifiez les 5 cartes d&apos;accès rapide aux gammes de matériel de laboratoire :
              </p>

              {Array.isArray(formData) &&
                formData.map((cat: any, idx: number) => (
                  <div key={cat.id || idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider block">
                      Carte #{idx + 1} ({cat.slug})
                    </span>
                    <div>
                      <span className="text-[10px] text-slate-400">Nom affiché</span>
                      <input
                        type="text"
                        value={cat.name || ""}
                        onChange={(e) => {
                          const updated = [...formData];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setFormData(updated);
                        }}
                        className="w-full p-2 bg-slate-950 border border-slate-750 rounded-lg text-white font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Description courte</span>
                      <input
                        type="text"
                        value={cat.description || ""}
                        onChange={(e) => {
                          const updated = [...formData];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setFormData(updated);
                        }}
                        className="w-full p-2 bg-slate-950 border border-slate-750 rounded-lg text-slate-300 text-[11px]"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ========================================================= */}
          {/* PILIERS D'ENGAGEMENT                                      */}
          {/* ========================================================= */}
          {activeDrawerSection === "pillars" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Titre de la Section
                </label>
                <input
                  type="text"
                  value={formData.sectionTitle || ""}
                  onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Sous-titre
                </label>
                <textarea
                  rows={2}
                  value={formData.sectionSubtitle || ""}
                  onChange={(e) => handleFieldChange("sectionSubtitle", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-slate-300"
                />
              </div>

              {formData.items &&
                formData.items.map((pillar: any, idx: number) => (
                  <div key={pillar.id || idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-lime-400">Pilier #{idx + 1}</span>
                    <input
                      type="text"
                      value={pillar.title || ""}
                      onChange={(e) => {
                        const items = [...formData.items];
                        items[idx] = { ...items[idx], title: e.target.value };
                        handleFieldChange("items", items);
                      }}
                      className="w-full p-2 bg-slate-950 border border-slate-750 rounded-lg text-white font-bold"
                    />
                    <textarea
                      rows={2}
                      value={pillar.description || ""}
                      onChange={(e) => {
                        const items = [...formData.items];
                        items[idx] = { ...items[idx], description: e.target.value };
                        handleFieldChange("items", items);
                      }}
                      className="w-full p-2 bg-slate-950 border border-slate-750 rounded-lg text-slate-300 text-[11px]"
                    />
                  </div>
                ))}
            </div>
          )}

          {/* ========================================================= */}
          {/* CTA BANNER & FOOTER                                       */}
          {/* ========================================================= */}
          {activeDrawerSection === "ctaBanner" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Titre Appel de Devis
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Sous-titre / Explication
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle || ""}
                  onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Texte WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsappText || ""}
                  onChange={(e) => handleFieldChange("whatsappText", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-white"
                />
              </div>
            </div>
          )}

          {activeDrawerSection === "footer" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Texte Présentation Pied de Page
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutText || ""}
                  onChange={(e) => handleFieldChange("aboutText", e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-slate-750 rounded-xl text-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Adresse Casablanca</span>
                  <input
                    type="text"
                    value={formData.addressCasablanca || ""}
                    onChange={(e) => handleFieldChange("addressCasablanca", e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Fixe Casablanca</span>
                  <input
                    type="text"
                    value={formData.phoneCasablanca || ""}
                    onChange={(e) => handleFieldChange("phoneCasablanca", e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Adresse Agadir</span>
                  <input
                    type="text"
                    value={formData.addressAgadir || ""}
                    onChange={(e) => handleFieldChange("addressAgadir", e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Fixe Agadir</span>
                  <input
                    type="text"
                    value={formData.phoneAgadir || ""}
                    onChange={(e) => handleFieldChange("phoneAgadir", e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-750 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer with Actions */}
        <div className="p-4 border-t border-slate-850 bg-slate-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 py-3 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-lime-400" />
            <span>{savedSuccess ? "Brouillon Sauvegardé !" : "Sauvegarder Brouillon"}</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex-1 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-xl shadow-lg shadow-lime-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Rocket className="w-4 h-4 text-slate-950" />
            <span>{isPublishing ? "Publication..." : "Publier en Direct"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
