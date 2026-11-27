"use client";

import React, { useState } from "react";
import {
  Settings,
  Lock,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Download,
  Info
} from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 5) {
      setError("Le nouveau mot de passe doit comporter au moins 5 caractères.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Mot de passe administrateur modifié avec succès !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "Erreur lors du changement de mot de passe.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-lime-400" />
          <span>Paramètres & Sécurité de l&apos;Administration</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Gérez les identifiants d&apos;accès, les clés de sécurité et l&apos;intégrité de la base de données.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
          <div className="p-2.5 bg-lime-500/10 text-lime-400 rounded-xl border border-lime-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Modifier le Mot de Passe Administrateur
            </h2>
            <p className="text-xs text-slate-400">
              Ce mot de passe protège l&apos;accès à l&apos;espace /admin et au mode édition visuelle.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-500/15 border border-red-500/30 text-red-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Mot de passe actuel
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Entrez votre mot de passe actuel"
              className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Au moins 5 caractères"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Répétez le mot de passe"
                className="w-full text-xs p-3 bg-slate-900 border border-slate-750 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Key className="w-4 h-4" />
            <span>{loading ? "Mise à jour..." : "Enregistrer le Nouveau Mot de Passe"}</span>
          </button>
        </form>
      </div>

      {/* System Information Card */}
      <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Informations Système & Sécurité</h2>
            <p className="text-xs text-slate-400">Architecture ROBOLAB Back-Office</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex justify-between">
            <span className="text-slate-400">Protection Serveur :</span>
            <span className="font-mono text-emerald-400 font-bold">Actif (Next.js Middleware + HMAC)</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex justify-between">
            <span className="text-slate-400">Session Cookie :</span>
            <span className="font-mono text-slate-200">HttpOnly, Lax, Path: /</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex justify-between">
            <span className="text-slate-400">Stockage Données :</span>
            <span className="font-mono text-slate-200">data/products.json, data/quotes.json</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 flex justify-between">
            <span className="text-slate-400">Dossier Photos :</span>
            <span className="font-mono text-slate-200">public/uploads/</span>
          </div>
        </div>
      </div>
    </div>
  );
}
