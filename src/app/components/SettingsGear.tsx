"use client";
import React from "react";
import { Settings } from "lucide-react";
import UserSettings from "./UserSettings";
import { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
const SettingsGear = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="relative group inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/ramen.webp"
          width={200}
          height={200}
          alt="Profile"
          className="rounded-full ring-4 ring-white cursor-pointer transition duration-300 group-hover:brightness-75"
        />

        <Pencil className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
      </div>

      <UserSettings isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default SettingsGear;
