"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  MessageCircle,
  FileCheck,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { siteConfig } from "@/config/site";

const LAB_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='%23f1f5f9'><rect width='100' height='100' fill='%23f1f5f9'/><path d='M45 20h10v15l15 25v20H30V60l15-25V20z' fill='%230284c7' opacity='0.7'/></svg>";

export default function QuoteDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromQuote, clearQuote } =
    useQuote();

  const [step, setStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    city: "Casablanca",
    sector: "Agroalimentaire",
    notes: "",
  });
  const [quoteReference, setQuoteReference] = useState("");

  if (!isDrawerOpen) return null;

  // Generate WhatsApp message
  const generateWhatsAppUrl = () => {
    let msg = `Bonjour ROBOLAB, je souhaite recevoir un devis officiel pour le matériel suivant :\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}* (Réf: ${item.product.reference})\n`;
      if (item.selectedVariant) {
        msg += `   - Option : ${item.selectedVariant}\n`;
      }
      msg += `   - Quantité : ${item.quantity}\n\n`;
    });
    if (formData.company) msg += `Société : ${formData.company}\n`;
    if (formData.fullName) msg += `Contact : ${formData.fullName}\n`;
    if (formData.city) msg += `Ville : ${formData.city}\n`;
    msg += `Merci de m'envoyer votre meilleure offre de prix et délais de livraison.`;

    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);

    try {
      // 1. Submit to server API (saves to database & notifies hallaboumaima@gmail.com)
      await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          sector: formData.sector,
          notes: formData.notes,
          items: items,
          quoteReference: ref,
        }),
      });
    } catch (err) {
      console.error("Erreur transmission API :", err);
    }

    setStep("success");
  };

  const handleReset = () => {
    clearQuote();
    setStep("cart");
    closeDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-lime-400" />
              <h2 className="text-base font-bold">
                {step === "cart" && `Panier de Devis (${items.length})`}
                {step === "form" && "Coordonnées de l'Entreprise"}
                {step === "success" && "Demande Enregistrée"}
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Votre panier de devis est vide</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                      Parcourez notre catalogue et cliquez sur &quot;Ajouter au devis&quot; pour composer votre liste d&apos;équipements.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="px-5 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-sky-500 transition-colors"
                    >
                      Explorer le catalogue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                      <span>{items.length} article(s) sélectionné(s)</span>
                      <button
                        onClick={clearQuote}
                        className="text-red-500 hover:text-red-600 font-medium"
                      >
                        Vider la liste
                      </button>
                    </div>

                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedVariant || "default"}`}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3 relative group"
                      >
                        <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden relative shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold tracking-wider text-sky-600 uppercase">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">Réf: {item.product.reference}</p>
                          {item.selectedVariant && (
                            <span className="inline-block px-1.5 py-0.5 mt-0.5 bg-sky-100 text-sky-700 rounded text-[10px] font-medium">
                              {item.selectedVariant}
                            </span>
                          )}

                          {/* Quantity control */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.selectedVariant
                                  )
                                }
                                className="p-1 hover:bg-slate-100 text-slate-600 rounded-l"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.selectedVariant
                                  )
                                }
                                className="p-1 hover:bg-slate-100 text-slate-600 rounded-r"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeFromQuote(item.product.id, item.selectedVariant)
                              }
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                              title="Retirer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === "form" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 mb-2">
                  Renseignez vos coordonnées pour recevoir votre devis chiffré officiel sous 24h ouvrées.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex: Dr. Ahmed Alaoui"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Société / Établissement / Laboratoire *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Laboratoire Agro Mar, Clinique..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6..."
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ville au Maroc *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Casablanca, Agadir..."
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-mail professionnel *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@votre-entreprise.ma"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secteur d&apos;activité
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="Agroalimentaire">Agroalimentaire & Pêche</option>
                    <option value="Pharmaceutique">Pharmaceutique & Cosmétique</option>
                    <option value="Recherche">Recherche & Enseignement Supérieur</option>
                    <option value="Santé">Santé & Analyses Médicales</option>
                    <option value="Chimie">Industrie Chimique & Plasturgie</option>
                    <option value="Environnement">Eaux & Environnement</option>
                    <option value="Autre">Autre secteur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Précisions ou besoins particuliers
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Certificat d'étalonnage requis, délai souhaité, etc."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("cart")}
                    className="w-1/3 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer la Demande</span>
                  </button>
                </div>
              </form>
            )}

            {step === "success" && (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Demande de devis transmise !</h3>
                <p className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-bold my-2">
                  Dossier N° {quoteReference}
                </p>
                <div className="bg-lime-50 border border-lime-200 rounded-xl p-3 my-2 text-xs text-lime-900 text-left space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-lime-800">
                    <span>✓ Transmis à :</span>
                    <span className="font-mono">{siteConfig.contact.recipientEmail}</span>
                  </div>
                  <p className="text-[11px] text-lime-700">
                    Enregistré dans l&apos;espace de gestion ROBOLAB.
                  </p>
                </div>

                <div className="w-full space-y-2 mt-4">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmer sur WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.recipientEmail}?subject=${encodeURIComponent(`Demande de Devis N° ${quoteReference} - ${formData.company}`)}&body=${encodeURIComponent(
                      `Bonjour,\n\nVoici ma demande de devis N° ${quoteReference} :\nSociété : ${formData.company}\nContact : ${formData.fullName}\nTél : ${formData.phone}\nVille : ${formData.city}\n\nArticles demandés :\n` +
                      items.map((it, idx) => `${idx + 1}. ${it.product.name} (Réf: ${it.product.reference}) - Qté: ${it.quantity}`).join("\n") +
                      `\n\nNotes : ${formData.notes || "Néant"}`
                    )}`}
                    className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Envoyer un double par ma boîte mail</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                  >
                    Fermer et continuer ma visite
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer of the Drawer */}
          {step === "cart" && items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setStep("form")}
                className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-slate-950 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>Finaliser ma Demande de Devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Transmettre la liste par WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                ✓ Devis gratuit sous 24h • Fiches techniques & Certificats inclus
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
