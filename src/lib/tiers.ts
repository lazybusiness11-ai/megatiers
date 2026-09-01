export const TIERS = [
  "HT1",
  "LT1",
  "HT2",
  "LT2",
  "HT3",
  "LT3",
  "HT4",
  "LT4",
  "HT5",
  "LT5",
] as const;

export type Tier = (typeof TIERS)[number];

export const TIER_POINTS: Record<Tier, number> = {
  HT1: 60,
  LT1: 45,
  HT2: 30,
  LT2: 20,
  HT3: 10,
  LT3: 6,
  HT4: 4,
  LT4: 3,
  HT5: 2,
  LT5: 1,
};

export type CategoryId =
  | "sword"
  | "cart"
  | "lightspeed"
  | "mace"
  | "spearmace"
  | "diasmp"
  | "smp"
  | "ogv"
  | "uhc";

export type Category = {
  id: CategoryId;
  name: string;
  icon: string;
  accent: string; // css var name suffix
};

export const CATEGORIES: Category[] = [
  { id: "sword", name: "Sword", icon: "Swords", accent: "cat-sword" },
  { id: "cart", name: "Cart", icon: "TramFront", accent: "cat-cart" },
  { id: "lightspeed", name: "Lightspeed", icon: "Zap", accent: "cat-lightspeed" },
  { id: "mace", name: "Mace", icon: "Hammer", accent: "cat-mace" },
  { id: "spearmace", name: "Spearmace", icon: "Crosshair", accent: "cat-spearmace" },
  { id: "diasmp", name: "Diasmp", icon: "Gem", accent: "cat-diasmp" },
  { id: "smp", name: "Smp", icon: "Shield", accent: "cat-smp" },
  { id: "ogv", name: "Ogv", icon: "Leaf", accent: "cat-ogv" },
  { id: "uhc", name: "UHC", icon: "Apple", accent: "cat-uhc" },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;

export type ScoringMethod = "sum" | "average" | "best4";

export function overallScore(
  placements: Partial<Record<CategoryId, Tier>>,
  method: ScoringMethod = "sum",
): number {
  const pts = Object.values(placements).map((t) => TIER_POINTS[t as Tier]);
  if (pts.length === 0) return 0;
  if (method === "sum") return pts.reduce((a, b) => a + b, 0);
  if (method === "average")
    return Math.round(pts.reduce((a, b) => a + b, 0) / pts.length);
  return pts
    .sort((a, b) => b - a)
    .slice(0, 4)
    .reduce((a, b) => a + b, 0);
}

const OVERALL_THRESHOLDS: [number, Tier][] = [
  [250, "HT1"],
  [190, "LT1"],
  [140, "HT2"],
  [100, "LT2"],
  [70, "HT3"],
  [45, "LT3"],
  [28, "HT4"],
  [16, "LT4"],
  [8, "HT5"],
  [1, "LT5"],
];

export function overallTier(score: number): Tier | "UNRANKED" {
  for (const [min, tier] of OVERALL_THRESHOLDS) if (score >= min) return tier;
  return "UNRANKED";
}

export function tierGroupLabel(tier: Tier) {
  return `Tier ${tier[2]}`;
}

export function headUrl(ign: string, size = 64) {
  return `https://mc-heads.net/avatar/${encodeURIComponent(ign)}/${size}`;
}

export function bodyUrl(ign: string, size = 256) {
  return `https://mc-heads.net/body/${encodeURIComponent(ign)}/${size}`;
}
