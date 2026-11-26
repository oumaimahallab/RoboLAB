import fs from "fs";
import path from "path";
import { Product, Category } from "@/types";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { siteConfig } from "@/config/site";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getStoredProducts(): Product[] {
  ensureDirectoryExists();
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const content = fs.readFileSync(PRODUCTS_FILE, "utf-8");
      return JSON.parse(content) as Product[];
    }
  } catch (error) {
    console.error("Erreur lecture data/products.json :", error);
  }

  // Initialisation à partir des données par défaut
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(PRODUCTS, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur écriture initiale data/products.json :", err);
  }
  return PRODUCTS;
}

export function saveStoredProducts(products: Product[]): boolean {
  ensureDirectoryExists();
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Erreur sauvegarde data/products.json :", error);
    return false;
  }
}

export function addOrUpdateProduct(product: Partial<Product>): Product {
  const products = getStoredProducts();
  const now = Date.now();

  if (product.id) {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updated: Product = {
        ...products[index],
        ...product,
        // s'assurer que les tableaux existent
        specifications: product.specifications || products[index].specifications || [],
        features: product.features || products[index].features || [],
        applications: product.applications || products[index].applications || []
      } as Product;
      products[index] = updated;
      saveStoredProducts(products);
      return updated;
    }
  }

  // Nouveau produit
  const newId = product.id || `prod_${now}`;
  const slug =
    product.slug ||
    (product.name || `produit-${now}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const newProduct: Product = {
    id: newId,
    name: product.name || "Nouveau Produit",
    slug,
    brand: product.brand || "Marque Partenaire",
    category: product.category || "appareils",
    categoryLabel: product.categoryLabel || "Équipements & Appareils",
    subcategory: product.subcategory || "Général",
    reference: product.reference || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
    image: product.image || "/images/placeholder-lab.jpg",
    shortDescription: product.shortDescription || "",
    description: product.description || "",
    price: product.price || "Sur devis",
    inStock: product.inStock !== undefined ? product.inStock : true,
    isPopular: product.isPopular || false,
    isNew: product.isNew !== undefined ? product.isNew : true,
    specifications: product.specifications || [],
    features: product.features || [],
    applications: product.applications || ["Contrôle Qualité", "Recherche"]
  };

  products.unshift(newProduct);
  saveStoredProducts(products);
  return newProduct;
}

export function deleteStoredProduct(id: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length !== products.length) {
    return saveStoredProducts(filtered);
  }
  return false;
}

export function getStoredCategories(): Category[] {
  ensureDirectoryExists();
  try {
    if (fs.existsSync(CATEGORIES_FILE)) {
      const content = fs.readFileSync(CATEGORIES_FILE, "utf-8");
      return JSON.parse(content) as Category[];
    }
  } catch (error) {
    console.error("Erreur lecture categories.json :", error);
  }

  try {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(CATEGORIES, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur initialisation categories.json :", err);
  }
  return CATEGORIES;
}

export interface SiteSettings {
  contactPhone: string;
  contactMobile: string;
  contactWhatsApp: string;
  contactEmail: string;
  phoneCasablanca: string;
  phoneAgadir: string;
  hours: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  statReferences: string;
  statDelivery: string;
  adminPassword?: string;
}

export function getStoredSiteSettings(): SiteSettings {
  ensureDirectoryExists();
  const defaults: SiteSettings = {
    contactPhone: siteConfig.contact.phoneDisplay,
    contactMobile: siteConfig.contact.mobile,
    contactWhatsApp: siteConfig.contact.whatsapp,
    contactEmail: siteConfig.contact.recipientEmail,
    phoneCasablanca: siteConfig.contact.phoneCasablanca,
    phoneAgadir: siteConfig.contact.phoneAgadir,
    hours: siteConfig.hours,
    heroHeadline: "Matériel, Consommables & Équipements de",
    heroHighlight: "Laboratoire",
    heroSubheadline:
      "Distribution d'instruments scientifiques de haute précision, balances d'analyse, verrerie technique, réactifs et consommables. Devis officiel sous 24h ouvrées et livraison partout au Maroc.",
    statReferences: "2 500+",
    statDelivery: "24 / 48h",
    adminPassword: "admin"
  };

  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const content = fs.readFileSync(CONTENT_FILE, "utf-8");
      return { ...defaults, ...JSON.parse(content) };
    }
  } catch (error) {
    console.error("Erreur lecture site-content.json :", error);
  }

  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaults, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur initialisation site-content.json :", err);
  }
  return defaults;
}

export function saveStoredSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  ensureDirectoryExists();
  const current = getStoredSiteSettings();
  const updated = { ...current, ...settings };
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (error) {
    console.error("Erreur sauvegarde site-content.json :", error);
  }
  return updated;
}
