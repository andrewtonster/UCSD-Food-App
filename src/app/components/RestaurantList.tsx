import React from "react";
import RestaurantCard from "./RestaurantCard";
import { Nerko_One } from "next/font/google";
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

const nerkoOne = Nerko_One({
  subsets: ["latin"],
  weight: ["400"], // Choose the weight you want
});

interface RestaurantListProps {
  filteredRestaurants: Restaurant[];
  search: string;
  allRestaurants: Restaurant[];
}

const RestaurantList = ({
  filteredRestaurants,
  search,
  allRestaurants,
}: RestaurantListProps) => {
  const isSearching = search !== "";

  const grouped = allRestaurants.reduce((acc, restaurant) => {
    const section = restaurant.campusSection || "Other";
    acc[section] = acc[section] || [];
    acc[section].push(restaurant);
    return acc;
  }, {} as Record<string, Restaurant[]>);

  return (
    <>
      {isSearching ? (
        <div className="flex flex-wrap justify-center gap-5">
          {filteredRestaurants.map((restaurant, idx) => {
            return (
              <RestaurantCard
                key={idx}
                indexKey={idx}
                restaurant={restaurant}
                large={false}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-4 space-y-8">
          {[
            "East Side",
            "West Side",
            "Downtown",
            "North Campus",
            "South Campus",
          ].map((section, group) => {
            if (!grouped[section]?.length) return null;

            return (
              <section key={section}>
                <h2
                  className={`${nerkoOne.className} text-5xl font-boldß mb-2`}
                >
                  {section}ß
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {grouped[section].map((restaurant, idx) => (
                    <RestaurantCard
                      key={idx}
                      indexKey={idx}
                      restaurant={restaurant}
                      large={group == 2}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RestaurantList;
