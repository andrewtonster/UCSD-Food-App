import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import ProfileClient from "@/app/components/ProfileClient";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

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

  if (uid !== userId) redirect("/403");

  const user = await prisma.user.findUnique({
    where: { id: uid },
    include: { userReviews: { include: { restaurant: true } } },
  });

  if (!user) return <div>User not found</div>;

  const img = user.profileImg ? `${user.profileImg}` : "fish.jpg";

  return (
    <ProfileClient
      userId={uid}
      initialName={user.name ?? ""}
      initialProfileImg={img}
      reviews={user.userReviews}
    />
  );
}
