"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const ReviewSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  rating: z.coerce.number().min(1).max(5),
  restaurantId: z.string().min(1),
  userId: z.string().min(1),
});

export async function submitReview(prevState: any, formData: FormData) {
  const form = {
    comment: formData.get("comment"),
    rating: formData.get("rating"),
    restaurantId: formData.get("restaurantId"),
    userId: formData.get("userId"),
  };

  const parsed = ReviewSchema.safeParse(form);

  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { comment, rating, restaurantId, userId } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return { message: "user does not exist" };
  }

  await prisma.review.create({
    data: {
      comment,
      rating,
      restaurantId,
      userId,
    },
  });

  console.log(`/restaurant/${restaurantId}`);
  revalidatePath(`/restaurant/${restaurantId}`);

  revalidatePath(`/`);
  // revalidatePath(`/restaurant/[id]`, "page");

  // redirect(`/restaurant/${restaurantId}`);
  return { message: "Review submitted!", ok: true };
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
  await prisma.user.create({
    data: {
      id: userId,
      email: email,
      name: name,
    },
  });

  return { message: "user created!" };
}

const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profileImg: z.string().optional(), // Firebase Storage URL
  userId: z.string().min(1, "User ID is required"),
});

export async function changeSettings(prevState: any, formData: FormData) {
  const form = {
    name: formData.get("name"),
    profileImg: formData.get("profileImg"),
    userId: formData.get("userId"),
  };

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
      profileImg, // just a string URL
    },
  });

  return { message: "Settings updated" };
}
