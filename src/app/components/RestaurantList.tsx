import React from "react";
import RestaurantCard from "./RestaurantCard";

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
          ].map(
            (section) =>
              grouped[section]?.length > 0 && (
                <section key={section}>
                  <h2 className="text-3xl font-bold mb-2">{section}</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {grouped[section].map((restaurant, idx) => (
                      <RestaurantCard
                        key={idx}
                        indexKey={idx}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantList;
