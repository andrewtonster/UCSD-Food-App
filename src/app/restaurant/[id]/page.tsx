import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GoogleMaps from "@/app/components/GoogleMaps";
import ReviewsForm from "@/app/components/ReviewsForm";
import Reviews from "@/app/components/Reviews";
import Link from "next/link";
import LoginForm from "@/app/components/Login";
import SignOutButton from "@/app/components/SignOut";
import Image from "next/image";
import ImageCarousel from "@/app/components/ImageCarousel";
import {
  Star,
  MapPin,
  Clock3,
  SquareArrowLeft,
  Clock2,
  Clock1,
} from "lucide-react";
import { Bevan } from "next/font/google";
const bevan = Bevan({
  subsets: ["latin"],
  weight: "400", // Bevan only has 400
  variable: "--font-bevan",
});

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const restaurant = await prisma.restaurant.findFirst({
    where: { id: id },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  console.log(restaurant);

  if (!restaurant) {
    return notFound();
  }

  const cords = restaurant?.coordinates.split(",");

  const images = ["/ramen.webp", "/ramen.webp", "/ramen.webp"];

  return (
    <div className="min-h-screen bg-[#8cc2e1] text-[#2b263b] relative">
      {/* Back Button */}
      {/* <Link
        href="/"
        className="absolute top-4 left-4 text-[#4574ab] hover:text-[#ed7976] text-3xl transition-all"
      >
        <SquareArrowLeft className="w-10 h-10 text-black hover:text-[#af4643] " />
      </Link> */}

      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 space-y-16">
        {/* Header Info */}
        <section className="space-y-4 relative">
          <h1 className="text-4xl font-extrabold text-[#354462] border-b-4 border-[#8cc2e1] inline-block pb-2 relative">
            {restaurant.name}
            <span className="absolute left-0 -bottom-1 w-10 h-1 bg-[#f79f79] rounded-full"></span>
          </h1>

          <div className="flex flex-wrap gap-6 text-[#354462] text-lg font-medium">
            <div className="flex items-center justify-center gap-1">
              <Star fill="#ffad72" className="inline" />{" "}
              {restaurant.ratingScore}
            </div>
            <div>
              {restaurant.numRatings}{" "}
              {restaurant.numRatings === 1 ? "review" : "reviews"}
            </div>
            <div className="flex items-center justify-center gap-1">
              {" "}
              <MapPin fill="#ecdddc" className="inline" />{" "}
              {restaurant.campusSection}
            </div>
            <div className="flex items-center justify-center gap-1">
              {" "}
              <Clock3 className="inline" /> Open: {restaurant.open}
            </div>
          </div>
        </section>

        {/* Image Carousel */}
        <section className="border border-[#8cc2e1] rounded-xl p-2 bg-[#ffffff] shadow-md">
          <ImageCarousel images={images} />
        </section>

        {/* About + Map */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* About */}
          <div className="relative w-full max-w-full">
            {/* Background layer (blue base) */}
            <div className="absolute inset-0 bg-[#4574ab] rounded-xl translate-x-[-8px] translate-y-[-8px] z-0"></div>

            {/* Foreground card (white content) */}
            <div className="relative z-10 bg-white p-6 rounded-xl  text-[#2b263b] space-y-4 text-lg leading-relaxed shadow-md">
              <h2 className="text-2xl font-semibold text-[#4574ab] relative before:content-[''] before:absolute before:-left-3 before:top-1 before:w-1 before:h-6 before:bg-[#ed7976] before:rounded-full">
                About
              </h2>

              <p>
                Welcome to {restaurant.name}, a favorite spot in the{" "}
                {restaurant.campusSection} area of UCSD. Known for its authentic
                flavors and cozy ambiance, we serve a variety of ramen dishes
                and Japanese sides prepared fresh daily.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-[#64a4c2] shadow-md">
            <GoogleMaps lat={cords[0]} lng={cords[1]} />
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[black] relative before:content-[''] before:absolute">
              Reviews
            </h2>
          </div>
          <Reviews
            initialReviews={restaurant.reviews}
            restaurantId={restaurant.id}
          />
        </section>

        {/* Footer */}
        <div className="pt-10 border-t border-[#4574ab] mt-16 flex justify-end">
          <SignOutButton />
        </div>
      </main>
    </div>
  );
};

export default page;

// use server action for comment, because of this we are going to be a client
// once we get the data we use it optimsiitcally to update
