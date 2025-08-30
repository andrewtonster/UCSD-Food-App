import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn,
    });

    const res = NextResponse.json({ ok: true });

    const isProd = process.env.NODE_ENV === "production";
    const base = [
      `__session=${sessionCookie}`,
      "Path=/",
      "HttpOnly",
      `SameSite=Lax`,
      `Max-Age=${expiresIn / 1000}`,
    ];
    if (isProd) base.push("Secure");

    res.headers.set("Set-Cookie", base.join("; "));
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create session", e },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("__session")?.value;
    if (session) {
      try {
        const decoded = await adminAuth.verifySessionCookie(session, true);
        await adminAuth.revokeRefreshTokens(decoded.sub);
      } catch {}
    }
  } finally {
    const res = NextResponse.json({ ok: true });
    res.headers.set(
      "Set-Cookie",
      [
        "__session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
        process.env.NODE_ENV === "production" ? "Secure" : "",
      ]
        .filter(Boolean)
        .join("; ")
    );
    return res;
  }
}
