"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileCheck,
  Send,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Printer,
  ArrowRight
} from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { siteConfig } from "@/config/site";

export default function DevisPage() {
  const { items, updateQuantity, removeFromQuote, clearQuote } = useQuote();

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    ice: "",
    phone: "",
    email: "",
    city: "Casablanca",
    sector: "Agroalimentaire",
    deliveryDelay: "Sous 24h à 48h (Urgent)",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `RB-DEV-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteReference(ref);

    try {
      await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          ice: formData.ice,
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
      console.error("Erreur enregistrement devis :", err);
    }

    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    let msg = `*DEMANDE DE DEVIS OFFICIEL ROBOLAB*\n\n`;
    if (formData.company) msg += `Société : *${formData.company}*\n`;
    if (formData.ice) msg += `ICE : ${formData.ice}\n`;
    if (formData.fullName) msg += `Contact : ${formData.fullName}\n`;
    if (formData.phone) msg += `Tél : ${formData.phone}\n`;
    if (formData.city) msg += `Ville : ${formData.city}\n\n`;
    msg += `*LISTE DU MATÉRIEL SOUHAITÉ :*\n`;

    if (items.length > 0) {
      items.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.product.name} (Réf: ${item.product.reference})\n`;
        if (item.selectedVariant) msg += `   - Option : ${item.selectedVariant}\n`;
        msg += `   - Quantité : ${item.quantity}\n`;
      });
    } else {
      msg += formData.notes || "Demande générale de tarif.\n";
    }

    msg += `\nMerci de nous transmettre votre offre de prix HT et délais.`;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Devis B2B Rapide & Gratuit
            </span>
            <h1 className="text-2xl md:text-4xl font-black">
              Demande de Devis Officiel pour Laboratoire
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Composez votre sélection d&apos;équipements et recevez notre offre officielle avec fiches techniques et certificats sous 24h ouvrées.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Demande de devis enregistrée !</h2>
            <p className="text-xs font-mono bg-sky-50 text-sky-800 py-1.5 px-4 rounded-full font-bold inline-block">
              Référence Dossier : {quoteReference}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Votre dossier a été transmis à notre service commercial. Vous recevrez une proposition officielle au format PDF par e-mail dans un délai maximum de 24h.
            </p>

            <div className="pt-4 space-y-3">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmer et accélérer le traitement sur WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-6 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Sauvegarder ce récapitulatif</span>
              </button>

              <div className="pt-2">
                <Link
                  href="/catalogue"
                  onClick={() => clearQuote()}
                  className="text-xs text-sky-600 hover:underline font-bold"
                >
                  Retourner au catalogue produits
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items Review */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sky-600" />
                    <span>Articles Sélectionnés ({items.length})</span>
                  </h3>
                  {items.length > 0 && (
                    <button
                      onClick={clearQuote}
                      className="text-[11px] text-red-500 hover:underline font-medium"
                    >
                      Tout retirer
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs text-slate-500">
                      Vous n&apos;avez pas encore sélectionné de produit depuis le catalogue.
                    </p>
                    <Link
                      href="/catalogue"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline pt-2"
                    >
                      <span>Ajouter des équipements depuis le catalogue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <p className="text-[11px] text-slate-400 pt-2">
                      (Vous pouvez également saisir vos besoins directement dans le formulaire ci-contre)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedVariant || "default"}`}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white overflow-hidden relative shrink-0 border border-slate-200">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-slate-500">
                            Réf: {item.product.reference} {item.selectedVariant && `• ${item.selectedVariant}`}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)
                              }
                              className="w-5 h-5 bg-white border border-slate-300 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800">
                              Qté: {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)
                              }
                              className="w-5 h-5 bg-white border border-slate-300 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.product.id, item.selectedVariant)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 space-y-2 text-xs text-sky-900">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Engagements ROBOLAB pour vos devis :</span>
                </div>
                <ul className="space-y-1.5 pl-6 list-disc text-[11px] text-sky-800">
                  <li>Validité de l&apos;offre de prix : 30 jours</li>
                  <li>Indication claire des délais de livraison et stocks</li>
                  <li>Fiches techniques constructeur et certificats fournis</li>
                  <li>Possibilité de convention annuelle pour tarifs préférentiels</li>
                </ul>
              </div>
            </div>

            {/* Right: Devis Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Coordonnées de l&apos;Acheteur / Établissement
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Veuillez renseigner les informations indispensables à l&apos;émission de la proposition commerciale officielle.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nom et Prénom du demandeur *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Dr. Karim Tazi"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Raison Sociale / Laboratoire *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Société / Usine / Clinique"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Numéro ICE (Optionnel)
                      </label>
                      <input
                        type="text"
                        value={formData.ice}
                        onChange={(e) => setFormData({ ...formData, ice: e.target.value })}
                        placeholder="001234567000089"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Téléphone de contact *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6..."
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Ville de livraison *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Casablanca, Agadir..."
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        E-mail professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="achat@votre-entreprise.ma"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Secteur d&apos;activité
                      </label>
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      >
                        <option value="Agroalimentaire">Industrie Agroalimentaire</option>
                        <option value="Pharmaceutique">Pharmacie & Cosmétique</option>
                        <option value="Santé">Biologie & Analyses Médicales</option>
                        <option value="Recherche">Recherche Scientifique & Universités</option>
                        <option value="Chimie">Chimie, Plasturgie, Mines & BTP</option>
                        <option value="Eaux">Traitement des Eaux & Environnement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cahier des charges, Références complémentaires ou Délais souhaités
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Précisez toute référence manquante, besoin de certificat d'étalonnage, installation sur site..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Valider et Recevoir mon Devis sous 24h</span>
                    </button>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Transmettre par WhatsApp</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
