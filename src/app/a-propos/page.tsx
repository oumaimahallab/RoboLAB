import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
  Award,
  Globe2,
  Building,
  ArrowRight
} from "lucide-react";

export default function AProposPage() {
  const stats = [
    { value: "2 500+", label: "Instruments & Réactifs en Stock" },
    { value: "450+", label: "Laboratoires & Usines Clients au Maroc" },
    { value: "15+", label: "Partenaires Constructeurs Mondiaux" },
    { value: "100%", label: "Conformité Normes Qualité & ISO" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Qui sommes-nous ?</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              ROBOLAB : L&apos;Excellence Scientifique et Technologique au Maroc
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Acteur de référence dans la commercialisation de matériel de laboratoire, d&apos;instruments de mesure de haute précision et de réactifs chimiques, ROBOLAB s&apos;engage pour la rigueur scientifique de ses partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-sky-600">{s.value}</div>
              <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
              Notre Mission
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Accompagner la Transition et l&apos;Excellence Analytique au Maroc
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Face aux exigences croissantes des normes internationales d&apos;exportation (HACCP, BPF, ISO 17025) dans les secteurs agroalimentaire, pharmaceutique et chimique marocains, <strong>ROBOLAB</strong> s&apos;est donné pour mission de fournir aux entreprises et institutions des équipements certifiés, fiables et durables.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Nous combinons la disponibilité immédiate des consommables et de la verrerie avec une expertise en instrumentation analytique complexe (balances semi-micro, spectrophotomètres, réacteurs chimiques, hottes et autoclaves).
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Sélection rigoureuse des meilleurs constructeurs allemands et européens</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Traçabilité métrologique complète avec certificats d&apos;étalonnage</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Service après-vente réactif avec stock permanent de pièces détachées</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
              alt="Laboratoire moderne ROBOLAB"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Engagements & Valeurs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Nos Engagements
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
            Pourquoi Choisir ROBOLAB ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Qualité Certifiée</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tous nos instruments et verreries répondent scrupuleusement aux normes ISO, DIN et pharmacopées européennes en vigueur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Conseil d&apos;Ingénieurs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nos conseillers sont des spécialistes formés en chimie, biologie et métrologie, capables de comprendre précisément votre protocole d&apos;analyse.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Couverture Nationale</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Implantés à Casablanca avec des relais à Agadir et Tanger, nous assurons des livraisons rapides et des interventions techniques dans tout le Royaume.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
