export type MenuCategory =
  | "Breakfast & Brunch"
  | "Bowls & Salads"
  | "Soups & Comfort"
  | "Coffee & Drinks"
  | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  image: string;
  badge?: string;
  tags: string[];
  accent: string;
};

export const menuCategories: Array<MenuCategory | "All"> = [
  "All",
  "Breakfast & Brunch",
  "Bowls & Salads",
  "Soups & Comfort",
  "Coffee & Drinks",
  "Desserts",
];

export const menuItems: MenuItem[] = [
  {
    id: "avocado-toast",
    name: "Sourdough Avocado Toast",
    description: "Silky avocado, soft egg, garden greens and a bright chilli finish on toasted sourdough.",
    category: "Breakfast & Brunch",
    price: 499,
    image: "/assets/freshcrave/toast.webp",
    badge: "TFC favourite",
    tags: ["Vegetarian", "Breakfast"],
    accent: "#d6e1bf",
  },
  {
    id: "harvest-bowl",
    name: "Emerald Harvest Bowl",
    description: "Roasted seasonal vegetables, greens, grains, hummus and citrus in a bowl that eats like sunshine.",
    category: "Bowls & Salads",
    price: 649,
    image: "/assets/freshcrave/bowl.webp",
    badge: "Fresh today",
    tags: ["Vegan", "Gluten-free"],
    accent: "#d7e1c8",
  },
  {
    id: "emerald-arborio",
    name: "Emerald Arborio",
    description: "Creamy arborio rice folded with greens, herbs and parmesan for an indulgent green plate.",
    category: "Soups & Comfort",
    price: 699,
    image: "/assets/freshcrave/bowl.webp",
    badge: "Chef's note",
    tags: ["Vegetarian", "Comfort"],
    accent: "#c9d8be",
  },
  {
    id: "carrot-veloute",
    name: "Roasted Carrot & Ginger Velouté",
    description: "Slow-roasted carrots, fresh ginger, toasted seeds and a silky, warming finish.",
    category: "Soups & Comfort",
    price: 399,
    image: "/assets/freshcrave/carrot-soup.webp",
    tags: ["Vegan", "Seasonal"],
    accent: "#f0d5b8",
  },
  {
    id: "coconut-espresso",
    name: "Coconut Espresso Cooler",
    description: "A chilled espresso pour with coconut cream — bright, smooth and made for warm afternoons.",
    category: "Coffee & Drinks",
    price: 349,
    image: "/assets/freshcrave/coffee.webp",
    badge: "New pour",
    tags: ["Cold coffee", "TFC twist"],
    accent: "#e8d8c8",
  },
  {
    id: "pistachio-affogato",
    name: "Pistachio Affogato",
    description: "Pistachio gelato, a hot espresso pour and just enough crunch to keep you coming back.",
    category: "Desserts",
    price: 449,
    image: "/assets/freshcrave/coffee.webp",
    badge: "Little indulgence",
    tags: ["Dessert", "Coffee"],
    accent: "#e2d8c3",
  },
];

export const weekendSpecials = [
  { title: "Weekend Family Table", copy: "A generous spread for long lunches, easy hosting and very good leftovers.", label: "Pre-order menu" },
  { title: "Brunch, slowly", copy: "Open toasts, bright bowls and coffee designed for the late risers.", label: "Every weekend" },
  { title: "Little gifts, big cravings", copy: "Thoughtful dessert boxes and coffee pairings for sending some joy.", label: "Seasonal" },
];

export const businessPlaceholders = {
  city: "Mumbai, Maharashtra",
  hours: "Official hours coming soon",
  delivery: "Delivery areas to be confirmed",
  phone: "+91 00000 00000",
  whatsapp: "WhatsApp ordering coming soon",
};
