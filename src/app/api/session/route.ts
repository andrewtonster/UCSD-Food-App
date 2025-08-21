import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    console.log("passed sign in");

    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expiresIn,
    });

    console.log("passed session cookie");
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
    return res; // <--- RETURN THIS
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to create session", e },
      { status: 401 }
    );
  }
}
