"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  const handleSignOut = async () => {
    try {
      await Promise.all([
        signOut(auth),
        fetch("/api/session", {
          method: "DELETE",
          credentials: "include",
        }),
      ]);
    } catch (e) {
      console.error("Sign out error:", e);

      try {
        await fetch("/api/session", {
          method: "DELETE",
          credentials: "include",
        });
      } catch {}
    } finally {
      router.push("/");
      router.refresh();
    }
  };

  if (!ready || !user) return null;

  return (
    <div
      className="
        fixed
        top-auto bottom-6 left-1/2 -translate-x-1/2
        md:top-10 md:right-10 md:left-auto md:translate-x-0
        z-50
      "
    >
      <button
        onClick={handleSignOut}
        className="bg-[#9e9ca5] text-white px-4 py-2 rounded-2xl hover:bg-[#d3d4db] cursor-pointer"
      >
        {user.isAnonymous ? "Sign out as guest" : "Sign Out"}
      </button>
    </div>
  );
}
