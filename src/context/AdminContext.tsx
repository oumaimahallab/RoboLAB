"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

export type AdminViewMode = "editor" | "client";

interface AdminContextType {
  isAdmin: boolean;
  viewMode: AdminViewMode;
  setViewMode: (mode: AdminViewMode) => void;
  toggleViewMode: () => void;
  // Backward compatibility: editMode is true when isAdmin && viewMode === "editor"
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  login: (token?: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;

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
  const [viewMode, setViewModeState] = useState<AdminViewMode>("editor");
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/auth/me");
      const data = await res.json();
      const authenticated = Boolean(data.authenticated);
      setIsAdmin(authenticated);
      if (!authenticated) {
        localStorage.removeItem("robolab_admin_session");
      }
      return authenticated;
    } catch {
      // Fallback check localStorage
      const session = typeof window !== "undefined" ? localStorage.getItem("robolab_admin_session") : null;
      setIsAdmin(!!session);
      return !!session;
    }
  }, []);

  useEffect(() => {
    // Check saved viewMode
    const savedMode = localStorage.getItem("robolab_admin_view_mode") as AdminViewMode;
    if (savedMode === "client" || savedMode === "editor") {
      setViewModeState(savedMode);
    }
    checkAuth();
  }, [checkAuth]);

  const setViewMode = (mode: AdminViewMode) => {
    setViewModeState(mode);
    localStorage.setItem("robolab_admin_view_mode", mode);
  };

  const toggleViewMode = () => {
    const next = viewMode === "editor" ? "client" : "editor";
    setViewMode(next);
  };

  const setEditMode = (val: boolean) => {
    setViewMode(val ? "editor" : "client");
  };

  const login = (token?: string) => {
    if (token) {
      localStorage.setItem("robolab_admin_session", token);
    }
    setIsAdmin(true);
    setViewMode("editor");
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Erreur logout:", e);
    }
    localStorage.removeItem("robolab_admin_session");
    localStorage.removeItem("robolab_admin_view_mode");
    setIsAdmin(false);
    setViewModeState("editor");
    setEditingProduct(null);
    setProductToDelete(null);
    setIsTextEditorOpen(false);
  };

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const editMode = isAdmin && viewMode === "editor";

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        viewMode,
        setViewMode,
        toggleViewMode,
        editMode,
        setEditMode,
        login,
        logout,
        checkAuth,
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
