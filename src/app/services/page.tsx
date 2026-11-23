import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  CheckCircle2,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Clock,
  Settings
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ServicesPage() {
  const services = [
    {
      title: "Étalonnage & Métrologie Certifiée",
      badge: "Traçabilité ISO 17025",
      desc: "Prestations d'étalonnage et de vérification périodique de vos instruments de pesage et de mesure. Nous délivrons des constats de vérification et certificats d'étalonnage traçables aux étalons internationaux, indispensables pour vos audits qualité (ISO 9001, ISO 17025, BPF, HACCP, ONSSA).",
      icon: <ShieldCheck className="w-8 h-8 text-lime-600" />,
      features: [
        "Étalonnage de balances de laboratoire (précision & semi-micro 0.01mg)",
        "Étalonnage en température (étuves, bains-marie, thermomètres)",
        "Étalonnage physico-chimique (pH-mètres, conductimètres, réfractomètres)",
        "Délivrance de certificats officiels avec calcul d'incertitude"
      ]
    },
    {
      title: "Installation & Mise en Service",
      badge: "Opérationnel Immédiat",
      desc: "Nos techniciens spécialisés assurent la livraison sécurisée, le déballage, le raccordement et les réglages initiaux de vos appareils scientifiques sur site partout au Maroc pour garantir des performances optimales dès le premier jour.",
      icon: <Settings className="w-8 h-8 text-lime-600" />,
      features: [
        "Installation sur paillasse et mise à niveau de haute précision",
        "Raccordement et vérification des paramètres d'alimentation",
        "Tests de fonctionnement et essais à blanc avec réactifs étalons",
        "Procès-verbal de réception et mise en service officielle"
      ]
    },
    {
      title: "Service Après-Vente (SAV) & Maintenance",
      badge: "Intervention 24/48h",
      desc: "Une équipe technique réactive basée à Casablanca et mobile dans toutes les régions du Maroc. Nous assurons la maintenance préventive et le dépannage rapide avec des pièces détachées d'origine certifiées.",
      icon: <Wrench className="w-8 h-8 text-lime-600" />,
      features: [
        "Contrats de maintenance préventive semestrielle ou annuelle",
        "Diagnostic technique et dépannage sur site sous 24 à 48h",
        "Stock permanent de pièces de rechange et capteurs de rechange",
        "Appareil de prêt disponible lors des révisions approfondies"
      ]
    },
    {
      title: "Formation & Qualification (QI / QO)",
      badge: "Transfert de Compétences",
      desc: "Accompagnement de vos techniciens et laborantins pour la maîtrise rapide de leurs nouveaux équipements. Protocoles de qualification d'installation (QI) et qualification opérationnelle (QO) sur demande.",
      icon: <GraduationCap className="w-8 h-8 text-lime-600" />,
      features: [
        "Formation pratique à l'utilisation et au bon entretien du matériel",
        "Protocoles de qualification QI/QO documentés",
        "Guides de manipulation et fiches de bonnes pratiques",
        "Attestations de formation délivrées aux opérateurs"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold border border-lime-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Services Techniques ROBOLAB</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Étalonnage, Métrologie & Support Technique
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Plus qu&apos;un simple distributeur, ROBOLAB vous accompagne dans le maintien de vos instruments aux normes de précision les plus strictes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/devis"
                className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs shadow-md transition-colors"
              >
                Demander un Devis de Service
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis%20pour%20etalonnage%20ou%20maintenance`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-lime-400" />
                <span>Assistance SAV WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((serv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-lime-50 border border-lime-100 flex items-center justify-center">
                    {serv.icon}
                  </div>
                  <span className="text-[11px] font-bold text-lime-800 bg-lime-50 border border-lime-200 px-3 py-1 rounded-full">
                    {serv.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{serv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{serv.desc}</p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {serv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-700 hover:text-lime-800"
                >
                  <span>Prendre contact pour ce service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intervention Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl md:text-2xl font-black">
              Besoin d&apos;un certificat d&apos;étalonnage ou d&apos;une révision ?
            </h3>
            <p className="text-xs text-slate-300">
              Nos techniciens interviennent sur site à Casablanca, Rabat, Tanger, Fès, Marrakech et Agadir.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs shadow-md transition-all shrink-0"
          >
            Planifier une Intervention
          </Link>
        </div>
      </section>
    </div>
  );
}
