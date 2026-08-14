export type RankingItem = {
  id: string;
  title: string;
};

export type Tier = {
  id: string;
  name: string;
  items: RankingItem[];
};

export type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  tiers: Tier[];
  unrankedItems: RankingItem[];
};
