import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
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
  large: boolean;
}

const RestaurantCard = ({
  restaurant,
  indexKey,
  large,
}: RestaurantCardProps) => {
  // true if text in searchbar false otherwise

  return (
    <>
      {large ? (
        <Link href={`/restaurant/${restaurant.id}`}>
          <article
            className="
            w-[20rem] sm:w-[22rem] md:w-[24rem] lg:w-[26rem] xl:w-[28rem]
            flex-shrink-0
            bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer
          "
          >
            <figure className="relative w-full h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[18rem]">
              <Image
                src="/ramen.webp"
                alt={`Image of ${restaurant.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </figure>
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <span className="text-sm font-medium flex items-center gap-1">
                {restaurant.ratingScore.toFixed(1)}{" "}
                <Star fill="#ffad72" className="inline" />
              </span>
            </div>
          </article>
        </Link>
      ) : (
        <Link href={`/restaurant/${restaurant.id}`}>
          <article
            className="
            w-[16rem] sm:w-[18rem] md:w-[20rem] lg:w-[22rem] xl:w-[24rem]
            flex-shrink-0
            bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer
          "
          >
            <figure className="relative w-full h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[14rem] xl:h-[16rem]">
              <Image
                src="/ramen.webp"
                alt={`Image of ${restaurant.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </figure>
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-base md:text-lg font-semibold">
                {restaurant.name}
              </h2>
              <span className="text-sm md:text-base font-medium flex items-center gap-1">
                {restaurant.ratingScore.toFixed(1)}{" "}
                <Star fill="#ffad72" className="inline" />
              </span>
            </div>
          </article>
        </Link>
      )}
    </>
  );
};

export default RestaurantCard;
