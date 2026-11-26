import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

// Database storage
const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(QUOTES_FILE)) {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function saveContact(record: any) {
  ensureDataFiles();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const list = JSON.parse(raw);
    list.unshift(record);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur sauvegarde contact.json :", err);
  }

  // Also mirror into quotes.json so it shows up on /admin dashboard
  try {
    const rawQ = fs.readFileSync(QUOTES_FILE, "utf-8");
    const listQ = JSON.parse(rawQ);
    listQ.unshift({
      id: record.id,
      quoteReference: record.id,
      fullName: record.name,
      company: record.company || "Particulier",
      phone: record.phone,
      email: record.email,
      city: record.city,
      sector: record.subject,
      notes: record.message,
      items: [],
      totalItems: 0,
      status: "Nouveau (Contact)",
      createdAt: record.createdAt,
      recipientEmail: siteConfig.contact.recipientEmail,
    });
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(listQ, null, 2), "utf-8");
  } catch (err) {
    console.error("Erreur mirroring quotes.json :", err);
  }
}

export async function GET() {
  ensureDataFiles();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, "utf-8");
    return NextResponse.json({ success: true, contacts: JSON.parse(raw) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, city, subject, message } = body;

    const id = `CT-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();

    const contactRecord = {
      id,
      name: name || "Non spécifié",
      company: company || "Non spécifiée",
      email: email || "",
      phone: phone || "",
      city: city || "Casablanca",
      subject: subject || "Demande d'information générale",
      message: message || "",
      createdAt,
      recipientEmail: siteConfig.contact.recipientEmail,
    };

    // 1. Save to database
    saveContact(contactRecord);

    // 2. Dispatch to recipient email (Outlook / FormSubmit relay)
    let emailRelayed = false;
    try {
      const emailEndpoint = `https://formsubmit.co/ajax/${siteConfig.contact.recipientEmail}`;
      const payload = {
        _subject: `[CONTACT ROBOLAB] ${subject || "Nouveau message"} - ${name} (${company || city})`,
        _replyto: email || siteConfig.contact.recipientEmail,
        _template: "table",
        _captcha: "false",
        Reference: id,
        Nom_Prenom: name,
        Societe_Etablissement: company,
        Telephone: phone,
        Email_Client: email,
        Ville: city,
        Objet: subject,
        Message: message,
        Date_Reception: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
      };

      const res = await fetch(emailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://robolab.ma",
          Origin: "https://robolab.ma",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success === "true" || resData.success === true) {
        emailRelayed = true;
      }
      console.log("Contact form relay response:", resData);
    } catch (err) {
      console.error("Erreur relay email contact :", err);
    }

    // 3. Fallback SMTP direct if configured (e.g. Office 365 / Outlook SMTP)
    const smtpHost = process.env.SMTP_HOST || "smtp.office365.com";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"ROBOLAB Contact" <${smtpUser}>`,
          to: siteConfig.contact.recipientEmail,
          replyTo: email,
          subject: `[Contact ROBOLAB #${id}] ${subject} - ${name} (${company})`,
          text: `Nouveau message de contact ROBOLAB\n\nNom : ${name}\nSociété : ${company}\nTél : ${phone}\nEmail : ${email}\nVille : ${city}\nObjet : ${subject}\n\nMessage :\n${message}`,
        });
        emailRelayed = true;
      } catch (smtpErr) {
        console.error("Erreur SMTP direct Outlook :", smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      emailRelayed,
      recipientEmail: siteConfig.contact.recipientEmail,
      message: `Votre message a été transmis vers ${siteConfig.contact.recipientEmail}.`,
    });
  } catch (error: any) {
    console.error("Erreur API /api/contact :", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
