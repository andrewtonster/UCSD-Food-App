"use client";
import { useParams } from "next/navigation";
import React, { useActionState } from "react";
import { submitReview } from "../actions";
import useAuth from "@/app/context/AuthContext";
import Link from "next/link";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createAnonymousUser } from "../actions";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { user, loading } = useAuth();
  console.log("this is my user", user);
  const { id } = useParams<{ id: string }>();
  const [state, formAction, isPending] = useActionState(submitReview, {
    message: "review",
  });

  const handleGuestLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      const id = result.user.uid;
      createAnonymousUser(id);
    } catch (err) {
      console.error("Guest login failed:", err);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
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
        <div>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
          <button
            onClick={handleGuestLogin}
            className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Continue as Guest
          </button>
        </div>
      )}
    </div>
  );
}
