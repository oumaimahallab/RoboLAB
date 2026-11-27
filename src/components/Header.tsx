"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Search } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import EditableSection from "@/components/cms/EditableSection";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { content } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const headerData = content?.header || {
    phoneDisplay: "06 79 70 62 24",
    whatsappNumber: "212679706224",
    email: "commercial@robolab-tech.com",
    tagline: "VOTRE PARTENAIRE EN SOLUTIONS DE LABORATOIRE"
  };

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "Services", href: "/services" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      router.push(`/catalogue?search=${encodeURIComponent(headerSearch.trim())}`);
      setHeaderSearch("");
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <EditableSection sectionId="header" title="En-tête & Coordonnées">
      {/* Header H1 — Suisse Minimaliste • Aluminium Satiné & Vert Sauge */}
      <header className="sticky top-0 z-40 w-full bg-[#E4E9F0]/95 backdrop-blur-md border-b border-slate-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Left: Clean Brand Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#F8FAFC] border border-slate-300/80 shrink-0 shadow-2xs">
                <Image
                  src="/images/robolab-logo.png"
                  alt="ROBOLAB TECHNOLOGY"
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex items-baseline tracking-tight">
                <span className="text-xl font-black text-[#4D7C0F]">ROBO</span>
                <span className="text-xl font-black text-slate-800">LAB</span>
              </div>
            </Link>

            {/* Center: Minimal Text Navigation with Subtle Sage Active Underline */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 text-[13px] tracking-wide transition-colors ${
                      isActive
                        ? "text-slate-900 font-bold"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#4D7C0F]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Discreet Search Toggle + Single Refined Action Button */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Expandable Search on Desktop */}
              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Rechercher réf, produit..."
                      value={headerSearch}
                      onChange={(e) => setHeaderSearch(e.target.value)}
                      className="w-56 pl-9 pr-8 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4D7C0F]/30 focus:border-[#4D7C0F] text-slate-800 placeholder-slate-400 transition-all"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                      aria-label="Fermer la recherche"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-300/40 transition-colors cursor-pointer"
                    aria-label="Rechercher un produit"
                    title="Rechercher un produit"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Single Refined WhatsApp / Contact Button */}
              <a
                href={`https://wa.me/${headerData.whatsappNumber || "212679706224"}?text=Bonjour%20Robolab,%20je%20souhaite%20un%20devis`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4D7C0F] hover:bg-[#3F6212] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-300/40 rounded-lg cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-300/70 bg-[#EEF2F6] px-4 py-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Réf, marque, produit..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full pl-9 pr-16 py-2.5 text-xs bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:border-[#4D7C0F]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#4D7C0F] text-white rounded-lg text-xs font-semibold"
              >
                OK
              </button>
            </form>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-[#E4E9F0] text-[#4D7C0F] font-bold"
                        : "text-slate-700 hover:bg-[#E4E9F0]/60 font-medium"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </EditableSection>
  );
}
