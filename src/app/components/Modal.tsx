"use client";
import { useParams } from "next/navigation";
import React, { startTransition, useActionState, useEffect } from "react";
import { submitReview } from "../actions";
import useAuth from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createAnonymousUser } from "../actions";
import { ReviewDTO } from "@/lib/types";
import { ReviewActionState } from "@/lib/types";
import { nerkoOne } from "../font";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  setReviews: React.Dispatch<React.SetStateAction<ReviewDTO[]>>;
}

export default function Modal({
  isOpen,
  onClose,
  setReviews,
  children,
}: ModalProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  console.log("this is my user", user);
  const { id } = useParams<{ id: string }>();
  const initial: ReviewActionState = { ok: false, message: "", review: null };
  const [state, formAction, isPending] = useActionState<
    ReviewActionState,
    FormData
  >(submitReview, initial);

  const establishSession = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("No guest user after signup");
    const idToken = await user.getIdToken();
    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Auth error" }));
      throw new Error(error || "Failed to create session");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      await establishSession();
      const id = result.user.uid;
      createAnonymousUser(id);
    } catch (err) {
      console.error("Guest login failed:", err);
    }
  };

  useEffect(() => {
    if (!isPending && state.ok && state.review) {
      setReviews((prev) => {
        if (prev.some((r) => r.id === state.review!.id)) return prev;
        return [...prev, state.review!];
      });

      onClose();
    }
  }, [isPending, state.ok, state.review, setReviews, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm mb-0">
      {user ? (
        <div className="bg-[#f2f2f2] p-6 rounded-lg max-w-md w-full shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>

          {children}

          <form action={formAction} className="flex flex-col gap-4 mt-8">
            <input type="hidden" name="restaurantId" value={id} />
            <input type="hidden" name="userId" value={user?.uid || "guest"} />

            <label className="text-sm font-medium text-gray-700">
              Rating
              <select
                name="rating"
                className="mt-1 p-2 border rounded w-full"
                defaultValue="5"
              >
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              Your Review
              <textarea
                name="comment"
                required
                rows={4}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Share your thoughts..."
              />
            </label>

            <button
              disabled={isPending}
              type="submit"
              className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
            >
              {isPending ? "Submitting Review..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b px-6 py-4">
              <h1
                id="auth-modal-title"
                className={`${nerkoOne.className} text-2xl font-semibold`}
              >
                Add a review
              </h1>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="mb-4 text-sm text-gray-600">
                Choose how you’d like to continue:
              </p>

              <div className="grid gap-3">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-lg bg-[#4574ab] px-4 py-2.5 text-white shadow hover:bg-[#365e8c] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Sign in
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Sign up
                </Link>

                <button
                  onClick={handleGuestLogin}
                  className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2.5 text-gray-800 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
