import type { Metadata } from "next";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <QuoteDrawer />
          <WhatsAppButton />
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
