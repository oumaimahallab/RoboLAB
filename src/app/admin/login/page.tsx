"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (data.success) {
        login(data.token);
        // Redirection directe vers le site public en mode édition visuelle (comme demandé)
        router.push("/");
      } else {
        setError(data.error || "Mot de passe administrateur incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 mx-auto">
            <Image
              src="/images/robolab-logo.png"
              alt="ROBOLAB TECHNOLOGY"
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl font-black text-lime-400">ROBO</span>
              <span className="text-2xl font-black text-white">LAB</span>
              <span className="text-[10px] font-bold bg-lime-500/20 text-lime-400 px-2 py-0.5 rounded-full border border-lime-500/30 uppercase tracking-widest ml-1">
                BACK-OFFICE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Portail sécurisé d&apos;administration des équipements, devis et contenus.
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe admin"
                className="w-full text-xs p-3 pr-10 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Mot de passe par défaut : <code className="bg-slate-800 text-lime-400 px-1 py-0.5 rounded font-mono">robolab2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-lime-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Authentification en cours...</span>
              </span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Connexion au Back-Office</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            ← Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
