import { prisma } from "@/lib/prisma"; // or wherever your client is

import { getAuth } from "firebase-admin/auth";
import { adminInit } from "@/lib/firebase";
import SettingsGear from "@/app/components/SettingsGear";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies, headers } from "next/headers";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("__session")?.value;
  if (!token) redirect("/login");

  let uid: string;
  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    uid = decoded.uid;
  } catch {
    redirect("/login");
  }

  // Enforce “only me”
  if (uid !== params.userId) redirect("/403");

  const user = await prisma.user.findUnique({
    where: { id: uid },
    include: {
      userReviews: {
        include: {
          restaurant: true, // if you want to show what restaurant the review is for
        },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-[10vh]">
      {/* Profile Image (future) */}

      <div className="flex flex-col items-center gap-4 mb-6 justify-center">
        <SettingsGear />
        <h1 className="text-2xl font-bold">{user.name ?? "Unnamed User"}</h1>
      </div>

      {/* Reviews */}

      <div className="space-y-4 w-full max-w-2xl mx-auto h-[40vh] overflow-y-auto rounded-xl bg-white/50 backdrop-blur-sm p-4">
        {user.userReviews.map((review) => (
          <div
            key={review.id}
            className="border p-4 rounded-lg shadow bg-white"
          >
            <h3 className="font-semibold text-lg">
              {review.restaurant.name} — ★ {review.rating}
            </h3>
            <p className="text-gray-600 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
