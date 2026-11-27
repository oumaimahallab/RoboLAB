"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { ShieldCheck, Edit3, LayoutDashboard } from "lucide-react";

export default function AdminClientModePill() {
  const pathname = usePathname();
  const { isAdmin, viewMode, setViewMode } = useAdmin();

  // Do not show on /admin/* routes
  if (pathname?.startsWith("/admin")) return null;

  // Only show if the user is an authenticated admin AND currently in "client" view mode
  if (!isAdmin || viewMode !== "client") return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-slate-950/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl rounded-2xl p-2 px-3 flex items-center gap-2.5 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-semibold pr-2 border-r border-slate-800">
          <ShieldCheck className="w-4 h-4 text-lime-400" />
          <span className="text-[11px] font-bold">Admin : Vue Client</span>
        </div>

        <button
          type="button"
          onClick={() => setViewMode("editor")}
          className="px-2.5 py-1 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black rounded-lg text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
          title="Réactiver le bandeau et les boutons d'édition en direct sur le site"
        >
          <Edit3 className="w-3 h-3" />
          <span>Mode Édition</span>
        </button>

        <Link
          href="/admin/dashboard"
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1"
        >
          <LayoutDashboard className="w-3 h-3 text-lime-400" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
