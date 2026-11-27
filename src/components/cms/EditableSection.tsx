"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useCms } from "@/context/CmsContext";
import { Edit3, Sparkles } from "lucide-react";

interface EditableSectionProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function EditableSection({
  sectionId,
  title,
  children,
  className = ""
}: EditableSectionProps) {
  const { isAdmin, editMode } = useAdmin();
  const { openDrawer, activeDrawerSection } = useCms();
  const [isHovered, setIsHovered] = useState(false);

  // If not admin in edit mode, render cleanly without any markup or indicators
  if (!isAdmin || !editMode) {
    return <div className={className}>{children}</div>;
  }

  const isCurrentlyEditing = activeDrawerSection === sectionId;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-all duration-200 ${className} ${
        isCurrentlyEditing
          ? "ring-2 ring-lime-500 rounded-3xl"
          : isHovered
          ? "ring-1.5 ring-lime-500/70 rounded-3xl"
          : ""
      }`}
    >
      {/* Floating Section Edit Badge on Hover */}
      {(isHovered || isCurrentlyEditing) && (
        <div className="absolute top-3 right-3 z-30 animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDrawer(sectionId);
            }}
            className="px-3.5 py-1.5 bg-slate-950/95 hover:bg-slate-900 text-lime-400 border border-lime-500/60 font-black text-xs rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            title={`Cliquer pour modifier la section "${title}" dans le panneau latéral`}
          >
            <Edit3 className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>Modifier {title}</span>
          </button>
        </div>
      )}

      {children}
    </div>
  );
}
