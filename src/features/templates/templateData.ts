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
      { id: "spiderman-1", title: "Spider-Man" },
      { id: "spiderman-2", title: "Green Goblin" },
      { id: "spiderman-3", title: "Doctor Octopus" },
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
      { id: "basketball", title: "Basketball" },
      { id: "football", title: "Football" },
      { id: "tennis", title: "Tennis" },
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
      { id: "apple-pie", title: "Apple pie" },
      { id: "chocolate-cake", title: "Chocolate cake" },
      { id: "ice-cream", title: "Ice cream" },
    ],
  },
];
