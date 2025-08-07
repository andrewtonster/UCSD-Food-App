import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { SearchClient } from "./components/SearchClient";

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <div>
      <SearchClient allRestaurants={restaurants} />
    </div>
  );
}
