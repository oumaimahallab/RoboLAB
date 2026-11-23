import React from "react";
import { PackageCheck, Truck, ShieldCheck, Wrench } from "lucide-react";

export default function ReassuranceBar() {
  const pillars = [
    {
      icon: <PackageCheck className="w-5 h-5 text-lime-600" />,
      title: "Stock Disponible",
      desc: "2 500+ références au Maroc",
    },
    {
      icon: <Truck className="w-5 h-5 text-lime-600" />,
      title: "Livraison 24/48h",
      desc: "Partout dans le Royaume",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-lime-600" />,
      title: "Étalonnage Certifié",
      desc: "Traçabilité ISO 17025",
    },
    {
      icon: <Wrench className="w-5 h-5 text-lime-600" />,
      title: "Installation & SAV",
      desc: "Ingénieurs sur site",
    },
  ];

  return (
    <div className="border-y border-slate-100 bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lime-50/70 border border-lime-100 flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                <p className="text-[11px] text-slate-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
