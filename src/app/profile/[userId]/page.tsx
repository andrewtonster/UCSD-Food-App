import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import ProfileClient from "@/app/components/ProfileClient";

interface PageProps {
  params: { userId: string };
}

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = params;

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

  // Client always gets a leading slash; DB stores without slash.
  const img = user.profileImg ? `${user.profileImg}` : "ramen.webp";
  console.log("this is the img", img);

  return (
    <ProfileClient
      userId={uid}
      initialName={user.name ?? ""}
      initialProfileImg={img}
      reviews={user.userReviews}
    />
  );
}
