"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { Edit3, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";

export default function AdminProductEditPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          const found = data.products.find((p: Product) => p.id === id || p.slug === id);
          if (found) {
            setProduct(found);
          } else {
            setError(`Produit introuvable avec l'identifiant : ${id}`);
          }
        }
      })
      .catch((err) => {
        setError("Erreur chargement des données produit.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 gap-3 text-xs">
        <RefreshCw className="w-5 h-5 animate-spin text-lime-400" />
        <span>Chargement de la fiche produit...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error || "Produit introuvable"}</span>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-lime-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des produits</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
          <Edit3 className="w-6 h-6 text-lime-400" />
          <span>Modifier l&apos;Équipement : {product.name}</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Référence : <span className="font-mono text-lime-400 font-bold">{product.reference}</span> • Marque : {product.brand}
        </p>
      </div>

      <ProductForm initialProduct={product} isEdit={true} />
    </div>
  );
}
