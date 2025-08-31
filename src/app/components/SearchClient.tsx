"use client";
import { useState } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import RestaurantList from "./RestaurantList";
import { Knewave } from "next/font/google";

const knewave = Knewave({
  subsets: ["latin"],
  weight: ["400"], // Choose the weight you want
});

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
      <h1
        className={`${knewave.className} text-center text-6xl pt-10 text-[#426da7]`}
      >
        UCSD Harbor
      </h1>
      <SearchBar setSearch={setSearch} />
      <RestaurantList
        filteredRestaurants={filteredRestaurants}
        search={search}
        allRestaurants={allRestaurants}
      />
    </div>
  );
};
