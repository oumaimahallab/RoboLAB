"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminTopBar from "@/components/AdminTopBar";
import AdminVisualModals from "@/components/AdminVisualModals";
import AdminClientModePill from "@/components/AdminClientModePill";
import VisualCmsDrawer from "@/components/cms/VisualCmsDrawer";

export default function PublicSiteWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminSection = pathname?.startsWith("/admin");

  if (isAdminSection) {
    // In dedicated admin back-office, public layout (Header, Footer, Drawers) is omitted
    return <>{children}</>;
  }

  // Public visitor layout + Admin visual overlays when authenticated
  return (
    <>
      <AdminTopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <QuoteDrawer />
      <WhatsAppButton />
      <Footer />
      <AdminVisualModals />
      <AdminClientModePill />
      <VisualCmsDrawer />
    </>
  );
}
