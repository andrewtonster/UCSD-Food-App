import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    if (!session || typeof session !== "string") {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return NextResponse.json({ uid: decoded.uid });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
