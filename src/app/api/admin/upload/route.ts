import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Nettoyer le nom de fichier pour éviter les conflits et caractères spéciaux
    const extension = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, extension)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);
    const fileName = `${baseName}-${Date.now()}${extension}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName
    });
  } catch (error) {
    console.error("Erreur upload photo:", error);
    return NextResponse.json(
      { success: false, error: "Échec de l'enregistrement de l'image." },
      { status: 500 }
    );
  }
}
