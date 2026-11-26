"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  ExternalLink,
  RefreshCw,
  Lock,
  LogOut,
  Globe,
  Settings,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Building2,
  MessageCircle,
  FileCheck,
  AlertCircle,
  AlertTriangle,
  Eye,
  Filter
} from "lucide-react";
import { Product, Category } from "@/types";
import { SiteSettings } from "@/lib/dataStore";
import { useAdmin } from "@/context/AdminContext";

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Tabs state
  const [activeTab, setActiveTab] = useState<"products" | "content" | "quotes">("products");

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Site Settings state
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Quotes state
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [quoteSearch, setQuoteSearch] = useState("");
  const [quoteFilter, setQuoteFilter] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  const { login: adminContextLogin, logout: adminContextLogout } = useAdmin();

  // Check existing session
  useEffect(() => {
    const session = localStorage.getItem("robolab_admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadSettings();
      loadQuotes();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("robolab_admin_session", data.token);
        adminContextLogin(data.token);
      } else {
        setAuthError(data.error || "Mot de passe incorrect.");
      }
    } catch (err) {
      setAuthError("Erreur lors de la connexion.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("robolab_admin_session");
    setIsAuthenticated(false);
    adminContextLogout();
  };

  // --- PRODUCTS ACTIONS ---
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Erreur chargement produits:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct({
      name: "",
      reference: "",
      brand: "Ohaus",
      category: "balances",
      categoryLabel: "Balances & Pesage de Précision",
      subcategory: "Balances Analytiques (0.1 mg)",
      price: "Sur devis",
      inStock: true,
      image: "",
      shortDescription: "",
      description: "",
      specifications: [
        { name: "Portée max", value: "220 g" },
        { name: "Précision", value: "0.1 mg" }
      ],
      features: ["Conforme ISO / BPF", "Écran tactile couleur"],
      applications: ["Contrôle Qualité", "Recherche"]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(productToDelete.id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        flashMessage(`Le produit "${productToDelete.name}" a été définitivement supprimé.`);
        setProductToDelete(null);
      } else {
        alert(data.error || "Erreur lors de la suppression.");
      }
    } catch (err) {
      alert("Erreur réseau lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        loadProducts();
        flashMessage(
          editingProduct.id
            ? "Produit mis à jour avec succès !"
            : "Nouveau produit ajouté au catalogue !"
        );
      } else {
        alert(data.error || "Erreur enregistrement.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    }
  };

  // Image Upload handler
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditingProduct((prev) => (prev ? { ...prev, image: data.url } : null));
      } else {
        alert(data.error || "Erreur upload image.");
      }
    } catch (err) {
      alert("Erreur réseau upload.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Quick Stock Toggle
  const handleToggleStock = async (prod: Product) => {
    const updated = { ...prod, inStock: !prod.inStock };
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p.id === prod.id ? updated : p)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- SETTINGS ACTIONS ---
  const loadSettings = async () => {
    setLoadingSettings(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings || {});
      }
    } catch (err) {
      console.error("Erreur chargement paramètres:", err);
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      }
    } catch (err) {
      alert("Erreur enregistrement paramètres.");
    }
  };

  // --- QUOTES ACTIONS ---
  const loadQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const res = await fetch("/api/devis");
      const data = await res.json();
      if (data.success) {
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      console.error("Erreur chargement devis:", err);
    } finally {
      setLoadingQuotes(false);
    }
  };

  const flashMessage = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (productSearch.trim()) {
      const term = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.reference.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.categoryLabel?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Filtered Quotes
  const filteredQuotes = quotes.filter((q) => {
    if (quoteFilter !== "all" && q.status !== quoteFilter) return false;
    if (quoteSearch.trim()) {
      const term = quoteSearch.toLowerCase();
      return (
        q.fullName?.toLowerCase().includes(term) ||
        q.company?.toLowerCase().includes(term) ||
        q.quoteReference?.toLowerCase().includes(term) ||
        q.city?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // --- LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl border border-slate-800 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mx-auto border border-lime-200">
              <Lock className="w-8 h-8 text-lime-700" />
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl font-black text-lime-600">ROBO</span>
              <span className="text-2xl font-black text-slate-900">LAB</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                CMS ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Espace sécurisé réservé à la direction et à l&apos;équipe commerciale ROBOLAB TECHNOLOGY.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Mot de passe par défaut : <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">robolab2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Accéder au Panneau d&apos;Administration</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
              <Image
                src="/images/robolab-logo.png"
                alt="ROBOLAB"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white">
                  ROBOLAB <span className="text-lime-400">ADMIN</span>
                </span>
                <span className="text-[10px] font-bold bg-lime-500/20 text-lime-400 px-2 py-0.5 rounded-full border border-lime-500/30">
                  En Ligne
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Gestion des Produits, Prix, Photos & Contenus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-lime-400" />
              <span className="hidden sm:inline">Voir le Site Public</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Déconnexion"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quitter</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Flash Success Notification */}
        {saveSuccessMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in duration-200 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">{saveSuccessMessage}</span>
          </div>
        )}

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Package className="w-4 h-4 text-lime-400" />
            <span>Catalogue Produits & Prix</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-lime-500 text-slate-950 font-bold ml-1">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "content"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings className="w-4 h-4 text-lime-400" />
            <span>Textes & Coordonnées du Site</span>
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === "quotes"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileCheck className="w-4 h-4 text-lime-400" />
            <span>Devis & Messages Reçus</span>
            {quotes.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-white font-mono">
                {quotes.length}
              </span>
            )}
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: PRODUCTS & PRICES MANAGEMENT                       */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Rechercher nom, réf, marque..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:outline-none"
                >
                  <option value="all">Toutes les Catégories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={loadProducts}
                  disabled={loadingProducts}
                  className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                  title="Actualiser"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingProducts ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Nouveau Produit</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Affichage de <strong>{filteredProducts.length}</strong> produit(s) sur{" "}
                  <strong>{products.length}</strong>
                </span>
                <span className="text-[11px] text-slate-400">
                  Les modifications sont appliquées instantanément sur le site.
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    <tr>
                      <th className="py-3 px-4">Photo</th>
                      <th className="py-3 px-4">Référence & Marque</th>
                      <th className="py-3 px-4">Nom de l&apos;Équipement</th>
                      <th className="py-3 px-4">Catégorie</th>
                      <th className="py-3 px-4">Prix</th>
                      <th className="py-3 px-4">Disponibilité</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Image */}
                        <td className="py-3 px-4">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            {prod.image ? (
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Ref & Brand */}
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 block">
                            {prod.reference}
                          </span>
                          <span className="inline-block mt-0.5 text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                            {prod.brand}
                          </span>
                        </td>

                        {/* Name */}
                        <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs">
                          <p className="line-clamp-2">{prod.name}</p>
                          {prod.shortDescription && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                              {prod.shortDescription}
                            </p>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-slate-600">
                          <span className="block font-medium">{prod.categoryLabel || prod.category}</span>
                          <span className="text-[10px] text-slate-400">{prod.subcategory}</span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono font-bold text-xs ${
                              prod.price && prod.price !== "Sur devis"
                                ? "text-lime-700 bg-lime-50 border border-lime-200 px-2 py-0.5 rounded-md inline-block"
                                : "text-slate-500"
                            }`}
                          >
                            {prod.price || "Sur devis"}
                          </span>
                        </td>

                        {/* In Stock toggle */}
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleStock(prod)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer border ${
                              prod.inStock
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            }`}
                            title="Cliquer pour changer la disponibilité"
                          >
                            {prod.inStock ? "✓ En Stock" : "⏳ Sur Commande"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Modifier le produit, les textes, le prix et la photo"
                            >
                              <Edit3 className="w-4 h-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => setProductToDelete(prod)}
                              className="p-2 text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                              title="Supprimer définitivement"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                          Aucun produit trouvé dans cette recherche.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SITE CONTENT & COORDINATES SETTINGS                */}
        {/* ========================================================= */}
        {activeTab === "content" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Modifier les Textes & Coordonnées du Site
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ces informations s&apos;affichent sur toutes les pages, l&apos;en-tête, le pied de page et le formulaire de contact.
                </p>
              </div>

              {settingsSaved && (
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Enregistré avec succès !</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* 1. Contact & Réception Devis */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1. Coordonnées Officielles & Contact Client</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Numéro WhatsApp Officiel (format international)
                    </label>
                    <input
                      type="text"
                      value={settings.contactWhatsApp || ""}
                      onChange={(e) => setSettings({ ...settings, contactWhatsApp: e.target.value })}
                      placeholder="212679706224"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                    <span className="text-[10px] text-slate-400">Sans le &quot;+&quot; (ex: 212679706224)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Numéro Téléphone Affiché (WhatsApp / Mobile)
                    </label>
                    <input
                      type="text"
                      value={settings.contactPhone || ""}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      placeholder="+212 6 79 70 62 24"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail Officiel de Réception des Devis
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail || ""}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      placeholder="commercial@robolab-tech.com"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fixe Casablanca
                    </label>
                    <input
                      type="text"
                      value={settings.phoneCasablanca || ""}
                      onChange={(e) => setSettings({ ...settings, phoneCasablanca: e.target.value })}
                      placeholder="+212 (0) 522 35 06 66"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fixe Agadir
                    </label>
                    <input
                      type="text"
                      value={settings.phoneAgadir || ""}
                      onChange={(e) => setSettings({ ...settings, phoneAgadir: e.target.value })}
                      placeholder="+212 (0) 528 29 25 91"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Horaires d&apos;ouverture
                    </label>
                    <input
                      type="text"
                      value={settings.hours || ""}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                      placeholder="Du Lundi au Vendredi : 08h30 – 18h00..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Textes de la Page d'Accueil */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-700 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>2. Textes Clés de la Page d&apos;Accueil</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Titre Principal du Hero
                    </label>
                    <input
                      type="text"
                      value={settings.heroHeadline || ""}
                      onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                      placeholder="Matériel, Consommables & Équipements de"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mot en Vert Mis en Valeur
                    </label>
                    <input
                      type="text"
                      value={settings.heroHighlight || ""}
                      onChange={(e) => setSettings({ ...settings, heroHighlight: e.target.value })}
                      placeholder="Laboratoire"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-bold text-lime-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sous-titre explicatif du Hero
                  </label>
                  <textarea
                    rows={3}
                    value={settings.heroSubheadline || ""}
                    onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chiffre Références (ex: 2 500+)
                    </label>
                    <input
                      type="text"
                      value={settings.statReferences || ""}
                      onChange={(e) => setSettings({ ...settings, statReferences: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Délai de Livraison (ex: 24 / 48h)
                    </label>
                    <input
                      type="text"
                      value={settings.statDelivery || ""}
                      onChange={(e) => setSettings({ ...settings, statDelivery: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Sécurité Admin */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>3. Sécurité & Mot de Passe Admin</span>
                </h4>

                <div className="max-w-xs">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nouveau Mot de Passe Administrateur
                  </label>
                  <input
                    type="text"
                    value={settings.adminPassword || ""}
                    onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
                    placeholder="robolab2026"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">
                    Conservez bien ce mot de passe pour vos prochaines connexions.
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs shadow-md transition-colors"
                >
                  Enregistrer Tous les Paramètres & Textes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: QUOTES & MESSAGES INBOX                            */}
        {/* ========================================================= */}
        {activeTab === "quotes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={quoteSearch}
                    onChange={(e) => setQuoteSearch(e.target.value)}
                    placeholder="Chercher par nom, ville, société..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>

                <button
                  onClick={loadQuotes}
                  disabled={loadingQuotes}
                  className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
                  title="Actualiser"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingQuotes ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Total reçus : <strong>{quotes.length}</strong> demande(s)
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    <tr>
                      <th className="py-3 px-4">Date & Réf</th>
                      <th className="py-3 px-4">Client / Établissement</th>
                      <th className="py-3 px-4">Coordonnées</th>
                      <th className="py-3 px-4">Ville</th>
                      <th className="py-3 px-4">Message / Articles</th>
                      <th className="py-3 px-4 text-right">Action Directe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotes.map((q) => (
                      <tr key={q.id || q.quoteReference} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 block">
                            {q.quoteReference || q.id}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {q.date ? new Date(q.date).toLocaleDateString("fr-FR") : "Récent"}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <strong className="text-slate-900 block">{q.fullName || q.name}</strong>
                          <span className="text-[11px] text-slate-500">{q.company || "Non précisé"}</span>
                        </td>

                        <td className="py-3 px-4 space-y-0.5">
                          <p className="text-slate-700 font-medium">{q.phone}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{q.email}</p>
                        </td>

                        <td className="py-3 px-4 text-slate-700 font-medium">
                          {q.city || "Casablanca"}
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <p className="line-clamp-2 text-slate-600 text-[11px]">
                            {q.message || q.notes || "Demande de devis catalogue"}
                          </p>
                          {q.items && q.items.length > 0 && (
                            <span className="inline-block mt-1 text-[10px] font-bold text-lime-800 bg-lime-50 px-2 py-0.5 rounded border border-lime-200">
                              {q.items.length} article(s) listé(s)
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <a
                            href={`https://wa.me/${(q.phone || "").replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(
                              q.fullName || q.name || "Client"
                            )},%20suite%20à%20votre%20demande%20sur%20ROBOLAB%20TECHNOLOGY...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-[11px] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}

                    {filteredQuotes.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                          Aucune demande de devis enregistrée pour l&apos;instant.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* PRODUCT ADD / EDIT MODAL (Fixed Sticky Header & Footer)   */}
      {/* ========================================================= */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Sticky Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {editingProduct.id ? "Modifier l'Équipement" : "Ajouter un Nouvel Équipement"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Remplissez les informations du produit. Les modifications sont enregistrées en direct.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5 overscroll-contain">
                {/* Row 1: Name & Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom du Produit / Désignation *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="Ex: Viscosimètre Rotatif Numérique Haute Précision"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Référence Catalogue *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.reference || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, reference: e.target.value })
                      }
                      placeholder="Ex: RB-VISCO-DIGI"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono font-bold focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 2: Brand, Category, Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Marque *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.brand || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, brand: e.target.value })
                      }
                      placeholder="Ex: Ohaus, Hanna, Memmert, IKA..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-semibold focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie *</label>
                    <select
                      value={editingProduct.category || "balances"}
                      onChange={(e) => {
                        const cat = categories.find((c) => c.id === e.target.value);
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                          categoryLabel: cat ? cat.name : e.target.value
                        });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prix (MAD HT ou &quot;Sur devis&quot;)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.price || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                      placeholder="Ex: 14 500 DH HT ou Sur devis"
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 font-mono focus:bg-white"
                    />
                  </div>
                </div>

                {/* Row 3: Image Upload & Preview */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Photo de l&apos;Équipement
                    </label>
                    {editingProduct.image && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Photo associée
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Preview */}
                    <div className="relative w-24 h-24 rounded-2xl bg-white border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                      {editingProduct.image ? (
                        <Image
                          src={editingProduct.image}
                          alt="Aperçu"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-slate-300">
                          <ImageIcon className="w-8 h-8 mx-auto" />
                          <span className="text-[9px] text-slate-400 block mt-1">Pas d&apos;image</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-1 space-y-2.5 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5 text-lime-400" />
                          <span>
                            {uploadingImage ? "Téléversement..." : "Choisir une Photo depuis mon PC"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            disabled={uploadingImage}
                            className="hidden"
                          />
                        </label>

                        {editingProduct.image && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                            className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            Supprimer la photo
                          </button>
                        )}
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1">
                          Ou saisir une URL directe d&apos;image :
                        </span>
                        <input
                          type="text"
                          value={editingProduct.image || ""}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, image: e.target.value })
                          }
                          placeholder="https://... ou /uploads/..."
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Stock toggle & Badge */}
                <div className="flex flex-wrap items-center gap-6 p-3 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock ?? true}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 accent-lime-600"
                    />
                    <span>Produit En Stock (Expédition 24/48h)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isPopular ?? false}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isPopular: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-lime-600 focus:ring-lime-500 accent-lime-600"
                    />
                    <span>Mettre en avant sur la page d&apos;accueil (Populaire)</span>
                  </label>
                </div>

                {/* Row 5: Short description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description Courte (Aperçu dans les listes)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.shortDescription || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                    }
                    placeholder="Ex: Mesure directe et continue de la viscosité dynamique en cP / mPa.s avec sonde de température intégrée."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                  />
                </div>

                {/* Row 6: Detailed description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description Détaillée & Conseils d&apos;utilisation
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    placeholder="Détails techniques complets, applications recommandées (peintures, agroalimentaire, cosmétiques, pétrochimie)..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500 focus:bg-white"
                  />
                </div>

                {/* Row 7: Dynamic Specifications */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      Caractéristiques Techniques (Spécifications)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentSpecs = editingProduct.specifications || [];
                        setEditingProduct({
                          ...editingProduct,
                          specifications: [...currentSpecs, { name: "", value: "" }]
                        });
                      }}
                      className="text-[11px] font-bold text-lime-800 bg-lime-50 hover:bg-lime-100 px-3 py-1 rounded-xl border border-lime-200 transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-lime-700" />
                      <span>Ajouter une caractéristique</span>
                    </button>
                  </div>

                  {editingProduct.specifications && editingProduct.specifications.length > 0 ? (
                    <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      {editingProduct.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Ex: Plage de mesure, Précision..."
                            value={spec.name}
                            onChange={(e) => {
                              const updated = [...editingProduct.specifications!];
                              updated[idx].name = e.target.value;
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                          />
                          <input
                            type="text"
                            placeholder="Ex: 10 à 2 000 000 mPa.s, ±1%..."
                            value={spec.value}
                            onChange={(e) => {
                              const updated = [...editingProduct.specifications!];
                              updated[idx].value = e.target.value;
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="w-1/2 text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-lime-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProduct.specifications!.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, specifications: updated });
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Supprimer cette ligne"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">
                      Aucune caractéristique ajoutée. Cliquez sur le bouton ci-dessus pour en ajouter.
                    </p>
                  )}
                </div>
              </div>

              {/* Sticky Modal Footer (ALWAYS VISIBLE!) */}
              <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  * Champs obligatoires
                </span>

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 bg-white border border-slate-300 rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Enregistrer les Modifications</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SOPHISTICATED DELETION CONFIRMATION MODAL                 */}
      {/* ========================================================= */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Header with Red Warning Accent */}
            <div className="p-6 bg-red-50/70 border-b border-red-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200 shadow-xs">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full border border-red-200">
                  Confirmation de Suppression
                </span>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Supprimer ce produit du catalogue ?
                </h3>
                <p className="text-xs text-slate-500">
                  Cette action est irréversible et retirera immédiatement l&apos;article du catalogue public.
                </p>
              </div>
            </div>

            {/* Product Card Preview */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative w-14 h-14 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {productToDelete.image ? (
                    <Image
                      src={productToDelete.image}
                      alt={productToDelete.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <Package className="w-6 h-6 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-slate-500 block">
                    Réf : {productToDelete.reference} • {productToDelete.brand}
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {productToDelete.name}
                  </p>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {productToDelete.categoryLabel || productToDelete.category}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <span className="font-bold text-amber-600 text-sm">⚠️</span>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  Toutes les spécifications, photos et fiches associées à cette référence seront effacées du système.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Conserver le Produit
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Suppression en cours..." : "Oui, Supprimer Définitivement"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
