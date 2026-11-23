import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      {/* Top Banner with Lime Accent */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-lime-400 font-bold uppercase tracking-widest text-[11px]">
              Besoin d&apos;un Devis Rapide ?
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mt-1">
              Transmettez votre cahier des charges ou liste d&apos;équipements
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Nos ingénieurs vous répondent sous 24h avec une offre chiffrée officielle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/devis"
              className="px-6 py-2.5 rounded-xl bg-lime-600 hover:bg-lime-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Demander un Devis en Ligne</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-lime-400 border border-slate-700 font-bold text-xs transition-all flex items-center gap-2"
            >
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shrink-0">
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
                  <span className="text-lg font-black text-lime-400">ROBO</span>
                  <span className="text-lg font-black text-white">LAB</span>
                </div>
                <p className="text-[9px] font-black tracking-[0.2em] text-lime-400 uppercase -mt-0.5">
                  TECHNOLOGY
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Importation, distribution d&apos;instruments scientifiques de haute précision, verrerie, réactifs et aménagement de laboratoires au Maroc.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
              <span className="text-[11px]">Conforme aux normes ISO 9001 & ISO 17025</span>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-lime-500 pl-2">
              Familles d&apos;Équipements
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue?categorie=${cat.slug}`}
                    className="hover:text-lime-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-lime-500">•</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-lime-500 pl-2">
              Services & SAV
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  • Étalonnage & Métrologie Certifiée
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  • Aménagement Laboratoires Clés en Main
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  • Maintenance & SAV sous 24/48h
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-white transition-colors">
                  • Demande de Devis Gratuite
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  • Notre Engagement Qualité
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Implantation au Maroc */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-lime-500 pl-2">
              Présence au Maroc
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Casablanca :</strong> Boulevard Sidi Bernoussi, Quartier Industriel
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Agadir :</strong> Riad Salam
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{siteConfig.contact.mobile} / {siteConfig.contact.phoneCasablanca}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 ROBOLAB TECHNOLOGY SARL. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/a-propos" className="hover:text-slate-300 transition-colors">
              Mentions Légales
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            <Link href="/devis" className="hover:text-slate-300 transition-colors">
              Devis
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
