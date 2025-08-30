"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReviewDTO, ReviewActionState, FieldErrors } from "@/lib/types";

const ReviewSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  rating: z.coerce.number().min(1).max(5),
  restaurantId: z.string().min(1),
  userId: z.string().min(1),
});

function toReviewDTO(saved: {
  id: string;
  comment: string;
  rating: number;
  restaurantId: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    profileImg: string;
  } | null;
}): ReviewDTO {
  return {
    id: saved.id,
    comment: saved.comment,
    rating: saved.rating,
    restaurantId: saved.restaurantId,
    userId: saved.userId,
    createdAt: new Date(),
    user: saved.user
      ? {
          id: saved.user.id,
          name: saved.user.name,
          email: saved.user.email,
          profileImg: saved.user.profileImg,
        }
      : null,
  };
}

export async function submitReview(
  prev: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const form = {
    comment: formData.get("comment"),
    rating: formData.get("rating"),
    restaurantId: formData.get("restaurantId"),
    userId: formData.get("userId"),
  };

  const parsed = ReviewSchema.safeParse(form);
  if (!parsed.success) {
    const errors: FieldErrors = parsed.error.flatten().fieldErrors;
    return { ok: false, message: "Validation failed", review: null, errors };
  }

  const { comment, rating, restaurantId, userId } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    return {
      ok: false,
      message: "User does not exist",
      review: null,
    };
  }

  try {
    const saved = await prisma.review.create({
      data: { comment, rating, restaurantId, userId },
      include: {
        user: {
          select: { id: true, name: true, email: true, profileImg: true },
        },
      },
    });

    const stats = await prisma.review.aggregate({
      where: { restaurantId: restaurantId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const averageRating = parseFloat(stats._avg.rating?.toFixed(1) || "0"); // e.g. 4.2
    const numRatings = stats._count.rating;

    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        ratingScore: averageRating,
        numRatings: numRatings,
      },
    });

    revalidatePath("/");
    revalidatePath(`/restaurant/${restaurantId}`);

    return {
      ok: true,
      message: "Review submitted!",
      review: toReviewDTO(saved),
    };
  } catch (err) {
    return {
      ok: false,
      message: "Could not save your review. Please try again.",
      review: null,
    };
  }
}

function generateShortName(userId: string) {
  const randomSuffix = Math.random().toString(36).slice(2, 6);
  const shortId = userId.slice(0, 6);
  return `GuestUser_${shortId}_${randomSuffix}`;
}

export async function createAnonymousUser(userId: string) {
  if (!userId) return;

  let attempts = 0;
  let uniqueName = "";
  let existingUser = null;

  while (attempts < 10) {
    uniqueName = generateShortName(userId);

    existingUser = await prisma.user.findUnique({
      where: { name: uniqueName },
    });

    if (!existingUser) break;

    attempts++;
  }

  if (existingUser) {
    throw new Error(
      "Failed to generate unique guest name after multiple attempts."
    );
  }

  await prisma.user.create({
    data: {
      id: userId,
      email: userId,
      name: uniqueName,
      isAnonymous: true,
    },
  });

  return { message: "user created!", name: uniqueName };
}

export async function createUser(userId: string, email: string, name: string) {
  if (!userId) {
    return;
  }
  const res = await prisma.user.create({
    data: {
      id: userId,
      email: email,
      name: name,
    },
  });

  if (!res) {
    return { message: "user failed to create!", ok: false };
  }

  return { message: "user created!", ok: true };
}

const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profileImg: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
});

export async function changeSettings(prevState: any, formData: FormData) {
  console.log("IN THE CHANGING SETTINGS");
  const form = {
    name: formData.get("name"),
    profileImg: formData.get("profileImg"),
    userId: formData.get("userId"),
  };
  console.log("in change settings");
  console.log(form.profileImg, "this is the profile image in the server");

  const parsed = settingsSchema.safeParse(form);

  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, profileImg, userId } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return { message: "User not found" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      profileImg,
    },
  });

  return { message: "Settings updated" };
}
