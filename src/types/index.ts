export interface ProductVariant {
  label: string;
  sku: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string; // e.g. "balances", "mesure", "verrerie", "appareils", "chimie", "mobilier"
  categoryLabel: string;
  subcategory: string;
  reference: string;
  image: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpecification[];
  features: string[];
  inStock: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  applications: string[]; // e.g. "Agroalimentaire", "Pharmaceutique", "Recherche", "Enseignement", "Contrôle Qualité"
  variants?: ProductVariant[];
  dataSheetUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  subcategories: string[];
  itemCount: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface QuoteFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  activitySector: string;
  message: string;
}
