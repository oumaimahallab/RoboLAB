"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ShieldCheck, X } from "lucide-react";

export default function AdminFloatingBar() {
  const pathname = usePathname();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem("robolab_admin_session");
      setIsAdminLoggedIn(!!session);
    };

    checkSession();
    // Écouter les changements de session
    window.addEventListener("storage", checkSession);
    return () => window.removeEventListener("storage", checkSession);
  }, []);

  // Ne pas afficher si on est déjà sur /admin ou si pas connecté ou masqué
  if (!isAdminLoggedIn || isDismissed || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      aria-label="Barre d'accès administrateur"
      className="fixed top-24 left-4 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-left duration-300"
    >
      <div className="bg-slate-950/95 text-white pl-3.5 pr-2 py-2 rounded-2xl shadow-2xl border border-lime-500/50 backdrop-blur-md flex items-center gap-3 text-xs font-bold transition-all hover:shadow-lime-500/20">
        <Link
          href="/admin"
          className="flex items-center gap-2 group text-white hover:text-lime-400 transition-colors"
          title="Revenir au Panneau d'Administration"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping absolute"></span>
            <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          </div>

          <ArrowLeft className="w-4 h-4 text-lime-400 group-hover:-translate-x-1 transition-transform" />
          <span>Espace Admin</span>
          <span className="text-[10px] bg-lime-500/20 text-lime-400 px-2 py-0.5 rounded-full border border-lime-500/30 font-mono hidden sm:inline">
            Connecté
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
          title="Masquer pour cette visite"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
