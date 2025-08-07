"use client";
import React, { useState } from "react";
import useAuth from "@/app/context/AuthContext";
import Link from "next/link";
const SearchBar = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState("");
  const { user, loading } = useAuth();
  if (!user) {
    return;
  }
  console.log(user);
  return (
    <div className="w-full flex justify-center px-4 my-[3rem]">
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
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
      />

      <Link href={`/profile/${user.uid}`}>Go To Profile</Link>
    </div>
  );
};

export default SearchBar;
