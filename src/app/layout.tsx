import type { Metadata } from "next";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { AdminProvider } from "@/context/AdminContext";
import { CmsProvider } from "@/context/CmsContext";
import PublicSiteWrapper from "@/components/PublicSiteWrapper";

export const metadata: Metadata = {
  title: "ROBOLAB Maroc | Équipements de Laboratoire, Métrologie & Solutions Scientifiques",
  description:
    "Leader au Maroc dans l'importation et la distribution d'équipements de laboratoire, balances de précision, instruments de mesure, verrerie scientifique, produits chimiques et aménagement clé en main.",
  keywords: [
    "matériel de laboratoire maroc",
    "équipements scientifiques casablanca",
    "balances analytiques agadir",
    "verrerie de laboratoire maroc",
    "réactifs chimiques maroc",
    "étalonnage métrologique",
    "hotte aspirante laboratoire",
    "robolab maroc"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#EEF2F6] text-slate-800 font-sans">
        <AdminProvider>
          <CmsProvider>
            <QuoteProvider>
              <PublicSiteWrapper>{children}</PublicSiteWrapper>
            </QuoteProvider>
          </CmsProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
