"use client";
import React from "react";
import { Settings } from "lucide-react";
import UserSettings from "./UserSettings";
import { useState } from "react";
import Image from "next/image";
const SettingsGear = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Image
        src="/ramen.webp"
        width={200}
        height={200}
        alt="Profile"
        className="rounded-full ring-4 ring-white cursor-pointer"
      />

      <UserSettings isOpen={isOpen} onClose={() => setIsOpen(false)}>
        test
      </UserSettings>
    </div>
  );
};

export default SettingsGear;
