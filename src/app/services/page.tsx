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
  Layers
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ServicesPage() {
  const services = [
    {
      title: "Étalonnage & Métrologie Certifiée",
      badge: "Accréditation Normes ISO",
      desc: "Prestations d'étalonnage et de vérification périodique des instruments de pesage et de mesure. Nous délivrons des certificats d'étalonnage officiels traçables aux étalons nationaux et internationaux indispensables pour vos audits qualité (ISO 9001, ISO 17025, BPF, HACCP, ONSSA).",
      icon: <ShieldCheck className="w-8 h-8 text-sky-600" />,
      features: [
        "Étalonnage de balances de laboratoire et industrielles (Classes I, II, III)",
        "Étalonnage en température (thermomètres, enceintes thermiques, étuves, autoclaves)",
        "Étalonnage en physico-chimie (pH-mètres, conductimètres, réfractomètres)",
        "Délivrance de certificats avec calcul d'incertitude de mesure"
      ]
    },
    {
      title: "Laboratoires Clés en Main (Aménagement)",
      badge: "Ingénierie & Design",
      desc: "De la conception des plans 2D/3D jusqu'à la mise en service finale : ROBOLAB aménage vos laboratoires en intégrant le mobilier technique (paillasses en grès ou résine, sorbonnes à flux laminaire, armoires de sécurité) et les réseaux d'adduction de fluides et gaz spéciaux.",
      icon: <Layers className="w-8 h-8 text-sky-600" />,
      features: [
        "Étude d'ergonomie et modélisation 3D du laboratoire",
        "Installation de paillasses modulaires sèches et humides certifiées EN 13150",
        "Pose de hottes et sorbonnes d'extraction avec réseau de gaines",
        "Sécurisation des zones de stockage chimiques selon normes anti-incendie"
      ]
    },
    {
      title: "Service Après-Vente (SAV) & Maintenance",
      badge: "Réactivité 24/48h",
      desc: "Une équipe d'ingénieurs et techniciens biomédicaux mobiles dans tout le Maroc. Nous assurons la maintenance préventive et curative de vos appareils avec des pièces détachées d'origine certifiées constructeur.",
      icon: <Wrench className="w-8 h-8 text-sky-600" />,
      features: [
        "Contrats de maintenance préventive annuelle",
        "Diagnostic rapide et intervention sur site sous 24 à 48h",
        "Stock permanent de pièces de rechange d'origine",
        "Prêt d'appareils de remplacement en cas d'immobilisation prolongée"
      ]
    },
    {
      title: "Formation & Qualification Équipements",
      badge: "Transfert de Compétences",
      desc: "Nous accompagnons vos équipes techniques et scientifiques pour une prise en main rapide et optimale de vos nouveaux instruments. Qualification d'installation (QI), qualification opérationnelle (QO) et de performance (QP).",
      icon: <GraduationCap className="w-8 h-8 text-sky-600" />,
      features: [
        "Formation théorique et pratique des laborantins et techniciens",
        "Protocoles de qualification QI/QO/QP conformes pharmacopée",
        "Supports de cours et fiches mémo de manipulation sécurisée",
        "Attestations de formation nominatives délivrées à l'issue de la session"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Expertise & Services d&apos;Ingénierie ROBOLAB</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Prestations Techniques, Étalonnage & Projets Clés en Main
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Plus qu&apos;un simple distributeur de matériel, ROBOLAB est votre partenaire technique global au Maroc : de la conception de vos espaces à la conformité métrologique de vos instruments.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/devis"
                className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Demander un Devis de Service
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis%20pour%20etalonnage%20ou%20maintenance`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Assistance SAV WhatsApp
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
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
                    {serv.icon}
                  </div>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                    {serv.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{serv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{serv.desc}</p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {serv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  <span>Demander une étude personnalisée</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit & Intervention Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl md:text-2xl font-black">
              Un audit de votre parc d&apos;instruments de mesure ?
            </h3>
            <p className="text-xs md:text-sm text-sky-100">
              Nos métrologues interviennent sur tout le territoire marocain pour diagnostiquer l&apos;état de vos balances, sondes et appareils d&apos;analyse.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 shadow-md transition-all shrink-0"
          >
            Planifier une Intervention
          </Link>
        </div>
      </section>
    </div>
  );
}
