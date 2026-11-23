import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

// Quotes database file path
const DATA_DIR = path.join(process.cwd(), "data");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(QUOTES_FILE)) {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function getStoredQuotes() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(QUOTES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveQuote(quote: any) {
  ensureDataFile();
  const quotes = getStoredQuotes();
  quotes.unshift(quote);
  fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2), "utf-8");
}

export async function GET() {
  try {
    const quotes = getStoredQuotes();
    return NextResponse.json({ success: true, quotes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      company,
      phone,
      email,
      city,
      sector,
      notes,
      items,
      quoteReference,
    } = body;

    const ref = quoteReference || `RB-DEV-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();

    const quoteRecord = {
      id: ref,
      quoteReference: ref,
      fullName: fullName || "Non spécifié",
      company: company || "Particulier",
      phone: phone || "",
      email: email || "",
      city: city || "Non précisée",
      sector: sector || "Général",
      notes: notes || "",
      items: items || [],
      totalItems: (items || []).reduce((acc: number, it: any) => acc + (it.quantity || 1), 0),
      status: "Nouveau",
      createdAt,
      recipientEmail: siteConfig.contact.recipientEmail,
    };

    // 1. Save to database / JSON file
    saveQuote(quoteRecord);

    // 2. Format Items text list
    const itemsFormattedText = (items || [])
      .map(
        (it: any, index: number) =>
          `${index + 1}. ${it.product?.name || "Équipement"} (Réf: ${it.product?.reference || "N/A"} - Marque: ${it.product?.brand || "ROBOLAB"}) ${it.selectedVariant ? `[Option: ${it.selectedVariant}]` : ""} => Quantité: ${it.quantity}`
      )
      .join("\n");

    // 3. DIRECT INBOX DELIVERY via FormSubmit to hallaboumaima@gmail.com
    let directDeliverySuccess = false;
    try {
      const emailEndpoint = `https://formsubmit.co/ajax/${siteConfig.contact.recipientEmail}`;
      const payload = {
        _subject: `[DEVIS ROBOLAB #${ref}] ${company || "Client"} - ${city || "Maroc"}`,
        _replyto: email || siteConfig.contact.recipientEmail,
        _template: "table",
        _captcha: "false",
        Reference_Dossier: ref,
        Nom_Prenom_Client: fullName,
        Societe_Laboratoire: company,
        Telephone: phone,
        Email_Client: email,
        Ville_Livraison: city,
        Secteur_Activite: sector,
        Materiel_et_Quantites: itemsFormattedText || "Demande de catalogue général",
        Commentaires_Delais: notes || "Aucun commentaire spécifique",
        Date_Reception: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
      };

      const res = await fetch(emailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Referer": "https://robolab.ma",
          "Origin": "https://robolab.ma",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success === "true" || resData.success === true) {
        directDeliverySuccess = true;
      }
      console.log("FormSubmit Delivery Status:", resData);
    } catch (deliveryError) {
      console.error("Erreur d'envoi direct par FormSubmit :", deliveryError);
    }

    // 4. Fallback SMTP if configured in .env.local
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"ROBOLAB Devis" <${smtpUser}>`,
          to: siteConfig.contact.recipientEmail,
          replyTo: email,
          subject: `[Devis N° ${ref}] ${company} (${city}) - ROBOLAB`,
          text: `Nouveau devis ROBOLAB N° ${ref}\n\nClient : ${fullName}\nSociété : ${company}\nTél : ${phone}\nEmail : ${email}\nVille : ${city}\n\nArticles :\n${itemsFormattedText}\n\nNotes : ${notes}`,
        });
      } catch (err: any) {
        console.error("Erreur SMTP :", err);
      }
    }

    return NextResponse.json({
      success: true,
      quoteReference: ref,
      directDeliverySuccess,
      recipientEmail: siteConfig.contact.recipientEmail,
      message: `Votre devis a bien été transmis vers ${siteConfig.contact.recipientEmail}.`,
    });
  } catch (error: any) {
    console.error("Erreur API devis :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
