"use client";

import { useState } from "react";
import Image from "next/image";

export default function UserSettings({
  isOpen,
  onClose,
  initialName,
  initialProfileImg, // leading "/"
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialProfileImg: string;
  onSave: (next: { name: string; profileImg: string }) => Promise<void> | void;
}) {
  const [name, setName] = useState(initialName);
  const [chosenImage, setChosenImage] = useState(initialProfileImg);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const options = ["/whale.jpeg", "/fish.jpg", "/ramen.webp", "/crab.webp"]; // all with leading "/"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave({ name, profileImg: chosenImage });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <label className="text-sm font-medium text-gray-700">
            Display Name
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <div className="text-sm font-medium text-gray-700">
            <h2 className="mb-3">Select a profile picture</h2>
            <div className="grid grid-cols-2 gap-4">
              {options.map((src) => {
                const selected = chosenImage === src;
                return (
                  <button
                    type="button"
                    key={src}
                    onClick={() => setChosenImage(src)}
                    className={`rounded-full aspect-square relative overflow-hidden border transition ${
                      selected ? "brightness-50" : "hover:brightness-50"
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
