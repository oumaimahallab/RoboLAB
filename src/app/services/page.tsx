import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Wrench,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Clock,
  Settings,
  Scale,
  Thermometer,
  FlaskConical,
  Pipette,
  FileText,
  BadgeCheck,
  Building2,
  CalendarCheck2
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Services & SAV | ROBOLAB TECHNOLOGY - Étalonnage & Maintenance de Laboratoire au Maroc",
  description: "Services techniques de laboratoire au Maroc : étalonnage certifié ISO 17025, installation sur site, maintenance préventive et curative, qualification QI/QO et SAV réactif."
};

export default function ServicesPage() {
  const poles = [
    {
      id: "etalonnage",
      title: "Étalonnage & Métrologie Certifiée",
      badge: "Traçabilité ISO 17025",
      lead: "Contrôle métrologique de haute précision pour instruments de pesage, température et physico-chimie.",
      icon: <Scale className="w-7 h-7 text-lime-600" />,
      items: [
        "Balances d'analyse (0.1 mg, 0.01 mg semi-micro) et balances de précision",
        "Enceintes thermiques : étuves de séchage, incubateurs, bains-marie (-20°C à +300°C)",
        "Instruments physico-chimiques : pH-mètres, conductimètres, réfractomètres, spectrophotomètres",
        "Délivrance de certificats d'étalonnage officiels avec incertitudes pour audits ISO 9001, ISO 17025, ONSSA et BPF"
      ],
      actionLabel: "Demander un étalonnage",
      actionHref: "/contact?subject=etalonnage"
    },
    {
      id: "installation",
      title: "Installation & Mise en Service sur Site",
      badge: "Opérationnel Immédiat",
      lead: "Prise en charge intégrale de la livraison, de l'implantation sur paillasse et des essais à blanc.",
      icon: <Settings className="w-7 h-7 text-lime-600" />,
      items: [
        "Déballage sécurisé, positionnement sur paillasse anti-vibratoire et mise à niveau de précision",
        "Raccordements électriques, aérauliques et vérification des sécurités d'alimentation",
        "Tests de conformité fonctionnelle et essais à blanc avec réactifs étalons",
        "Établissement du Procès-Verbal (PV) officiel de réception et mise en service"
      ],
      actionLabel: "Planifier une mise en service",
      actionHref: "/contact?subject=installation"
    },
    {
      id: "maintenance",
      title: "Maintenance Préventive & Dépannage SAV",
      badge: "Intervention 24/48h",
      lead: "Assistance technique réactive pour garantir la continuité opérationnelle de vos analyses.",
      icon: <Wrench className="w-7 h-7 text-lime-600" />,
      items: [
        "Contrats d'entretien semestriels ou annuels pour anticiper les pannes et dérives de mesure",
        "Diagnostic technique et réparation sur site sous 24 à 48h partout au Maroc",
        "Stock permanent de pièces détachées d'origine constructeur, cartes électroniques et capteurs",
        "Mise à disposition d'équipements de courtoisie / prêt selon disponibilité"
      ],
      actionLabel: "Demander une intervention SAV",
      actionHref: "/contact?subject=sav"
    },
    {
      id: "qualification",
      title: "Qualification QI / QO & Formation",
      badge: "Conformité BPF & Audits",
      lead: "Documentation réglementaire rigoureuse et transfert de compétences pour vos équipes de laboratoire.",
      icon: <GraduationCap className="w-7 h-7 text-lime-600" />,
      items: [
        "Protocoles complets de Qualification d'Installation (QI) et Qualification Opérationnelle (QO)",
        "Assistance technique à la préparation de vos audits d'accréditation et inspections qualité",
        "Formation pratique des techniciens et laborantins aux bonnes pratiques de manipulation",
        "Remise d'attestations nominatives de formation technique"
      ],
      actionLabel: "Demander une qualification QI/QO",
      actionHref: "/contact?subject=qualification"
    }
  ];

  const metrologyScope = [
    {
      domain: "Pesage & Masse",
      icon: <Scale className="w-5 h-5 text-lime-600" />,
      equipment: "Balances semi-micro, analytiques, de précision, dessiccateurs infrarouge/halogène",
      standards: "Poids étalons de classe OIML E2 et F1 raccordés aux étalons nationaux",
      deliverable: "Certificat d'étalonnage (justesse, répétabilité, excentricité, incertitude)"
    },
    {
      domain: "Température & Thermométrie",
      icon: <Thermometer className="w-5 h-5 text-lime-600" />,
      equipment: "Étuves universelles, incubateurs bactériologiques, bains-marie, congélateurs -80°C",
      standards: "Chaînes thermométriques étalonnées Pt100 et enregistreurs multipoints certifiés",
      deliverable: "Rapport de cartographie thermique 9 ou 15 points, certificat d'étalonnage"
    },
    {
      domain: "Physico-Chimie & Optique",
      icon: <FlaskConical className="w-5 h-5 text-lime-600" />,
      equipment: "pH-mètres de paillasse, conductimètres, réfractomètres numériques, spectrophotomètres",
      standards: "Matériaux de référence certifiés (CRM) traçables NIST / DAkkS",
      deliverable: "Constat de vérification périodique, courbe d'étalonnage et contrôle de linéarité"
    },
    {
      domain: "Volumétrie & Manipulation",
      icon: <Pipette className="w-5 h-5 text-lime-600" />,
      equipment: "Micropipettes mono-canal, multi-canaux, distributeurs sur flacon, burettes digitales",
      standards: "Méthode gravimétrique normalisée ISO 8655 avec balance analytique dédiée",
      deliverable: "Fiche de contrôle volumétrique, calcul d'erreur systématique et aléatoire"
    }
  ];

  return (
    <div className="bg-[#EEF2F6] min-h-screen py-10 space-y-16">
      {/* 1. HERO HEADER - Palette 1 Aluminium Satiné & Vert Sauge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAFC] rounded-3xl p-8 md:p-14 border border-slate-300/60 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFE0] text-[#3F6212] text-xs font-semibold border border-[#C8DAB8]">
              <Sparkles className="w-3.5 h-3.5 text-[#4D7C0F]" />
              <span>SUPPORT TECHNIQUE & MÉTROLOGIE INDUSTRIELLE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Services Techniques, Étalonnage & SAV de Laboratoire
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
              Au-delà de la distribution, ROBOLAB TECHNOLOGY assure la qualification, la maintenance préventive et l&apos;étalonnage certifié de vos instruments de mesure partout au Maroc avec des délais d&apos;intervention stricts sous 24/48h.
            </p>

            {/* Direct Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact?subject=etalonnage"
                className="px-6 py-3.5 rounded-full bg-[#4D7C0F] hover:bg-[#3F6212] text-white font-semibold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Demander une Intervention Technique</span>
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-[#4D7C0F] shrink-0" />
                <span>Intervention sous 24/48h ouvrées partout au Maroc</span>
              </div>
            </div>
          </div>

          {/* 4 Trust Metrics Bar */}
          <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <strong className="text-slate-900 text-lg font-black block">24 / 48h</strong>
              <span className="text-slate-500 text-[11px]">Délai d&apos;intervention sur site</span>
            </div>
            <div>
              <strong className="text-lime-700 text-lg font-black block">ISO 17025</strong>
              <span className="text-slate-500 text-[11px]">Étalons certifiés & raccordés</span>
            </div>
            <div>
              <strong className="text-slate-900 text-lg font-black block">100% Origine</strong>
              <span className="text-slate-500 text-[11px]">Pièces constructeur certifiées</span>
            </div>
            <div>
              <strong className="text-lime-700 text-lg font-black block">Maroc Entier</strong>
              <span className="text-slate-500 text-[11px]">Casablanca • Agadir • Tanger</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 SERVICE PILLARS (Clean Cards with specific technical actions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-lime-700">
            Expertise & Prestations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Nos Domaines d&apos;Intervention Technique
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Des prestations encadrées par des ingénieurs métrologues et biomédicaux qualifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poles.map((pole) => (
            <div
              key={pole.id}
              id={pole.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-lime-300 transition-all flex flex-col justify-between scroll-mt-24"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-lime-50 border border-lime-100 flex items-center justify-center">
                    {pole.icon}
                  </div>
                  <span className="text-[11px] font-bold text-lime-800 bg-lime-50 border border-lime-200 px-3 py-1 rounded-full">
                    {pole.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{pole.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{pole.lead}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {pole.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={pole.actionHref}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-slate-50 hover:bg-lime-50 border border-slate-200 hover:border-lime-300 rounded-xl text-xs font-bold text-slate-800 hover:text-lime-800 transition-colors group"
                >
                  <span>{pole.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-lime-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SCIENTIFIC METROLOGY SCOPE TABLE (Like Dutscher / Razilab benchmark) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-lime-700">
                Traçabilité & Méthodes
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                Capacités Métrologiques & Étendues de Mesure
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <BadgeCheck className="w-4 h-4 text-lime-600" />
              <span>Conforme ISO 17025 / OIML / ASTM</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Grandeur / Domaine</th>
                  <th className="py-3 px-4">Équipements Pris en Charge</th>
                  <th className="py-3 px-4">Étalons & Références</th>
                  <th className="py-3 px-4">Document Délivré</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrologyScope.map((scope, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-lime-50 text-lime-700">
                        {scope.icon}
                      </div>
                      <span>{scope.domain}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs">{scope.equipment}</td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs">{scope.standards}</td>
                    <td className="py-4 px-4 text-slate-900 font-medium">
                      <span className="inline-block bg-lime-50 text-lime-800 px-2.5 py-1 rounded-md text-[11px] border border-lime-200 font-semibold">
                        {scope.deliverable}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW: 4 STEP PROCESS (Illustrated Infographic matching User Request) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col items-center">
          <div className="relative w-full aspect-[1024/321] max-w-5xl rounded-2xl overflow-hidden">
            <Image
              src="/images/methodologie-intervention-robolab.jpg"
              alt="Méthodologie Éprouvée - Comment se Déroule une Intervention ROBOLAB"
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* 5. QUALITY & ACCREDITATIONS (Soft Reassurance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-700">
              Garantie & Conformité Réglementaire
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-900">
              Préparez Vos Audits Qualité en Toute Sérénité
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nos constats et certificats répondent aux exigences des référentiels <strong>ISO 9001</strong>, <strong>ISO 17025</strong>, <strong>ONSSA</strong>, <strong>BPF / GMP</strong> et <strong>HACCP</strong> pour une conformité totale lors de vos inspections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact?subject=etalonnage"
              className="px-6 py-3 rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Planifier une Intervention
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis%20de%20service%20ou%20etalonnage`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-lime-600" />
              <span>Assistance SAV : {siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
