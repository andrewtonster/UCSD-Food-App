"use client";

import { useState, useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import SettingsGear from "@/app/components/SettingsGear";
import UserSettings from "@/app/components/UserSettings";
import { changeSettings } from "../actions";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  restaurant: { name: string };
};

export default function ProfileClient({
  userId,
  initialName,
  initialProfileImg, // MUST include leading "/"
  reviews,
}: {
  userId: string;
  initialName: string;
  initialProfileImg: string;
  reviews: Review[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [optimisticUser, applyOptimistic] = useOptimistic(
    { name: initialName, profileImg: initialProfileImg },
    (curr, patch: Partial<{ name: string; profileImg: string }>) => ({
      ...curr,
      ...patch,
    })
  );

  async function handleSave(next: { name: string; profileImg: string }) {
    setIsOpen(false);

    startTransition(() => {
      applyOptimistic(next);
    });

    const fd = new FormData();
    fd.append("name", next.name);
    fd.append("profileImg", next.profileImg);
    fd.append("userId", userId);

    await changeSettings(null, fd);
    router.refresh();
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-[10vh]">
      <div className="flex flex-col items-center gap-4 mb-6 justify-center">
        <SettingsGear
          profileImg={optimisticUser.profileImg}
          onEdit={() => setIsOpen(true)}
          pending={isPending}
        />
        <h1 className="text-2xl font-bold">
          {optimisticUser.name || "Unnamed User"}
        </h1>
      </div>

      <div className="space-y-4 w-full max-w-2xl mx-auto h-[40vh] overflow-y-auto rounded-xl bg-white/50 backdrop-blur-sm p-4">
        {reviews?.length ? (
          reviews.map((r) => (
            <div key={r.id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="font-semibold text-lg">
                {r.restaurant.name} — <span className="text-[#f79f79]">★</span>{" "}
                {r.rating}
              </h3>
              <p className="text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500 font-semibold">NO PREVIOUS REVIEWS</p>
          </div>
        )}
      </div>

      <UserSettings
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialName={optimisticUser.name}
        initialProfileImg={optimisticUser.profileImg} // leading "/"
        onSave={handleSave}
      />
    </div>
  );
}
