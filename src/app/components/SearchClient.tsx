"use client";
import { useState } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import RestaurantList from "./RestaurantList";

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
  allRestaurants: Restaurant[];
}

export const SearchClient = ({ allRestaurants }: RestaurantListProps) => {
  const [search, setSearch] = useState<string>("");

  const filteredRestaurants = allRestaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <SearchBar setSearch={setSearch} />
      <RestaurantList
        filteredRestaurants={filteredRestaurants}
        search={search}
        allRestaurants={allRestaurants}
      />
    </div>
  );
};
