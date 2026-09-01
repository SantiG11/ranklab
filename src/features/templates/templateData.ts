import type { Template } from "./templateTypes";

export const templates: Template[] = [
  {
    id: "spiderman-movies",
    title: "Spider-Man Movies",
    description:
      "Rank Spider-Man movies based on story, characters, action, and personal preference.",
    category: "Movies",
    tiers: [
      { id: "tier-s", name: "S", color: "tier-s", items: [] },
      { id: "tier-a", name: "A", color: "tier-a", items: [] },
      { id: "tier-b", name: "B", color: "tier-b", items: [] },
      { id: "tier-c", name: "C", color: "tier-c", items: [] },
      { id: "tier-d", name: "D", color: "tier-d", items: [] },
    ],
    unrankedItems: [
      { id: "spiderman-2002", title: "Spider-Man" },
      { id: "spiderman-2", title: "Spider-Man 2" },
      { id: "spiderman-3", title: "Spider-Man 3" },
      { id: "the-amazing-spiderman", title: "The Amazing Spider-Man" },
      { id: "the-amazing-spiderman-2", title: "The Amazing Spider-Man 2" },
      { id: "spiderman-homecoming", title: "Spider-Man: Homecoming" },
      { id: "spiderman-far-from-home", title: "Spider-Man: Far From Home" },
      { id: "spiderman-no-way-home", title: "Spider-Man: No Way Home" },
      {
        id: "spiderman-into-the-spider-verse",
        title: "Spider-Man: Into the Spider-Verse",
      },
      {
        id: "spiderman-across-the-spider-verse",
        title: "Spider-Man: Across the Spider-Verse",
      },
    ],
  },
  {
    id: "favourite-sports",
    title: "Favourite Sports",
    description:
      "Rank sports based on how much you enjoy watching or playing them.",
    category: "Sports",
    tiers: [
      { id: "tier-s", name: "S", color: "tier-s", items: [] },
      { id: "tier-a", name: "A", color: "tier-a", items: [] },
      { id: "tier-b", name: "B", color: "tier-b", items: [] },
      { id: "tier-c", name: "C", color: "tier-c", items: [] },
      { id: "tier-d", name: "D", color: "tier-d", items: [] },
    ],
    unrankedItems: [
      { id: "football", title: "Football" },
      { id: "basketball", title: "Basketball" },
      { id: "tennis", title: "Tennis" },
      { id: "formula-1", title: "Formula 1" },
      { id: "boxing", title: "Boxing" },
      { id: "volleyball", title: "Volleyball" },
      { id: "swimming", title: "Swimming" },
      { id: "cycling", title: "Cycling" },
      { id: "rugby", title: "Rugby" },
      { id: "baseball", title: "Baseball" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    description:
      "Rank desserts based on taste, texture, nostalgia, or personal preference.",
    category: "Food",
    tiers: [
      { id: "tier-s", name: "S", color: "tier-s", items: [] },
      { id: "tier-a", name: "A", color: "tier-a", items: [] },
      { id: "tier-b", name: "B", color: "tier-b", items: [] },
      { id: "tier-c", name: "C", color: "tier-c", items: [] },
      { id: "tier-d", name: "D", color: "tier-d", items: [] },
    ],
    unrankedItems: [
      { id: "ice-cream", title: "Ice Cream" },
      { id: "chocolate-cake", title: "Chocolate Cake" },
      { id: "apple-pie", title: "Apple Pie" },
      { id: "brownie", title: "Brownie" },
      { id: "cheesecake", title: "Cheesecake" },
      { id: "tiramisu", title: "Tiramisu" },
      { id: "flan", title: "Flan" },
      { id: "churros", title: "Churros" },
      { id: "pancakes", title: "Pancakes" },
      { id: "donuts", title: "Donuts" },
    ],
  },
];
