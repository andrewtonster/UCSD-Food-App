"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

type SettingsGearProps = {
  /** EXPECTS a leading slash ("/fish.jpg"). Fallback handled here. */
  profileImg: string | null;
  onEdit: () => void;
  pending?: boolean;
};

export default function SettingsGear({
  profileImg,
  onEdit,
  pending = false,
}: SettingsGearProps) {
  const src = profileImg ?? "/ramen.webp"; // DO NOT prepend another '/'

  console.log("this is my profile img", profileImg);

  return (
    <button
      type="button"
      className="relative size-[200px] rounded-full overflow-hidden ring-4 ring-white group inline-block"
      onClick={onEdit}
      aria-label="Edit profile image"
      disabled={pending}
    >
      <Image
        key={src}
        src={src}
        alt="Profile"
        fill
        sizes="200px"
        className="object-cover transition duration-300 group-hover:brightness-75"
      />
      {pending && <div className="absolute inset-0 bg-black/20" />}
      <Pencil className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300" />
    </button>
  );
}
