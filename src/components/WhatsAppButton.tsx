"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function WhatsAppButton() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {tooltipOpen && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-3 max-w-[220px] text-xs text-slate-700 relative animate-in fade-in slide-in-from-right duration-300">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-slate-900 mb-0.5">Besoin d&apos;un conseil rapide ?</p>
          <p className="text-[11px] text-slate-500">
            Échangez directement avec un ingénieur technico-commercial ROBOLAB.
          </p>
        </div>
      )}

      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20ROBOLAB,%20je%20souhaite%20un%20renseignement%20sur%20vos%20équipements%20de%20laboratoire`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#4D7C0F] hover:bg-[#3F6212] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
        title="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
