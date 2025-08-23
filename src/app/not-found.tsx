// app/not-found.tsx
import Link from "next/link";
import { Knewave } from "next/font/google";

const knewave = Knewave({
  subsets: ["latin"],
  weight: ["400"], // Choose the weight you want
});

export default function NotFound() {
  return (
    <div className="h-full w-full">
      <h1
        className={`${knewave.className} text-center text-6xl pt-10 text-[#426da7]`}
      >
        Wave Eating
      </h1>

      <div className="min-h-screen flex flex-col items-center justify-center text-center ">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-[#426da7] text-white rounded-lg hover:bg-[#1e81b0]"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
