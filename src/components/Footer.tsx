"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import EditableSection from "@/components/cms/EditableSection";

export default function Footer() {
  const { content } = useCms();
  const footerData = content?.footer || {
    aboutText:
      "Votre partenaire au Maroc en équipements de laboratoire, métrologie de précision, verrerie certifiée et réactifs analytiques.",
    addressCasablanca: "Boulevard Sidi Bernoussi, Quartier Industriel, Casablanca",
    phoneCasablanca: "+212 (0) 522 35 06 66",
    addressAgadir: "Riad Salam, Agadir",
    phoneAgadir: "+212 (0) 528 29 25 91",
    email: "commercial@robolab-tech.com",
    hours: "Lun - Ven : 08h30 - 18h00 | Sam : 09h00 - 13h00",
    copyrightText: "© 2026 ROBOLAB TECHNOLOGY SARL. Tous droits réservés."
  };

  return (
    <EditableSection sectionId="footer" title="Pied de Page & Agences">
      {/* Footer F1 — Éditorial 3 colonnes • Aluminium Satiné & Vert Sauge */}
      <footer className="bg-[#E4E9F0] text-slate-600 text-xs border-t border-slate-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Column 1: Brand & ISO Badge (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-300/80 bg-[#F8FAFC] shrink-0">
                  <Image
                    src="/images/robolab-logo.png"
                    alt="ROBOLAB TECHNOLOGY"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-baseline tracking-tight">
                    <span className="text-lg font-black text-[#4D7C0F]">ROBO</span>
                    <span className="text-lg font-black text-slate-800">LAB</span>
                  </div>
                  <p className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase -mt-0.5">
                    TECHNOLOGY
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
                {footerData.aboutText}
              </p>

              <div className="inline-flex items-center gap-2 text-slate-700 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-slate-300/60">
                <ShieldCheck className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                <span className="text-[11px] font-semibold">Conforme ISO 9001 & ISO 17025</span>
              </div>
            </div>

            {/* Column 2: Clean Navigation (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-slate-600">
                <li>
                  <Link href="/" className="hover:text-[#4D7C0F] transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/catalogue" className="hover:text-[#4D7C0F] transition-colors">
                    Catalogue Produits
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#4D7C0F] transition-colors">
                    Services & Métrologie
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="hover:text-[#4D7C0F] transition-colors">
                    À propos de ROBOLAB
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#4D7C0F] transition-colors">
                    Contact & Devis
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Agencies (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                Contact & Agences
              </h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#4D7C0F] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Casablanca :</strong> {footerData.addressCasablanca}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#4D7C0F] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800">Agadir :</strong> {footerData.addressAgadir}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                  <span className="font-mono text-slate-800">{footerData.phoneCasablanca}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                  <span className="font-mono">{footerData.email}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                  <span>{footerData.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Subtle Legal Bottom Bar */}
          <div className="pt-6 mt-10 border-t border-slate-300/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>{footerData.copyrightText}</p>
            <Link
              href="/admin/login"
              className="hover:text-[#4D7C0F] transition-colors font-semibold"
            >
              Espace Administration
            </Link>
          </div>
        </div>
      </footer>
    </EditableSection>
  );
}
