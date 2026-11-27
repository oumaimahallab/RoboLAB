"use client";

import React from "react";
import ProductForm from "@/components/admin/ProductForm";
import { PlusCircle } from "lucide-react";

export default function AdminProductCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
          <PlusCircle className="w-6 h-6 text-lime-400" />
          <span>Ajouter un Nouvel Équipement</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complétez la fiche technique pour publier ce produit immédiatement sur le catalogue ROBOLAB.
        </p>
      </div>

      <ProductForm isEdit={false} />
    </div>
  );
}
