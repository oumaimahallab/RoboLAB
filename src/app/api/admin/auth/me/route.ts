import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/authServer";

export async function GET() {
  const authenticated = await isAuthenticatedAdmin();
  return NextResponse.json({
    authenticated,
    role: authenticated ? "admin" : "guest"
  });
}
