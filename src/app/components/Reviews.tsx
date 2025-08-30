"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { ShipWheel } from "lucide-react";

import { ReviewDTO } from "@/lib/types";
import { Star } from "lucide-react";
const Reviews = ({
  initialReviews,
}: {
  initialReviews: ReviewDTO[];
  restaurantId: string;
}) => {
  const [reviews, setReviews] = useState<ReviewDTO[]>(initialReviews ?? []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className=" relative bg-white px-5 py-5 rounded-lg">
      <ShipWheel className="hidden lg:block absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-20 h-20 text-black z-10" />
      <div className="max-h-[32rem] overflow-y-auto space-y-6 bg-[#4574ab] p-4 rounded-md">
        <button
          className="block mx-auto bg-[#e26d52] px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#af4643] transition cursor-pointer "
          onClick={() => setIsModalOpen(true)}
        >
          {" "}
          Add a review
        </button>
        <Modal isOpen={isModalOpen} onClose={onClose} setReviews={setReviews}>
          <h2 className="text-xl font-semibold mb-2">
            Hello Please Write your Review
          </h2>
        </Modal>
        {reviews.map((review, idx) => {
          console.log("THIS IS THE CURRENT USER", review?.user);
          console.log("This is the current image", review?.user?.profileImg);
          return (
            <div
              key={review.id}
              className="flex items-start bg-white rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto transition-all"
            >
              {/* Avatar */}
              <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden shrink-0 border-2 border-[#8cc2e1]">
                <Image
                  src={`${review?.user?.profileImg || "/icons/anonymous.webp"}`}
                  alt={`Avatar of ${review?.user?.name ?? "Anonymous"}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 268px) 100vw"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#4574ab] text-lg">
                  {review?.user?.name ?? "Anonymous"}
                </h3>
                <p className="text-[#2b263b] text-sm mt-1">{review.comment}</p>
              </div>

              {/* Rating */}

              <div className="ml-auto my-auto text-gray-700 flex items-center">
                <span className="flex items-center gap-1">
                  {review?.rating}
                  <Star fill="#ffad72" className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
