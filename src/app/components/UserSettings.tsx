"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useAuth from "@/app/context/AuthContext";
import Image from "next/image";
import { changeSettings } from "../actions";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function UserSettings({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useParams<{ userId: string }>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = "";

    try {
      if (image) {
        // Get ImageKit auth params from your API
        const authRes = await fetch("/api/imagekit-auth");
        const auth = await authRes.json();

        const formData = new FormData();
        formData.append("file", image);
        formData.append("fileName", image.name);
        formData.append("publicKey", auth.publicKey);
        formData.append("signature", auth.signature);
        formData.append("expire", auth.expire);
        formData.append("token", auth.token);

        const uploadRes = await axios.post(
          "https://upload.imagekit.io/api/v1/files/upload",
          formData
        );

        imageUrl = uploadRes.data.url; // final image URL from ImageKit
      }

      // Send form data to server action
      const settingsForm = new FormData();
      settingsForm.append("name", name);
      settingsForm.append("profileImg", imageUrl);
      settingsForm.append("userId", userId);

      await changeSettings(null, settingsForm);
      onClose(); // close modal on success
    } catch (err) {
      console.error("Error submitting settings:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        {children}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <label className="text-sm font-medium text-gray-700">
            Display Name
            <input
              name="name"
              value={name}
              onChange={handleNameChange}
              className="border p-2 rounded w-full"
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Profile Picture
            <div className="relative w-32 h-32 rounded-full overflow-hidden group cursor-pointer mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-upload"
              />
              <label htmlFor="profile-upload" className="block w-full h-full">
                <Image
                  src={preview || "/default-avatar.png"}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center text-white transition duration-200">
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    Change
                  </span>
                </div>
              </label>
            </div>
          </label>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
