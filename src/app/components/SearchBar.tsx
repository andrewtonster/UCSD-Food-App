"use client";
import React, { useState } from "react";
import useAuth from "@/app/context/AuthContext";
import Link from "next/link";
import { CircleUser } from "lucide-react";
const SearchBar = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState("");
  const { user, loading } = useAuth();

  console.log(user);
  return (
    <div className="w-full flex justify-center px-4 my-[3rem] h-20">
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search restaurants"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearch(e.target.value);
        }}
        className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
      />

      {user && !user.isAnonymous && (
        <Link href={`/profile/${user?.uid}`}>
          <div className="relative w-20 h-20 group">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full transition ease-in duration-1000"
            >
              <path
                fill="#9e9ca5"
                className="group-hover:fill-[#d3d4db]"
                d="M53.6,-60.4C69.8,-50.3,83.4,-33.7,87.6,-14.7C91.7,4.2,86.5,25.5,74.7,40.4C62.8,55.3,44.5,63.6,26.2,69C7.9,74.4,-10.4,76.7,-27.4,72C-44.4,67.2,-60.1,55.5,-68.9,39.9C-77.7,24.4,-79.6,5,-76.3,-13.5C-73.1,-31.9,-64.7,-49.5,-51.1,-60C-37.5,-70.5,-18.7,-74,0,-74C18.7,-74,37.4,-70.5,53.6,-60.4Z"
                transform="translate(100 100)"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <CircleUser className="w-10 h-10 text-gray-700" />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
