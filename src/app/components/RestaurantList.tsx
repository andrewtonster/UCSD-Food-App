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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-[90%] mr-auto ml-auto">
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
        <div className="w-[90%] mx-auto space-y-8">
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
                  <h2 className="text-xl font-bold mb-2">{section}</h2>
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
