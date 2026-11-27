import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthenticatedAdmin } from "@/lib/authServer";

const DATA_DIR = path.join(process.cwd(), "data");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

function readJsonFile(filePath: string): any[] {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Erreur lecture ${filePath}:`, err);
  }
  return [];
}

function writeJsonFile(filePath: string, data: any[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Erreur écriture ${filePath}:`, err);
  }
}

export async function GET() {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const quotes = readJsonFile(QUOTES_FILE);
    const contacts = readJsonFile(CONTACTS_FILE);

    return NextResponse.json({
      success: true,
      quotes,
      contacts
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur lecture des demandes" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID et status requis" },
        { status: 400 }
      );
    }

    const quotes = readJsonFile(QUOTES_FILE);
    const index = quotes.findIndex((q: any) => q.id === id || q.quoteReference === id);
    if (index !== -1) {
      quotes[index].status = status;
      writeJsonFile(QUOTES_FILE, quotes);
      return NextResponse.json({ success: true, item: quotes[index] });
    }

    return NextResponse.json(
      { success: false, error: "Demande non trouvée" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur mise à jour statut" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticatedAdmin())) {
      return NextResponse.json(
        { success: false, error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID manquant" },
        { status: 400 }
      );
    }

    const quotes = readJsonFile(QUOTES_FILE);
    const filteredQuotes = quotes.filter((q: any) => q.id !== id && q.quoteReference !== id);
    writeJsonFile(QUOTES_FILE, filteredQuotes);

    const contacts = readJsonFile(CONTACTS_FILE);
    const filteredContacts = contacts.filter((c: any) => c.id !== id);
    writeJsonFile(CONTACTS_FILE, filteredContacts);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur suppression demande" },
      { status: 500 }
    );
  }
}
