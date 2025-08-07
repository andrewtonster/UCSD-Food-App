import { prisma } from "@/lib/prisma"; // or wherever your client is
import Image from "next/image";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { adminInit } from "@/lib/firebase";
import { redirect } from "next/navigation";
interface PageProps {
  params: {
    userId: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    <div className="max-w-xl mx-auto p-4">
      {/* Profile Image (future) */}
      <div className="flex items-center gap-4 mb-6">
        {/* Replace with user.profileImg if added */}
        <Image
          src="/ramen.webp"
          width={60}
          height={60}
          alt="Profile"
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold">{user.name ?? "Unnamed User"}</h1>
      </div>

      {/* Reviews */}
      <h1>Past Reviews</h1>
      <div className="space-y-4">
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
