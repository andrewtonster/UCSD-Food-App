import React from "react";
import Image from "next/image";
import Link from "next/link";
interface Restaurant {
  name: string;
  id: string;
  ratingScore: number;
  numRatings: number;
  coordinates: string;
  campusSection: string;
  imageUrl: string | null;
  open: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  indexKey: number;
}

const RestaurantCard = ({ restaurant, indexKey }: RestaurantCardProps) => {
  // true if text in searchbar false otherwise

  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <article className="bg-white text-black rounded-2xl overflow-hidden shadow-md transition hover:shadow-lg cursor-pointer">
        <figure className="relative w-full h-48">
          <Image
            src={"/ramen.webp"}
            alt={`Image of ${restaurant.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        </figure>
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <span className="text-sm font-medium">
            {restaurant.ratingScore.toFixed(1)} ⭐
          </span>
        </div>
      </article>
    </Link>
  );
};

export default RestaurantCard;
