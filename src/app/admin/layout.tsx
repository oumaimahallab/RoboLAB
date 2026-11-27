"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FileText,
  Sliders,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, setViewMode } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render clean login view without back-office sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: "Tableau de Bord",
      href: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Catalogue Produits",
      href: "/admin/products",
      icon: Package
    },
    {
      name: "Ajouter un Produit",
      href: "/admin/products/create",
      icon: PlusCircle
    },
    {
      name: "Devis & Demandes",
      href: "/admin/requests",
      icon: FileText
    },
    {
      name: "Contenu du Site",
      href: "/admin/content",
      icon: Sliders
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings
    }
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const handleGoToVisualEdit = () => {
    setViewMode("editor");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-800 shrink-0">
            <Image
              src="/images/robolab-logo.png"
              alt="ROBOLAB"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="font-black text-sm tracking-tight text-white">
            ROBOLAB <span className="text-lime-400">ADMIN</span>
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-1/0 md:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-lime-400">ROBO</span>
                <span className="text-base font-black text-white">LAB</span>
                <span className="text-[10px] font-bold bg-lime-500/20 text-lime-400 px-1.5 py-0.2 rounded border border-lime-500/30">
                  CMS
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Back-Office Direction
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-lime-500 text-slate-950 shadow-sm shadow-lime-500/20 font-black"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Visual Edit Mode & Logout */}
        <div className="p-4 border-t border-slate-850 space-y-2 bg-slate-950/60">
          {/* Visual Editing Button */}
          <button
            type="button"
            onClick={handleGoToVisualEdit}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-lime-500/30 text-lime-300 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer group"
            title="Ouvrir le site public avec le bandeau et les boutons d'édition en direct"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
              <span>Voir / Modifier le site</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Top bar on Desktop */}
        <header className="hidden md:flex h-16 bg-slate-950 border-b border-slate-800 items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Administration ROBOLAB</span>
            <span className="text-slate-600">/</span>
            <span className="text-lime-400 font-bold capitalize">
              {pathname?.replace("/admin/", "").replace("/", " ") || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGoToVisualEdit}
              className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-lime-400" />
              <span>Ouvrir Mode Édition Visuelle</span>
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-300">Admin Connecté</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
