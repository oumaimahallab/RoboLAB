"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "Casablanca",
    subject: "Demande d'information générale",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Bonjour ROBOLAB, je vous contacte depuis le site web.\nNom: ${formData.name}\nSociété: ${formData.company}\nVille: ${formData.city}\nObjet: ${formData.subject}\nMessage: ${formData.message}`;
    return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden mb-10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Contactez Nos Équipes
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              À Votre Service Partout au Maroc
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Une demande de devis, une vérification de stock ou un besoin d&apos;étalonnage ? Nos spécialistes sont disponibles par téléphone, e-mail ou WhatsApp.
            </p>
          </div>
        </div>

        {/* Contact Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Branches & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-sky-600" />
                <span>Nos Agences & Showrooms au Maroc</span>
              </h3>

              {/* Casablanca */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-sky-700">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Siège Social & Dépôt Central Casablanca</span>
                </h4>
                <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                  Boulevard Sidi Bernoussi, Quartier Industriel, Casablanca – Maroc
                </p>
                <p className="text-xs text-slate-500 pl-5">
                  Tél : +212 (0) 522 35 06 66 | Mobile : +212 (0) 661 00 00 00
                </p>
              </div>

              {/* Agadir */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-sky-700">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Agence Régionale Sud – Agadir</span>
                </h4>
                <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                  Riad Salam, Agadir – Maroc
                </p>
                <p className="text-xs text-slate-500 pl-5">
                  Tél : +212 (0) 528 29 25 91 | Mobile : +212 (0) 667 76 10 88
                </p>
              </div>

              {/* Tanger */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-sky-700">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Bureau de Liaison Nord – Tanger</span>
                </h4>
                <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                  Zone Franche d&apos;Exportation, Tanger – Maroc
                </p>
              </div>

              {/* Hours */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Du Lundi au Vendredi : 08h30 – 18h00 (Samedi : 09h00 – 13h00)</span>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Assistance Commerciale WhatsApp Direct</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Envoyez directement votre bon de commande ou demande d&apos;information pour un traitement en priorité.
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Ouvrir WhatsApp ({siteConfig.contact.whatsappDisplay})
              </a>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Formulaire de Contact & Renseignements
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Remplissez les champs ci-dessous. Un ingénieur vous répondra dans les plus brefs délais.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Message envoyé avec succès !</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Merci {formData.name}. Notre équipe technico-commerciale a bien reçu votre demande et vous recontactera sous 24h ouvrées.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-500 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Mohamed Benali"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Société / Laboratoire *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Laboratoire XYZ"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Adresse E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@exemple.ma"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Numéro de Téléphone *
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Ville *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Casablanca, Tanger, Agadir..."
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Objet de la demande
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      >
                        <option value="Demande d'information générale">Information générale</option>
                        <option value="Demande de devis spécifique">Demande de devis spécifique</option>
                        <option value="Étalonnage et Métrologie">Étalonnage et Métrologie</option>
                        <option value="Service Après-Vente / Réclamation">Service Après-Vente (SAV)</option>
                        <option value="Projet Laboratoire Clé en Main">Projet Clé en Main</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Votre Message / Références souhaitées *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez les références, quantités, délais requis..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer le Message</span>
                    </button>

                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Envoyer via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
