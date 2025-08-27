import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional if you're using migrate reset)
  await prisma.review.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  const spots = [
    {
      name: "Blue Bowl",
      campusSection: "Sixth College",
      coordinates: "32.88049099460306, -117.2408470972205",
      open: "Mon–Fri: 10 AM–4 PM; Closed Sat & Sun",
      description:
        "Customizable Acai Bowls and smoothies with many different type of toppings. Prices are fixed and you can add whatever you want without paying extra for toppings!",
    },
    {
      name: "Copa Vida",
      campusSection: "Sixth College",
      coordinates: "32.88038928844072, -117.2408513863034",
      open: "Mon–Fri: 8 AM–4 PM",
      description:
        "Aesthetic coffee shop located right in Sixth College. Looking for a place to grab a quick drink before a class? This is the spot to go to!",
    },
    {
      name: "Crave",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon–Fri: 8 AM-6 PM",
      description:
        "Seasonal grain bowls, salads, and stuffed Pita choices of proteins and toppings plus a BYO option.",
    },
    {
      name: "Fan Fan",
      campusSection: "Sixth College",
      coordinates: "32.88023446659353, -117.24082151394033",
      open: "11:00 AM - 8:00 PM",
      description:
        "Fan Fan serves authentic chinese food. Choose between different entrays and mix and match what you like. We also serve refreshing boba drinks for you to get through the school day!",
    },
    {
      name: "Makai",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon–Thu: 10:30 AM–11:30 PM; Fri: 10:30 AM–8:30 PM; Sun: 11:00 AM–8:00 PM; Closed Sat",
      description: "Selection of Signature Poke bowls & BYO Poke Bar.",
    },
    {
      name: "Noodles",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon-Fri: 8:00 AM - 6:00 PM",
      description: "Traditional Ramen and Pho Rotations.",
    },
    {
      name: "Plant Power",
      campusSection: "Sixth College",
      coordinates: "32.88101160455675, -117.24136051579106",
      open: "11:00 AM - 5:00 PM",
      description:
        "Plant Power Fast Food in La Jolla on the UCSD campus is proud to be providing delicious, 100% plant-based fast food to the university community. Our menu features a wide variety of options for vegan and plant-based food lovers, from classic burgers and sandwiches to fries, shakes, and even chicken tenders and nuggets.",
    },
    {
      name: "Rooftop",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "8:00 AM - 6:00 PM",
      description:
        "BBQ menu during the week highlighting in-house rubs, smoked items, and sauces with a weekend brunch and sandwich menu.",
    },
    {
      name: "Showa Ramen",
      campusSection: "Sixth College",
      coordinates: "32.88094651384239, -117.24091043113447",
      open: "11:00 AM - 8:00 PM",
      description:
        "Shōwa Hospitality presents UC San Diego’s new ramen spot, Shōwa Ramen, inspired by the Shōwa era in Japan. Old school meets new school with the mix of authentic flavor and a clean modern design that emphasizes simplicity and the highest quality ingredients. The chef will create Japanese style ramen such as Shoyu, Tonkotsu, Spicy Miso as well as killer Gyoza and Chashu Bowl. For health enthusiasts, vegetable ramen and Hiyashi Chuka (cold ramen) will be offered.",
    },
    {
      name: "Sixth Market",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "24 Hours",
      description:
        "Sixth Market is the largest market on campus, featuring groceries, fresh produce, snacks, grab and go meals, health and beauty options, as well as a full coffee and espresso bar! Featuring Amazon Just Walk Out Technology for an automated shopping experience. No lines, no seriously!",
    },
    {
      name: "Wolftown",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "8:00 AM - 6:00 PM",
      description:
        "This funky little taco shop serves Nachos, Burritos, Tacos, and Plates with a Rotation of Global flavors (Korean, Greek, Southern, Filipino).",
    },
    {
      name: "Tahini",
      campusSection: "Sixth College",
      coordinates: "32.880738503821576, -117.24088288880614",
      open: "10:30 AM - 3:00 PM",
      description:
        "Tahini aims to serve high quality Middle Eastern Street Food. CHoose between your own pita, rice bowl, or salad and add your favorite choice of falafel, chicken, shawarma or steak shawarma. We bake fresh pitas everyday and have many great sauces to go on top of our dishes",
    },

    // Muir College (10)
    {
      name: "Farmer's Market",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "9:00 AM - 5:00 PM",
      description:
        "Choose from specialty salads or build-your-own options, seasonal fruit and vegetable cups, and made-to-order sandwiches.",
    },
    {
      name: "hEAT",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description:
        "Enjoy a curated selection of Asian-inspired signature dishes and flavorful sides.",
    },
    {
      name: "John's Market",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "7:00 AM - 9:00 PM",
      description:
        "John's Market serves quick bites for students to eat ranging from ice cream, coffee, or a quick sandwhich.",
    },
    {
      name: "M.O.M. & P.O.P.",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "7:30 AM - 8:00 PM",
      description:
        "A convenient campus market and café perfect for students on the go. M.O.M. & P.O.P. offers freshly brewed coffee, grab-and-go meals, snacks, and everyday essentials. Stop by for a quick breakfast, stock up between classes, or recharge with a hot drink during long study sessions.",
    },
    {
      name: "Muir Woods",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "7:30 AM - 8:00 PM",
      description:
        "A cozy dining spot at the heart of Muir College offering fresh meals, snacks, and drinks. Whether you’re grabbing a quick coffee, enjoying a casual lunch, or meeting friends between classes, Muir Woods provides a relaxed atmosphere with plenty of options to refuel.",
    },
    {
      name: "Roots",
      campusSection: "Muir College",
      coordinates: "32.87889077389084, -117.24250049251125",
      open: "11:00 AM - 9:00 PM",
      description:
        "Roots is the university's first exclusively vegan eatery and lounge. Located on the Muir College campus below Pines Restaurant. Diners can choose from a delicious variety of hearty entrees, sides, and smoothies. Everything served here is vegan!",
    },
    {
      name: "Sweets",
      campusSection: "Muir College",
      coordinates: "32.87889077389084, -117.24250049251125",
      open: "8:00 AM - 8:00 PM",
      description:
        "A classic grill offering a variety of breakfast, lunch, and dinner options!",
    },

    {
      name: "Toasted",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description: "Enjoy delicious pizza and more!",
    },
    {
      name: "Triton Grill",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description:
        "A classic grill with breakfast, lunch and dinner options! Also, home to our soft-serve ice cream machines serving milkshakes, sundaes, and soft serve ice cream in waffle cones.",
    },

    // Price Center West (6)
    {
      name: "Dirty Birds",
      campusSection: "Price Center West",
      coordinates: "32.88012505079201, -117.2365086153031",
      open: "11:00 AM - 4:00 PM",
      description: "",
    },
    {
      name: "Jamba Juice",
      campusSection: "Price Center West",
      coordinates: "32.87999502735401, -117.23679318179323",
      open: "9:00 AM - 5:00 PM",
      description:
        "Dirty Birds at UCSD is a student-favorite spot in Price Center West, known for its award-winning chicken wings with more than 30 rotating sauces and flavors. Beyond wings, the menu includes pizza by the slice, sandwiches, burgers, and hearty sides, making it a go-to lunch stop on campus. Conveniently located behind Jamba Juice, it’s a lively, casual place to grab a quick meal with friends between classes.",
    },
    {
      name: "Lemongrass Farm Fresh Plates",
      campusSection: "Price Center West",
      coordinates: "32.87989769020295, -117.23613905764154",
      open: "9:00 AM - 9:00 PM",
      description:
        "Lemongrass Farm Fresh Plates brings vibrant Thai-fusion flavors right to UC San Diego’s Price Center West (Level 1, between Rubio’s and Panda Express). This fast-casual counter specializes in ‘farm-fresh’ grilled plates, wraps, sandwiches, and salads featuring proteins like chicken, tofu, beef, pork, or salmon, paired with rice or fresh veggies—and available with signature sauces like peanut or teriyaki. With its finish-your-bowl healthy approach and flexible weekday lunch–dinner hours, it's a popular go-to for students seeking something fresh, flavorful, and nourishing.",
    },
    {
      name: "Panda Express",
      campusSection: "Price Center West",
      coordinates: "32.87979997498874, -117.23618312391021",
      open: "10:00 AM - 3:00 PM",
      description:
        "Panda Express in Price Center West offers students a convenient and familiar spot for fast-casual American-Chinese dishes right on campus. Open weekdays from 10:00 AM to 3:00 PM, it serves staples like Orange Chicken, Beijing Beef, and Broccoli Beef in a quick-service format—perfect for a reliable lunch between classes.",
    },
    {
      name: "Starbucks",
      campusSection: "Price Center West",
      coordinates: "32.88044827645855, -117.23593103177066",
      open: "7:00 AM - 5:00 PM",
      description:
        "Starbucks in Price Center West offers your go-to curated coffee and tea beverages right at the heart of campus. Open 7:00 AM–5:00 PM on weekdays and closed on weekends, it’s a reliable spot to grab a morning espresso, enjoy your favorite Frappuccino, or meet up with friends over a warm latte in a relaxed student-union setting.",
    },
    {
      name: "Subway",
      campusSection: "Price Center West",
      coordinates: "32.879882663964025, -117.23644062874286",
      open: "7:00 AM - 8:00 PM",
      description:
        "Subway in Price Center West is your go-to for freshly made subs, salads, and breakfast sandwiches. Open early and well into the evening on weekdays, it's a reliable grab-and-go option when you're hustling between classes. On weekends, it scales back but still serves up plenty of quick, customizable meals to fuel your day.",
    },

    // PRICE CENTER EAST

    {
      name: "Burger King",
      campusSection: "Price Center East",
      coordinates: "32.879986483314376, -117.23605865452103",
      open: "7:00 AM - 8:00 PM",
      description:
        "Burger King at Price Center East serves up flame-grilled burgers, fries, and more—just the way you like it. Located on Level 1 near the Y Más food hall, it’s a dependable spot for a classic fast-food fix whether you’re grabbing breakfast, lunch, or an early dinner between classes.",
    },
    {
      name: "Curry Up Now",
      campusSection: "Price Center East",
      coordinates: "32.87980489834365, -117.23593835927478",
      open: "10:00 AM - 10:00 PM",
      description:
        "Curry Up Now delivers Indian street-food with a modern twist—expect Tikka Masala burritos, fried snacks like Holy Moly Fried-Ravioli and samosa chaat, build-your-own bowls, naan pizzas like the ‘Naughty Naan’, and fusion favorites such as Indo-Californian poutine. They also cater to varied diets with vegan, vegetarian, halal, keto, and paleo options.",
    },
    {
      name: "Flavorfull",
      campusSection: "Price Center East",
      coordinates: "32.87978806811195, -117.23597771723297",
      open: "10:00 AM - 7:30 PM",
      description:
        "Flavorfull serves customizable bowls, wraps, and plates—a flavorful blend of savory and sweet. Options include poke-style salmon and steak bowls, wraps like the FF San Diego (steak, fries, avocado, chimichurri), Surf & Turf or Steak & Fries plates, and build-your-own creations with bases ranging from romaine to sushi rice and dressings like chipotle lime or sesame ginger.",
    },
    {
      name: "Santorini Greek Island Grill",
      campusSection: "Price Center East",
      coordinates: "32.87976914580746, -117.23565113427479",
      open: "8:00 AM - 9:00 PM",
      description:
        "Santorini Greek Island Grill offers fresh-made Mediterranean favorites—think gyro and souvlaki platters, falafel, Greek salads, and shareable apps like seasoned fries topped with feta or spicy ‘volcano’ feta, plus classic sides like hummus and pita. The menu balances traditional Aegean flavors with generous portions and affordable prices.",
    },
    {
      name: "Tapioca Express",
      campusSection: "Price Center East",
      coordinates: "32.87964525545919, -117.2356015134091",
      open: "Mon–Fri: 10:30 AM – 8:00 PM; Sat–Sun: 11:00 AM – 5:00 PM",
      description:
        "Tapioca Express specializes in Asian-style bubble teas (including milk teas, snow bubbles, and yogurt frost slushes) alongside savory snacks. Popular bites include crispy popcorn chicken, fried potstickers, and crunchy calamari rings—offering both sweet sips and satisfying savory treats.",
    },
    {
      name: "Zanzibar at The Loft",
      campusSection: "Price Center East",
      coordinates: "32.87963392476122, -117.23587477213033",
      open: "Mon–Fri: 11:00 AM – 2:00 PM; Sat & Sun: Closed",
      description:
        "Zanzibar offers gourmet café fare and a bar-style menu—expect sandwiches and paninis, fresh salads, pastries, and made-to-order soups, alongside a curated selection of wines, craft beers, and specialty coffee drinks.",
    },

    // Price Center (2)
    {
      name: "Su Pan Bakery",
      campusSection: "Price Center",
      coordinates: "32.880097922955436, -117.23610197374373",
      open: "Mon–Fri: 7:00 AM – 3:00 PM; Sat & Sun: Closed",
      description:
        "Su Pan Bakery serves authentic Mexican panadería fare—fresh-from-the-oven pan dulce (like conchas, orejas, puerquitos), flan custards, fruit tarts, and other sweet pastries, all made using traditional recipes and high-quality ingredients.",
    },
    {
      name: "Sunshine Market",
      campusSection: "Price Center East",
      coordinates: "32.87966633496583, -117.23584983284671",
      open: "Mon–Fri: 8:00 AM – 4:30 PM; Sat & Sun: Closed",
      description:
        "Sunshine Market offers a full-service barista counter featuring Pachamama coffee, teas, mocktails, and the signature “Rise and Sunshine” drink. The market stocks fresh produce, sushi, sandwiches, salads, grab-and-go meals, local bagels and doughnuts, and everyday groceries—with Just Walk Out technology providing a touchless shopping experience.",
    },

    // Eleanor Roosevelt College (6)
    {
      name: "HaPi",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description: "Sweet and Savory hand pies from around the world!",
    },
    {
      name: "Journey",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "African diasporic foods with choices of stews, rice bowls, fry bowls with choice of proteins and Chapati.",
    },
    {
      name: "Kaldi",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description: "Coffee, Specialty Drinks, doughnuts and Baked Sweets.",
    },
    {
      name: "Soul",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "American Southern influence focusing on the flavors of the South. Homemade biscuit, grits, chicken & waffles, johnnycakes, fried chicken and catfish, fried green tomato and gumbos.",
    },
    {
      name: "Tandoor",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "Classic Indian curries, rice, and dahls, homemade fresh naan from our Tandoor ovens.",
    },
    {
      name: "Vibe",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "Caribbean foods following African diasporic influences, ribs, pollo guisados, sofrito chicken and pastas.",
    },

    // Revelle College (6)
    {
      name: "Al Dente",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description: "Authentic pastas and house made sauces.",
    },
    {
      name: "Garden Bar",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Salads and soups made with fresh seasonal ingredients. Try one of our specialty salads or build your own.",
    },
    {
      name: "Roger's Market",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Looking for something to keep you energized for the day? This market has a fully stocked espresso bar, fresh pastries and desserts, and a wide variety of grab-and-go snacks and meals. Featuring Amazon Just Walk Out Technology for an automated shopping experience. No lines, no seriously!",
    },
    {
      name: "Taqueria",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "SoCal classic favorites with breakfast burritos, nachos, carne asada fries, tacos and more!",
    },
    {
      name: "Umi",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Our newest location offers sushi rolls, nigiri and handroll varieties. Umi on the go coming soon!",
    },
    {
      name: "Wok",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fast service Asian Cuisine featuring bold flavors, fresh ingredients and global influences.",
    },

    // Marshall College (4)
    {
      name: "Counter Culture",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Enjoy freshly brewed coffee, sweets, and bagels, along with refreshing açaí and passion fruit bowls.",
    },
    {
      name: "Scholars Italian",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Savor a variety of pastas, hot subs, fresh salads, and authentic Detroit-style pizza.",
    },
    {
      name: "Scholars Pizza",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Enjoy handcrafted, made-from-scratch pizza cooked to perfection in our stone-fired oven.",
    },
    {
      name: "Spice",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "A certified Kosher kitchen offering a fresh Mediterranean-inspired menu.",
    },

    // Canyon Vista Marketplace (3)
    {
      name: "Earl’s Coffee House",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.8841298199753, -117.23275587585057",
      open: "7:00 AM - 9:00 PM",
      description:
        "Coffee, specialty drinks, doughnuts, sweets, Boba and more!",
    },
    {
      name: "Fresh",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.8841298199753, -117.23275587585057",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fresh highlights seasonal, health-forward meals with a rotating menu of salads, wraps, and bowls. The focus is on lighter fare using whole grains, lean proteins, and fresh produce, with plant-based and customizable options available.",
    },
    {
      name: "Fusion Grill",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.88402184230073, -117.23328754695589",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fusion Grill serves up classic American comfort food with a global twist—burgers, sandwiches, and fries alongside internationally inspired specials. The menu includes breakfast, lunch, dinner, and late-night options, with all offerings Halal certified.",
    },

    // RIMAC (3)
    {
      name: "Ridge Walk Social",
      campusSection: "RIMAC",
      coordinates: "32.88587622082916, -117.24031031143655",
      open: "10:30 AM - 9:00 PM",
      description:
        "Ridge Walk Social offers a modern food-hall style menu with artisan pizzas, burgers, and globally inspired entrées. Options rotate seasonally and include both hearty plates and lighter choices, designed for post-workout meals or casual dining.",
    },
    {
      name: "Shake Smart",
      campusSection: "RIMAC",
      coordinates: "32.886257758234976, -117.23714731889083",
      open: "10:30 AM - 7:00 PM",
      description:
        "Shake Smart specializes in protein shakes, smoothies, and healthy grab-and-go items. Popular choices include fruit-based blends, coffee protein shakes, acai bowls, and snacks tailored for pre- or post-gym fueling.",
    },
    {
      name: "TEC Cafe",
      campusSection: "RIMAC",
      coordinates: "32.885797734058805, -117.24044266537057",
      open: "8:00 AM - 12:00 PM",
      description:
        "TEC Café serves premium coffee drinks, teas, and fresh-baked pastries in a compact café setting inside RIMAC. It’s a morning stop for espresso, cold brew, and light breakfast items before classes or workouts.",
    },

    // Mandeville (3 + 1 center)
    {
      name: "Art of Espresso Café",
      campusSection: "Mandeville",
      coordinates: "32.87766946520547, -117.23903458260727",
      open: "8:00 AM - 4:00 PM",
      description:
        "Art of Espresso Café serves handcrafted coffee, espresso drinks, smoothies, and teas along with fresh pastries, sandwiches, salads, and desserts.",
    },
    {
      name: "Blue Pepper Asian Cuisine",
      campusSection: "Mandeville",
      coordinates: "32.877301638109884, -117.24013484680623",
      open: "8:00 AM - 6:00 PM",
      description:
        "Blue Pepper offers a range of Asian-inspired dishes such as stir-fries, noodle bowls, curries, and rice plates, blending traditional flavors with fast-casual service.",
    },
    {
      name: "Shores Diner",
      campusSection: "Mandeville",
      coordinates: "32.877108820829214, -117.23952192192337",
      open: "9:30 AM - 9:00 PM",
      description:
        "Shores Diner features classic American comfort foods, including breakfast plates, burgers, sandwiches, and hearty entrées served throughout the day.",
    },
    {
      name: "Taco Villa",
      campusSection: "Mandeville",
      coordinates: "32.87691399977278, -117.24001463435822",
      open: "8:00 AM - 8:00 PM",
      description:
        "Taco Villa specializes in fresh Mexican favorites like tacos, burritos, quesadillas, and combination plates with customizable proteins and salsas.",
    },

    // Matthews Quad (2)
    {
      name: "Croutons",
      campusSection: "Matthews Quad",
      coordinates: "32.87858226269206, -117.23568908416915",
      open: "10:00 AM - 3:00 PM",
      description:
        "Croutons offers made-to-order salads, soups, and sandwiches, with fresh ingredients and customizable combinations. Known for its signature bread bowls and crisp salad options.",
    },
    {
      name: "YogurtWorld",
      campusSection: "Matthews Quad",
      coordinates: "32.87927380217585, -117.23590902530749",
      open: "11:00 AM - 6:00 PM",
      description:
        "YogurtWorld serves self-serve frozen yogurt with a rotating variety of flavors and toppings, ranging from fresh fruit to candy and syrups.",
    },

    // Student Center (2)
    // {
    //   name: "The Food Co-op",
    //   campusSection: "Student Center",
    //   coordinates: "",
    //   open: "",
    // },
    // {
    //   name: "The General Store",
    //   campusSection: "Student Center",
    //   coordinates: "",
    //   open: "",
    // },

    // Seventh College (2)
    {
      name: "Northside Deli at Seventh Market",
      campusSection: "Seventh College",
      coordinates: "32.88795846138989, -117.24203413358183",
      open: "11:00 AM - 6:00 PM",
      description:
        "Made to order sandwiches, wraps, soup, and bowls for breakfast, lunch, and dinner.",
    },
    {
      name: "The Bistro",
      campusSection: "Seventh College",
      coordinates: "32.88795846138989, -117.24203413358183",
      open: "11:00 AM - 6:00 PM",
      description:
        "A modern eatery featuring an open kitchen, sushi bar, and an exciting Pacific Rim-inspired menu. Our chefs draw from various Asian cultures to serve up the freshest seafood, crisp greens, local produce inspired vegetarian fare, and noodle dishes.",
    },

    // Warren College (1)
    {
      name: "Cups Coffee",
      campusSection: "Warren College",
      coordinates: "32.881624307303056, -117.2341681890531",
      open: "10:00 AM - 4:00 PM",
      description:
        "Cups Coffee offers espresso drinks, teas, and blended beverages along with pastries, cookies, and light snacks, providing a local café experience on campus.",
    },

    // Franklin Antonio Hall (1)
    {
      name: "Crafted @ Minerva's Cafe",
      campusSection: "Franklin Antonio Hall",
      coordinates: "32.88378640052974, -117.23511985777476",
      open: "7:00 AM - 7:00 PM",
      description:
        "Crafted @ Minerva’s Café features locally roasted coffee, espresso drinks, teas, and pastries along with fresh sandwiches, wraps, and grab-and-go meals tailored for students and faculty in Franklin Antonio Hall.",
    },

    // Geisel Library (1)
    {
      name: "Audrey’s Café",
      campusSection: "Geisel Library",
      coordinates: "32.88112655014455, -117.23757066707627",
      open: "9:00 AM - 7:00 PM",
      description:
        "Audrey’s Café, located inside Geisel Library, serves specialty coffee, teas, and espresso drinks alongside pastries, sandwiches, and light snacks—providing a convenient spot for study breaks and refueling during long library sessions.",
    },

    // School of Medicine (1)
    {
      name: "Club Med",
      campusSection: "School of Medicine",
      coordinates: "32.875384764719094, -117.23493966463008",
      open: "7:00 AM - 2:30 PM",
      description:
        "Located in the heart of the School of Medicine, Club Med offers made-to-order salads, sandwiches, flatbread pizzas, soups, lunch combos, and tasty desserts.",
    },

    // North Torrey Pines (1)
    {
      name: "Bella Vista Social Club and Caffé",
      campusSection: "North Torrey Pines",
      coordinates: "32.88919358543328, -117.2439533435603",
      open: "8:00 AM - 6:00 PM",
      description:
        "Bella Vista Social Club and Caffé serves Mediterranean-inspired cuisine with a California twist. The menu features panini, pastas, fresh salads, breakfast plates, pastries, and specialty coffee drinks, along with beer and wine—all enjoyed with sweeping ocean views.",
    },
  ];

  await prisma.restaurant.createMany({
    data: spots,
    skipDuplicates: true, // optional safety if rerun
  });
}

// Run & cleanup
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
