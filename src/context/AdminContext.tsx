"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { SiteSettings } from "@/lib/dataStore";

interface AdminContextType {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
  // Modal states for direct CRUD on page
  editingProduct: Partial<Product> | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Partial<Product> | null>>;
  productToDelete: Product | null;
  setProductToDelete: React.Dispatch<React.SetStateAction<Product | null>>;
  isTextEditorOpen: boolean;
  setIsTextEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const session = localStorage.getItem("robolab_admin_session");
    setIsAdmin(!!session);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("robolab_admin_session", token);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("robolab_admin_session");
    setIsAdmin(false);
    setEditingProduct(null);
    setProductToDelete(null);
    setIsTextEditorOpen(false);
  };

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        editMode,
        setEditMode,
        login,
        logout,
        editingProduct,
        setEditingProduct,
        productToDelete,
        setProductToDelete,
        isTextEditorOpen,
        setIsTextEditorOpen,
        refreshTrigger,
        triggerRefresh
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
