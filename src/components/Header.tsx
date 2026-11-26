"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  MessageCircle,
  Search
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Nos Produits", href: "/catalogue" },
    { name: "Services & SAV", href: "/services" },
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      router.push(`/catalogue?search=${encodeURIComponent(headerSearch.trim())}`);
      setHeaderSearch("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Clean Single Navigation Bar - No redundant top strips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB TECHNOLOGY"
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-baseline tracking-tight">
                <span className="text-xl font-black text-lime-600">ROBO</span>
                <span className="text-xl font-black text-slate-900">LAB</span>
              </div>
              <p className="text-[9px] font-black tracking-[0.25em] text-lime-600 uppercase -mt-0.5">
                TECHNOLOGY
              </p>
            </div>
          </Link>

          {/* Quick Search Bar - Integrated Cleanly */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-sm lg:max-w-md relative"
          >
            <input
              type="text"
              placeholder="Rechercher équipement, référence (ex: PX224, pH...)"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-slate-900 hover:bg-lime-600 text-white rounded-full text-[11px] font-bold transition-colors"
            >
              Chercher
            </button>
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-lime-600 font-bold"
                      : "text-slate-700 hover:text-lime-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Single Contact / WhatsApp Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          {/* Mobile search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Réf, marque, produit..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-9 pr-20 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Chercher
            </button>
          </form>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-lime-600"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-lime-500 text-slate-950 font-black text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp : {siteConfig.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
