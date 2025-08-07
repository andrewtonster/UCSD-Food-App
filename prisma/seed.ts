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
  // Generate 20 restaurants
  const restaurantData = [
    { name: "Ocean Bowl", section: "North Campus" },
    { name: "Bento Box", section: "Downtown" },
    { name: "Taco Alley", section: "West Side" },
    { name: "Campus Deli", section: "East Side" },
    { name: "Sunset Grill", section: "South Campus" },
    { name: "Green Leaf", section: "West Side" },
    { name: "Pasta Point", section: "East Side" },
    { name: "Ramen Rise", section: "Downtown" },
    { name: "Sizzle Spot", section: "North Campus" },
    { name: "Golden Chopsticks", section: "South Campus" },
    { name: "Noodle Town", section: "East Side" },
    { name: "Campus Curry", section: "West Side" },
    { name: "Teriyaki Twist", section: "South Campus" },
    { name: "Pho Paradise", section: "Downtown" },
    { name: "Wrap & Roll", section: "East Side" },
    { name: "East Eats", section: "East Side" },
    { name: "West Wings", section: "West Side" },
    { name: "North Noms", section: "North Campus" },
    { name: "South Sizzle", section: "South Campus" },
    { name: "Downtown Diner", section: "Downtown" },
  ];

  const restaurants = await Promise.all(
    restaurantData.map((data, i) =>
      prisma.restaurant.create({
        data: {
          name: data.name,
          ratingScore: [3.5, 4.0, 4.2, 4.5, 4.8][i % 5],
          numRatings: Math.floor(Math.random() * 5) + 1,
          coordinates: `40.71${10 + i},-74.00${10 + i}`,
          campusSection: data.section,
          imageUrl: null,
          open: [
            "10:00 AM - 10:00 PM",
            "11:00 AM - 9:00 PM",
            "9:00 AM - 8:00 PM",
            "8:00 AM - 6:00 PM",
          ][i % 4],
        },
      })
    )
  );

  // Create Reviews (8 total)
  type UserKey = "alice" | "bob" | "charlie";
  const userMap: Record<UserKey, typeof alice> = {
    alice,
    bob,
    charlie,
  };
  const sampleComments = [
    "Loved the ambiance!",
    "Delicious and affordable.",
    "Could be better.",
    "Amazing service and food!",
    "Definitely coming back.",
    "Not worth the hype.",
    "Great spot between classes.",
    "Perfect place for late night eats.",
    "Highly recommend the special.",
    "Friendly staff and fast service.",
    "The spice level was just right.",
    "Huge portions!",
    "They messed up my order.",
    "Food was fresh and hot.",
    "Excellent value.",
    "Too crowded during lunch.",
    "Clean and cozy.",
    "Good vegan options!",
    "Wish they had more seating.",
    "Loved the desserts!",
  ];

  const userKeys: UserKey[] = ["alice", "bob", "charlie"];

  for (let i = 0; i < 40; i++) {
    const userKey = userKeys[i % userKeys.length];
    const user = userMap[userKey];
    const restaurant = restaurants[i % restaurants.length];

    await prisma.review.create({
      data: {
        rating: Math.floor(Math.random() * 3) + 3, // 3 to 5
        comment: sampleComments[i % sampleComments.length],
        restaurantId: restaurant.id,
        userId: user.id,
      },
    });
  }

  console.log("🌱 Database seeded.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
