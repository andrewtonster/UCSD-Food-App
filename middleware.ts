// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export const config = { matcher: ["/profile/:path*"] };

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("__session")?.value;
  if (!cookie) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    const headers = new Headers(req.headers);
    headers.set("x-uid", decoded.uid);
    return NextResponse.next({ request: { headers } });
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
