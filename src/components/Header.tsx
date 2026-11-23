"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Scale,
  Gauge,
  Cpu,
  FlaskConical,
  Atom,
  ShieldCheck,
  FileText
} from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { siteConfig } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Scale":
        return <Scale className="w-4 h-4 text-lime-600" />;
      case "Gauge":
        return <Gauge className="w-4 h-4 text-lime-600" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-lime-600" />;
      case "FlaskConical":
        return <FlaskConical className="w-4 h-4 text-lime-600" />;
      case "Atom":
        return <Atom className="w-4 h-4 text-lime-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-lime-600" />;
      default:
        return <FlaskConical className="w-4 h-4 text-lime-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Discreet Dark Top Bar with Lime Accent */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Casablanca • Agadir • Tanger</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-lime-400 font-semibold tracking-wide">
              ROBOLAB TECHNOLOGY — Équipements de laboratoire & métrologie
            </span>
          </div>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Bonjour%20Robolab`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-lime-400 hover:text-lime-300 font-bold tracking-wide"
          >
            <span>WhatsApp direct : {siteConfig.contact.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Logo with matching image & typography */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm shrink-0">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB TECHNOLOGY Logo"
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

          {/* Clean Search Input with Lime Focus */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher équipement, référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/catalogue?search=${encodeURIComponent(product.name)}`}
                    onClick={() => {
                      setSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-lime-50 text-xs text-slate-800"
                  >
                    <FileText className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                    <span className="truncate flex-1">{product.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{product.reference}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className={`text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/" ? "text-lime-600 font-bold" : "text-slate-600 hover:text-lime-600"
              }`}
            >
              Accueil
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <Link
                href="/catalogue"
                className={`flex items-center gap-1 text-xs font-semibold tracking-wide py-2 transition-colors ${
                  pathname.startsWith("/catalogue")
                    ? "text-lime-600 font-bold"
                    : "text-slate-600 hover:text-lime-600"
                }`}
              >
                <span>Catalogue</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </Link>

              {categoriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-2 z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogue?categorie=${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-lime-50/70 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center shrink-0 group-hover:bg-lime-600 group-hover:text-white transition-colors">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-lime-700">
                          {cat.name.split("&")[0]}
                        </h4>
                        <span className="text-[10px] text-slate-400">{cat.itemCount}+ réf.</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/services" ? "text-lime-600 font-bold" : "text-slate-600 hover:text-lime-600"
              }`}
            >
              Services & Étalonnage
            </Link>

            <Link
              href="/a-propos"
              className={`text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/a-propos" ? "text-lime-600 font-bold" : "text-slate-600 hover:text-lime-600"
              }`}
            >
              À Propos
            </Link>

            <Link
              href="/contact"
              className={`text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/contact" ? "text-lime-600 font-bold" : "text-slate-600 hover:text-lime-600"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Quote Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
              title="Mon Devis"
            >
              <ShoppingCart className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline text-xs font-medium text-slate-700">Devis</span>
              {totalItems > 0 && (
                <span className="w-4 h-4 bg-lime-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              href="/devis"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-900 hover:bg-lime-600 text-white text-xs font-bold transition-all shadow-xs"
            >
              Demander un Devis
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Accueil
          </Link>
          <Link
            href="/catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Catalogue Produits
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Services & Étalonnage
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            À Propos
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
