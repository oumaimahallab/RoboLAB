"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CmsContent, DEFAULT_CMS_CONTENT } from "@/types/cms";
import { useAdmin } from "./AdminContext";

interface CmsContextType {
  content: CmsContent;
  loading: boolean;
  activeDrawerSection: string | null;
  openDrawer: (sectionId: string) => void;
  closeDrawer: () => void;
  updateSection: (sectionKey: keyof CmsContent, data: any) => Promise<boolean>;
  publishChanges: () => Promise<boolean>;
  isPublishing: boolean;
  hasUnpublishedChanges: boolean;
  refreshContent: () => Promise<void>;
  statusMessage: string;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin, editMode } = useAdmin();
  const [content, setContent] = useState<CmsContent>(DEFAULT_CMS_CONTENT);
  const [loading, setLoading] = useState(true);
  const [activeDrawerSection, setActiveDrawerSection] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const mode = isAdmin && editMode ? "draft" : "published";
      const res = await fetch(`/api/cms?mode=${mode}`);
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
        setHasUnpublishedChanges(Boolean(data.content.hasUnpublishedChanges));
      }
    } catch (err) {
      console.error("Erreur chargement CMS :", err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin, editMode]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const openDrawer = (sectionId: string) => {
    if (!isAdmin || !editMode) return;
    setActiveDrawerSection(sectionId);
  };

  const closeDrawer = () => {
    setActiveDrawerSection(null);
  };

  const updateSection = async (sectionKey: keyof CmsContent, data: any): Promise<boolean> => {
    const updatedContent = {
      ...content,
      [sectionKey]: data,
      hasUnpublishedChanges: true
    };
    setContent(updatedContent);
    setHasUnpublishedChanges(true);

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [sectionKey]: data })
      });
      const resData = await res.json();
      if (resData.success) {
        flashStatus("Brouillon sauvegardé automatiquement");
        return true;
      }
      return false;
    } catch {
      flashStatus("Erreur sauvegarde brouillon");
      return false;
    }
  };

  const publishChanges = async (): Promise<boolean> => {
    setIsPublishing(true);
    try {
      const res = await fetch("/api/cms/publish", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setHasUnpublishedChanges(false);
        setContent(data.content);
        flashStatus("✓ Modifié et Publié en direct sur le site !");
        return true;
      }
      return false;
    } catch {
      flashStatus("Erreur lors de la publication");
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  const flashStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        loading,
        activeDrawerSection,
        openDrawer,
        closeDrawer,
        updateSection,
        publishChanges,
        isPublishing,
        hasUnpublishedChanges,
        refreshContent: fetchContent,
        statusMessage
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
}
