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
      coordinates: "32.880492108715586, -117.24084834570162",
      open: "Mon–Fri: 10 AM–4 PM; Closed Sat & Sun",
      description:
        "Customizable Acai Bowls and smoothies with many different type of toppings. Prices are fixed and you can add whatever you want without paying extra for toppings!",
      imageUrl: "BlueBowl",
    },
    {
      name: "Copa Vida",
      campusSection: "Sixth College",
      coordinates: "32.88023318187116, -117.24085957994096",
      open: "Mon–Fri: 8 AM–4 PM",
      description:
        "Aesthetic coffee shop located right in Sixth College. Looking for a place to grab a quick drink before a class? This is the spot to go to!",
      imageUrl: "CopaVida",
    },
    {
      name: "Crave",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon–Fri: 8 AM-6 PM",
      description:
        "Seasonal grain bowls, salads, and stuffed Pita choices of proteins and toppings plus a BYO option.",
      imageUrl: "Crave",
    },
    {
      name: "Fan Fan",
      campusSection: "Sixth College",
      coordinates: "32.88010004915062, -117.24094695735829",
      open: "11:00 AM - 8:00 PM",
      description:
        "Fan Fan serves authentic chinese food. Choose between different entrays and mix and match what you like. We also serve refreshing boba drinks for you to get through the school day!",
      imageUrl: "FanFan",
    },
    {
      name: "Makai",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon–Thu: 10:30 AM–11:30 PM; Fri: 10:30 AM–8:30 PM; Sun: 11:00 AM–8:00 PM; Closed Sat",
      description: "Selection of Signature Poke bowls & BYO Poke Bar.",
      imageUrl: "Makai",
    },
    {
      name: "Noodles",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "Mon-Fri: 8:00 AM - 6:00 PM",
      description: "Traditional Ramen and Pho Rotations.",
      imageUrl: "Noodles",
    },
    {
      name: "Plant Power",
      campusSection: "Sixth College",
      coordinates: "32.88090319946874, -117.24138493889433",
      open: "11:00 AM - 5:00 PM",
      description:
        "Plant Power Fast Food in La Jolla on the UCSD campus is proud to be providing delicious, 100% plant-based fast food to the university community. Our menu features a wide variety of options for vegan and plant-based food lovers, from classic burgers and sandwiches to fries, shakes, and even chicken tenders and nuggets.",
      imageUrl: "PlantPower",
    },
    {
      name: "Rooftop",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "8:00 AM - 6:00 PM",
      description:
        "BBQ menu during the week highlighting in-house rubs, smoked items, and sauces with a weekend brunch and sandwich menu.",
      imageUrl: "Rooftop",
    },
    {
      name: "Showa Ramen",
      campusSection: "Sixth College",
      coordinates: "32.88071504667484, -117.24084525258787",
      open: "11:00 AM - 8:00 PM",
      description:
        "Shōwa Hospitality presents UC San Diego’s new ramen spot, Shōwa Ramen, inspired by the Shōwa era in Japan. Old school meets new school with the mix of authentic flavor and a clean modern design that emphasizes simplicity and the highest quality ingredients. The chef will create Japanese style ramen such as Shoyu, Tonkotsu, Spicy Miso as well as killer Gyoza and Chashu Bowl. For health enthusiasts, vegetable ramen and Hiyashi Chuka (cold ramen) will be offered.",
      imageUrl: "ShowaRamen",
    },
    {
      name: "Sixth Market",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "24 Hours",
      description:
        "Sixth Market is the largest market on campus, featuring groceries, fresh produce, snacks, grab and go meals, health and beauty options, as well as a full coffee and espresso bar! Featuring Amazon Just Walk Out Technology for an automated shopping experience. No lines, no seriously!",
      imageUrl: "SixthMarket",
    },
    {
      name: "Wolftown",
      campusSection: "Sixth College",
      coordinates: "32.880106385445266, -117.24221831420526",
      open: "8:00 AM - 6:00 PM",
      description:
        "This funky little taco shop serves Nachos, Burritos, Tacos, and Plates with a Rotation of Global flavors (Korean, Greek, Southern, Filipino).",
      imageUrl: "Wolftown",
    },
    {
      name: "Tahini",
      campusSection: "Sixth College",
      coordinates: "32.880738503821576, -117.24088288880614",
      open: "10:30 AM - 3:00 PM",
      description:
        "Tahini aims to serve high quality Middle Eastern Street Food. CHoose between your own pita, rice bowl, or salad and add your favorite choice of falafel, chicken, shawarma or steak shawarma. We bake fresh pitas everyday and have many great sauces to go on top of our dishes",
      imageUrl: "Tahini",
    },

    // Muir College (10)
    {
      name: "Farmer's Market",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "9:00 AM - 5:00 PM",
      description:
        "Choose from specialty salads or build-your-own options, seasonal fruit and vegetable cups, and made-to-order sandwiches.",
      imageUrl: "FarmersMarket",
    },
    {
      name: "hEAT",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description:
        "Enjoy a curated selection of Asian-inspired signature dishes and flavorful sides.",
      imageUrl: "hEAT",
    },
    {
      name: "John's Market",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "7:00 AM - 9:00 PM",
      description:
        "John's Market serves quick bites for students to eat ranging from ice cream, coffee, or a quick sandwhich.",
      imageUrl: "JohnsMarket",
    },
    {
      name: "M.O.M. & P.O.P.",
      campusSection: "Muir College",
      coordinates: "32.87880236037474, -117.24260979252624",
      open: "7:30 AM - 8:00 PM",
      description:
        "A convenient campus market and café perfect for students on the go. M.O.M. & P.O.P. offers freshly brewed coffee, grab-and-go meals, snacks, and everyday essentials. Stop by for a quick breakfast, stock up between classes, or recharge with a hot drink during long study sessions.",
      imageUrl: "MOMPOP",
    },
    {
      name: "Muir Woods",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "7:30 AM - 8:00 PM",
      description:
        "A cozy dining spot at the heart of Muir College offering fresh meals, snacks, and drinks. Whether you’re grabbing a quick coffee, enjoying a casual lunch, or meeting friends between classes, Muir Woods provides a relaxed atmosphere with plenty of options to refuel.",
      imageUrl: "MuirWoods",
    },
    {
      name: "Roots",
      campusSection: "Muir College",
      coordinates: "32.87889077389084, -117.24250049251125",
      open: "11:00 AM - 9:00 PM",
      description:
        "Roots is the university's first exclusively vegan eatery and lounge. Located on the Muir College campus below Pines Restaurant. Diners can choose from a delicious variety of hearty entrees, sides, and smoothies. Everything served here is vegan!",
      imageUrl: "Roots",
    },
    {
      name: "Sweets",
      campusSection: "Muir College",
      coordinates: "32.87889077389084, -117.24250049251125",
      open: "8:00 AM - 8:00 PM",
      description:
        "A classic grill offering a variety of breakfast, lunch, and dinner options!",
      imageUrl: "Sweets",
    },

    {
      name: "Toasted",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description: "Enjoy delicious pizza and more!",
      imageUrl: "Toasted",
    },
    {
      name: "Triton Grill",
      campusSection: "Muir College",
      coordinates: "32.87879278693141, -117.24250049251125",
      open: "9:00 AM - 5:00 PM",
      description:
        "A classic grill with breakfast, lunch and dinner options! Also, home to our soft-serve ice cream machines serving milkshakes, sundaes, and soft serve ice cream in waffle cones.",
      imageUrl: "TritonGrill",
    },

    // Price Center West (6)
    {
      name: "Dirty Birds",
      campusSection: "Price Center West",
      coordinates: "32.88009575053985, -117.23670865696403",
      open: "11:00 AM - 4:00 PM",
      description:
        "Dirty Birds at UCSD is a student-favorite spot in Price Center West, known for its award-winning chicken wings with more than 30 rotating sauces and flavors. Beyond wings, the menu includes pizza by the slice, sandwiches, burgers, and hearty sides, making it a go-to lunch stop on campus. Conveniently located behind Jamba Juice, it’s a lively, casual place to grab a quick meal with friends between classes.",
      imageUrl: "DirtyBirds",
    },
    {
      name: "Jamba Juice",
      campusSection: "Price Center West",
      coordinates: "32.87996188951902, -117.23682885615149",
      open: "9:00 AM - 5:00 PM",
      description:
        "Jamba Juice is a great place to get a refreshing beverage or smoothie bowl. Choose from a variety flavors and customize a drink packed with lots of fruit!",
      imageUrl: "JambaJuice",
    },
    {
      name: "Lemongrass Farm Fresh Plates",
      campusSection: "Price Center West",
      coordinates: "32.87989769020295, -117.23613905764154",
      open: "9:00 AM - 9:00 PM",
      description:
        "Lemongrass Farm Fresh Plates brings vibrant Thai-fusion flavors right to UC San Diego’s Price Center West (Level 1, between Rubio’s and Panda Express). This fast-casual counter specializes in ‘farm-fresh’ grilled plates, wraps, sandwiches, and salads featuring proteins like chicken, tofu, beef, pork, or salmon, paired with rice or fresh veggies—and available with signature sauces like peanut or teriyaki. With its finish-your-bowl healthy approach and flexible weekday lunch–dinner hours, it's a popular go-to for students seeking something fresh, flavorful, and nourishing.",
      imageUrl: "LemongrassFarmFreshPlates",
    },
    {
      name: "Panda Express",
      campusSection: "Price Center West",
      coordinates: "32.87973316652374, -117.23630641358709",
      open: "10:00 AM - 3:00 PM",
      description:
        "Panda Express in Price Center West offers students a convenient and familiar spot for fast-casual American-Chinese dishes right on campus. Open weekdays from 10:00 AM to 3:00 PM, it serves staples like Orange Chicken, Beijing Beef, and Broccoli Beef in a quick-service format—perfect for a reliable lunch between classes.",

      imageUrl: "PandaExpress",
    },
    {
      name: "Starbucks",
      campusSection: "Price Center West",
      coordinates: "32.87991899127401, -117.23634890909433",
      open: "7:00 AM - 5:00 PM",
      description:
        "Starbucks in Price Center West offers your go-to curated coffee and tea beverages right at the heart of campus. Open 7:00 AM–5:00 PM on weekdays and closed on weekends, it’s a reliable spot to grab a morning espresso, enjoy your favorite Frappuccino, or meet up with friends over a warm latte in a relaxed student-union setting.",
      imageUrl: "Starbucks",
    },
    {
      name: "Subway",
      campusSection: "Price Center West",
      coordinates: "32.879882663964025, -117.23644062874286",
      open: "7:00 AM - 8:00 PM",
      description:
        "Subway in Price Center West is your go-to for freshly made subs, salads, and breakfast sandwiches. Open early and well into the evening on weekdays, it's a reliable grab-and-go option when you're hustling between classes. On weekends, it scales back but still serves up plenty of quick, customizable meals to fuel your day.",
      imageUrl: "Subway",
    },

    // PRICE CENTER EAST

    {
      name: "Burger King",
      campusSection: "Price Center East",
      coordinates: "32.879972492138506, -117.23607680718483",
      open: "7:00 AM - 8:00 PM",
      description:
        "Burger King at Price Center East serves up flame-grilled burgers, fries, and more—just the way you like it. Located on Level 1 near the Y Más food hall, it’s a dependable spot for a classic fast-food fix whether you’re grabbing breakfast, lunch, or an early dinner between classes.",
      imageUrl: "BurgerKing",
    },
    {
      name: "Curry Up Now",
      campusSection: "Price Center East",
      coordinates: "32.879767582401406, -117.23599652282209",
      open: "10:00 AM - 10:00 PM",
      description:
        "Curry Up Now delivers Indian street-food with a modern twist—expect Tikka Masala burritos, fried snacks like Holy Moly Fried-Ravioli and samosa chaat, build-your-own bowls, naan pizzas like the ‘Naughty Naan’, and fusion favorites such as Indo-Californian poutine. They also cater to varied diets with vegan, vegetarian, halal, keto, and paleo options.",
      imageUrl: "CurryUpNow",
    },
    {
      name: "Flavorfull",
      campusSection: "Price Center East",
      coordinates: "32.87978806811195, -117.23597771723297",
      open: "10:00 AM - 7:30 PM",
      description:
        "Flavorfull serves customizable bowls, wraps, and plates—a flavorful blend of savory and sweet. Options include poke-style salmon and steak bowls, wraps like the FF San Diego (steak, fries, avocado, chimichurri), Surf & Turf or Steak & Fries plates, and build-your-own creations with bases ranging from romaine to sushi rice and dressings like chipotle lime or sesame ginger.",
      imageUrl: "Flavorfull",
    },
    {
      name: "Santorini Greek Island Grill",
      campusSection: "Price Center East",
      coordinates: "32.87978854480133, -117.23558398996357",
      open: "8:00 AM - 9:00 PM",
      description:
        "Santorini Greek Island Grill offers fresh-made Mediterranean favorites—think gyro and souvlaki platters, falafel, Greek salads, and shareable apps like seasoned fries topped with feta or spicy ‘volcano’ feta, plus classic sides like hummus and pita. The menu balances traditional Aegean flavors with generous portions and affordable prices.",
      imageUrl: "SantoriniGreekIslandGrill",
    },
    {
      name: "Tapioca Express",
      campusSection: "Price Center East",
      coordinates: "32.879674096322844, -117.23562355474621",
      open: "Mon–Fri: 10:30 AM – 8:00 PM; Sat–Sun: 11:00 AM – 5:00 PM",
      description:
        "Tapioca Express specializes in Asian-style bubble teas (including milk teas, snow bubbles, and yogurt frost slushes) alongside savory snacks. Popular bites include crispy popcorn chicken, fried potstickers, and crunchy calamari rings—offering both sweet sips and satisfying savory treats.",
      imageUrl: "TapiocaExpress",
    },
    {
      name: "Zanzibar at The Loft",
      campusSection: "Price Center East",
      coordinates: "32.879610103560765, -117.23589318141299",
      open: "Mon–Fri: 11:00 AM – 2:00 PM; Sat & Sun: Closed",
      description:
        "Zanzibar offers gourmet café fare and a bar-style menu—expect sandwiches and paninis, fresh salads, pastries, and made-to-order soups, alongside a curated selection of wines, craft beers, and specialty coffee drinks.",
      imageUrl: "ZanzibarAtTheLoft",
    },

    // Price Center (2)
    {
      name: "Su Pan Bakery",
      campusSection: "Price Center",
      coordinates: "32.880097922955436, -117.23610197374373",
      open: "Mon–Fri: 7:00 AM – 3:00 PM; Sat & Sun: Closed",
      description:
        "Su Pan Bakery serves authentic Mexican panadería fare—fresh-from-the-oven pan dulce (like conchas, orejas, puerquitos), flan custards, fruit tarts, and other sweet pastries, all made using traditional recipes and high-quality ingredients.",
      imageUrl: "SuPanBakery",
    },
    {
      name: "Sunshine Market",
      campusSection: "Price Center East",
      coordinates: "32.87966633496583, -117.23584983284671",
      open: "Mon–Fri: 8:00 AM – 4:30 PM; Sat & Sun: Closed",
      description:
        "Sunshine Market offers a full-service barista counter featuring Pachamama coffee, teas, mocktails, and the signature “Rise and Sunshine” drink. The market stocks fresh produce, sushi, sandwiches, salads, grab-and-go meals, local bagels and doughnuts, and everyday groceries—with Just Walk Out technology providing a touchless shopping experience.",
      imageUrl: "SunshineMarket",
    },

    // Eleanor Roosevelt College (6)
    {
      name: "HaPi",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description: "Sweet and Savory hand pies from around the world!",
      imageUrl: "HaPi",
    },
    {
      name: "Journey",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "African diasporic foods with choices of stews, rice bowls, fry bowls with choice of proteins and Chapati.",
      imageUrl: "Journey",
    },
    {
      name: "Kaldi",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description: "Coffee, Specialty Drinks, doughnuts and Baked Sweets.",
      imageUrl: "Kaldi",
    },
    {
      name: "Soul",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "American Southern influence focusing on the flavors of the South. Homemade biscuit, grits, chicken & waffles, johnnycakes, fried chicken and catfish, fried green tomato and gumbos.",
      imageUrl: "Soul",
    },
    {
      name: "Tandoor",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "Classic Indian curries, rice, and dahls, homemade fresh naan from our Tandoor ovens.",
      imageUrl: "Tandoor",
    },
    {
      name: "Vibe",
      campusSection: "Eleanor Roosevelt College",
      coordinates: "32.886050606747844, -117.24248313354656",
      open: "Mon–Thu: 7 AM–11 PM; Fri–Sun: 7 AM–8 PM",
      description:
        "Caribbean foods following African diasporic influences, ribs, pollo guisados, sofrito chicken and pastas.",
      imageUrl: "Vibe",
    },

    // Revelle College (6)
    {
      name: "Al Dente",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description: "Authentic pastas and house made sauces.",
      imageUrl: "AlDente",
    },
    {
      name: "Garden Bar",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Salads and soups made with fresh seasonal ingredients. Try one of our specialty salads or build your own.",
      imageUrl: "GardenBar",
    },
    {
      name: "Roger's Market",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Looking for something to keep you energized for the day? This market has a fully stocked espresso bar, fresh pastries and desserts, and a wide variety of grab-and-go snacks and meals. Featuring Amazon Just Walk Out Technology for an automated shopping experience. No lines, no seriously!",
      imageUrl: "RogersMarket",
    },
    {
      name: "Taqueria",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "SoCal classic favorites with breakfast burritos, nachos, carne asada fries, tacos and more!",
      imageUrl: "Taqueria",
    },
    {
      name: "Umi",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Our newest location offers sushi rolls, nigiri and handroll varieties. Umi on the go coming soon!",
      imageUrl: "Umi",
    },
    {
      name: "Wok",
      campusSection: "Revelle College",
      coordinates: "32.87476065380017, -117.24194482007164",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fast service Asian Cuisine featuring bold flavors, fresh ingredients and global influences.",
      imageUrl: "Wok",
    },

    // Marshall College (4)
    {
      name: "Counter Culture",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Enjoy freshly brewed coffee, sweets, and bagels, along with refreshing açaí and passion fruit bowls.",
      imageUrl: "CounterCulture",
    },
    {
      name: "Scholars Italian",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Savor a variety of pastas, hot subs, fresh salads, and authentic Detroit-style pizza.",
      imageUrl: "ScholarsItalian",
    },
    {
      name: "Scholars Pizza",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "Enjoy handcrafted, made-from-scratch pizza cooked to perfection in our stone-fired oven.",
      imageUrl: "ScholarsPizza",
    },
    {
      name: "Spice",
      campusSection: "Marshall College",
      coordinates: "32.88305345237798, -117.2427380212425",
      open: "7:00 AM - 9:00 PM",
      description:
        "A certified Kosher kitchen offering a fresh Mediterranean-inspired menu.",
      imageUrl: "Spice",
    },

    // Canyon Vista Marketplace (3)
    {
      name: "Earl’s Coffee House",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.8841298199753, -117.23275587585057",
      open: "7:00 AM - 9:00 PM",
      description:
        "Coffee, specialty drinks, doughnuts, sweets, Boba and more!",
      imageUrl: "EarlsCoffeeHouse",
    },
    {
      name: "Fresh",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.8841298199753, -117.23275587585057",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fresh highlights seasonal, health-forward meals with a rotating menu of salads, wraps, and bowls. The focus is on lighter fare using whole grains, lean proteins, and fresh produce, with plant-based and customizable options available.",
      imageUrl: "Fresh",
    },
    {
      name: "Fusion Grill",
      campusSection: "Canyon Vista Marketplace",
      coordinates: "32.88402184230073, -117.23328754695589",
      open: "7:00 AM - 9:00 PM",
      description:
        "Fusion Grill serves up classic American comfort food with a global twist—burgers, sandwiches, and fries alongside internationally inspired specials. The menu includes breakfast, lunch, dinner, and late-night options, with all offerings Halal certified.",
      imageUrl: "FusionGrill",
    },

    // RIMAC (3)
    {
      name: "Ridge Walk Social",
      campusSection: "RIMAC",
      coordinates: "32.88587622082916, -117.24031031143655",
      open: "10:30 AM - 9:00 PM",
      description:
        "Ridge Walk Social offers a modern food-hall style menu with artisan pizzas, burgers, and globally inspired entrées. Options rotate seasonally and include both hearty plates and lighter choices, designed for post-workout meals or casual dining.",
      imageUrl: "RidgeWalkSocial",
    },
    {
      name: "Shake Smart",
      campusSection: "RIMAC",
      coordinates: "32.886257758234976, -117.23714731889083",
      open: "10:30 AM - 7:00 PM",
      description:
        "Shake Smart specializes in protein shakes, smoothies, and healthy grab-and-go items. Popular choices include fruit-based blends, coffee protein shakes, acai bowls, and snacks tailored for pre- or post-gym fueling.",
      imageUrl: "ShakeSmart",
    },
    {
      name: "TEC Cafe",
      campusSection: "RIMAC",
      coordinates: "32.885797734058805, -117.24044266537057",
      open: "8:00 AM - 12:00 PM",
      description:
        "TEC Café serves premium coffee drinks, teas, and fresh-baked pastries in a compact café setting inside RIMAC. It’s a morning stop for espresso, cold brew, and light breakfast items before classes or workouts.",
      imageUrl: "TECCafe",
    },

    // Mandeville (3 + 1 center)
    {
      name: "Art of Espresso Café",
      campusSection: "Mandeville",
      coordinates: "32.87766946520547, -117.23903458260727",
      open: "8:00 AM - 4:00 PM",
      description:
        "Art of Espresso Café serves handcrafted coffee, espresso drinks, smoothies, and teas along with fresh pastries, sandwiches, salads, and desserts.",
      imageUrl: "ArtOfEspressoCafe",
    },
    {
      name: "Blue Pepper Asian Cuisine",
      campusSection: "Mandeville",
      coordinates: "32.877301638109884, -117.24013484680623",
      open: "8:00 AM - 6:00 PM",
      description:
        "Blue Pepper offers a range of Asian-inspired dishes such as stir-fries, noodle bowls, curries, and rice plates, blending traditional flavors with fast-casual service.",
      imageUrl: "BluePepperAsianCuisine",
    },
    {
      name: "Shores Diner",
      campusSection: "Mandeville",
      coordinates: "32.877108820829214, -117.23952192192337",
      open: "9:30 AM - 9:00 PM",
      description:
        "Shores Diner features classic American comfort foods, including breakfast plates, burgers, sandwiches, and hearty entrées served throughout the day.",
      imageUrl: "ShoresDiner",
    },
    {
      name: "Taco Villa",
      campusSection: "Mandeville",
      coordinates: "32.87691399977278, -117.24001463435822",
      open: "8:00 AM - 8:00 PM",
      description:
        "Taco Villa specializes in fresh Mexican favorites like tacos, burritos, quesadillas, and combination plates with customizable proteins and salsas.",
      imageUrl: "TacoVilla",
    },

    // Matthews Quad (2)
    {
      name: "Croutons",
      campusSection: "Matthews Quad",
      coordinates: "32.87858815654057, -117.23568173781878",
      open: "10:00 AM - 3:00 PM",
      description:
        "Croutons offers made-to-order salads, soups, and sandwiches, with fresh ingredients and customizable combinations. Known for its signature bread bowls and crisp salad options.",
      imageUrl: "Croutons",
    },
    {
      name: "YogurtWorld",
      campusSection: "Matthews Quad",
      coordinates: "32.879259664458445, -117.23583590634186",
      open: "11:00 AM - 6:00 PM",
      description:
        "YogurtWorld serves self-serve frozen yogurt with a rotating variety of flavors and toppings, ranging from fresh fruit to candy and syrups.",
      imageUrl: "YogurtWorld",
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
      imageUrl: "NorthsideDeliAtSeventhMarket",
    },
    {
      name: "The Bistro",
      campusSection: "Seventh College",
      coordinates: "32.88795846138989, -117.24203413358183",
      open: "11:00 AM - 6:00 PM",
      description:
        "A modern eatery featuring an open kitchen, sushi bar, and an exciting Pacific Rim-inspired menu. Our chefs draw from various Asian cultures to serve up the freshest seafood, crisp greens, local produce inspired vegetarian fare, and noodle dishes.",
      imageUrl: "TheBistro",
    },

    // Warren College (1)
    {
      name: "Cups Coffee",
      campusSection: "Warren College",
      coordinates: "32.881624307303056, -117.2341681890531",
      open: "10:00 AM - 4:00 PM",
      description:
        "Cups Coffee offers espresso drinks, teas, and blended beverages along with pastries, cookies, and light snacks, providing a local café experience on campus.",
      imageUrl: "CupsCoffee",
    },

    // Franklin Antonio Hall (1)
    {
      name: "Crafted @ Minerva's Cafe",
      campusSection: "Franklin Antonio Hall",
      coordinates: "32.88378640052974, -117.23511985777476",
      open: "7:00 AM - 7:00 PM",
      description:
        "Crafted @ Minerva’s Café features locally roasted coffee, espresso drinks, teas, and pastries along with fresh sandwiches, wraps, and grab-and-go meals tailored for students and faculty in Franklin Antonio Hall.",
      imageUrl: "Crafted@MinervasCafe",
    },

    // Geisel Library (1)
    {
      name: "Audrey’s Café",
      campusSection: "Geisel Library",
      coordinates: "32.88112655014455, -117.23757066707627",
      open: "9:00 AM - 7:00 PM",
      description:
        "Audrey’s Café, located inside Geisel Library, serves specialty coffee, teas, and espresso drinks alongside pastries, sandwiches, and light snacks—providing a convenient spot for study breaks and refueling during long library sessions.",
      imageUrl: "AudreysCafe",
    },

    // School of Medicine (1)
    {
      name: "Club Med",
      campusSection: "School of Medicine",
      coordinates: "32.875384764719094, -117.23493966463008",
      open: "7:00 AM - 2:30 PM",
      description:
        "Located in the heart of the School of Medicine, Club Med offers made-to-order salads, sandwiches, flatbread pizzas, soups, lunch combos, and tasty desserts.",
      imageUrl: "ClubMed",
    },

    // North Torrey Pines (1)
    {
      name: "Bella Vista Social Club and Caffé",
      campusSection: "North Torrey Pines",
      coordinates: "32.88919358543328, -117.2439533435603",
      open: "8:00 AM - 6:00 PM",
      description:
        "Bella Vista Social Club and Caffé serves Mediterranean-inspired cuisine with a California twist. The menu features panini, pastas, fresh salads, breakfast plates, pastries, and specialty coffee drinks, along with beer and wine—all enjoyed with sweeping ocean views.",
      imageUrl: "BellaVistaSocialClubandCaffe",
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
