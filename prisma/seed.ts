import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional if you're using migrate reset)
  await prisma.review.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const [alice, bob, charlie] = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob",
      },
    }),
    prisma.user.create({
      data: {
        email: "charlie@example.com",
        name: "Charlie",
      },
    }),
  ]);

  // Create Restaurants
  const [eastGrill, eastNoodles, westBistro, westCafe] = await Promise.all([
    prisma.restaurant.create({
      data: {
        name: "East Grill",
        ratingScore: 4.5,
        numRatings: 3,
        coordinates: "40.7128,-74.0060",
        campusSection: "East Side",
        imageUrl: null,
        open: "10:00 AM - 10:00 PM",
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Noodle Nest",
        ratingScore: 4.0,
        numRatings: 2,
        coordinates: "40.7130,-74.0050",
        campusSection: "East Side",
        imageUrl: null,
        open: "11:00 AM - 9:00 PM",
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "West Bistro",
        ratingScore: 4.2,
        numRatings: 2,
        coordinates: "40.7120,-74.0080",
        campusSection: "West Side",
        imageUrl: null,
        open: "9:00 AM - 8:00 PM",
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Campus Cafe",
        ratingScore: 3.8,
        numRatings: 1,
        coordinates: "40.7110,-74.0070",
        campusSection: "West Side",
        imageUrl: null,
        open: "8:00 AM - 6:00 PM",
      },
    }),
  ]);

  // Create Reviews (8 total)
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Amazing food and service!",
        restaurantId: eastGrill.id,
        userId: alice.id,
      },
      {
        rating: 4,
        comment: "Solid experience overall.",
        restaurantId: eastGrill.id,
        userId: bob.id,
      },
      {
        rating: 3,
        comment: "It was okay, could be better.",
        restaurantId: eastGrill.id,
        userId: charlie.id,
      },
      {
        rating: 5,
        comment: "Loved the noodles!",
        restaurantId: eastNoodles.id,
        userId: alice.id,
      },
      {
        rating: 4,
        comment: "Nice and cozy.",
        restaurantId: westBistro.id,
        userId: bob.id,
      },
      {
        rating: 5,
        comment: "Best spot on campus.",
        restaurantId: westBistro.id,
        userId: charlie.id,
      },
      {
        rating: 3,
        comment: "Coffee was weak.",
        restaurantId: westCafe.id,
        userId: bob.id,
      },
      {
        rating: 4,
        comment: "Great for studying!",
        restaurantId: westCafe.id,
        userId: alice.id,
      },
    ],
  });

  console.log("🌱 Database seeded.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
