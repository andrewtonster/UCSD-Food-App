import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const cookie = req.cookies.get("__session")?.value;

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    if (method !== "GET" && method !== "HEAD") {
      return NextResponse.next();
    }
    if (cookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!cookie) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const res = await fetch(new URL("/api/verify", req.url), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ session: cookie }),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const { uid } = await res.json();
  const headers = new Headers(req.headers);
  headers.set("x-uid", uid);
  return NextResponse.next({ request: { headers } });
}
