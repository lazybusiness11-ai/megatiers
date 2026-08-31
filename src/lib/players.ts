import {
  CATEGORIES,
  type CategoryId,
  type ScoringMethod,
  type Tier,
  TIER_POINTS,
  overallScore,
  overallTier,
} from "./tiers";

export type Player = {
  ign: string;
  uuid: string;
  region: "NA" | "EU" | "AS" | "OCE" | "SA";
  placements: Partial<Record<CategoryId, Tier>>;
  lastTested: string;
  testedBy: string;
};

export const PLAYERS: Player[] = [
  {
    ign: "Technoblade",
    uuid: "b876ec32-e396-476b-a115-8438d83c67d4",
    region: "NA",
    placements: { sword: "HT1", ogv: "HT1", smp: "HT1", diasmp: "LT1", cart: "HT2", mace: "LT2", lightspeed: "HT3", spearmace: "LT3" },
    lastTested: "2026-08-21",
    testedBy: "Zephyr",
  },
  {
    ign: "Marlow",
    uuid: "1c3b6f0e-5a5d-4c31-9f2a-2b7f4d1e8a90",
    region: "EU",
    placements: { sword: "HT1", mace: "HT1", spearmace: "LT1", lightspeed: "HT2", smp: "LT2", cart: "HT3" },
    lastTested: "2026-08-19",
    testedBy: "Kaito",
  },
  {
    ign: "Zephyrix",
    uuid: "2d4c7a1f-6b6e-4d42-8e3b-3c8f5e2f9b01",
    region: "EU",
    placements: { lightspeed: "HT1", cart: "LT1", sword: "HT2", ogv: "LT2", mace: "HT4" },
    lastTested: "2026-08-25",
    testedBy: "Nova",
  },
  {
    ign: "Kaitoo",
    uuid: "3e5d8b20-7c7f-4e53-9f4c-4d906f30ac12",
    region: "AS",
    placements: { diasmp: "HT1", smp: "LT1", ogv: "HT2", sword: "LT3", mace: "HT5" },
    lastTested: "2026-08-11",
    testedBy: "Marlow",
  },
  {
    ign: "Frostbyte",
    uuid: "4f6e9c31-8d80-4f64-a05d-5e0170410b23",
    region: "NA",
    placements: { mace: "HT1", spearmace: "HT1", cart: "LT2", sword: "HT3", smp: "LT4" },
    lastTested: "2026-08-28",
    testedBy: "Zephyr",
  },
  {
    ign: "Novaa",
    uuid: "50708d42-9e91-4075-b16e-6f1281521c34",
    region: "OCE",
    placements: { ogv: "HT1", smp: "HT2", diasmp: "LT2", sword: "LT2" },
    lastTested: "2026-07-30",
    testedBy: "Kaito",
  },
  {
    ign: "Skyfall",
    uuid: "61819e53-af02-4186-c27f-702392632d45",
    region: "SA",
    placements: { cart: "HT1", lightspeed: "LT1", spearmace: "HT3", sword: "LT4" },
    lastTested: "2026-08-14",
    testedBy: "Nova",
  },
  {
    ign: "Draveon",
    uuid: "7292af64-b013-4297-d380-813403743e56",
    region: "EU",
    placements: { spearmace: "HT2", mace: "LT2", diasmp: "HT3", ogv: "LT3", cart: "HT5" },
    lastTested: "2026-08-06",
    testedBy: "Marlow",
  },
  {
    ign: "Pyreon",
    uuid: "83a3b075-c124-43a8-e491-924514854f67",
    region: "NA",
    placements: { sword: "LT1", smp: "HT2", ogv: "HT3", lightspeed: "LT4" },
    lastTested: "2026-08-23",
    testedBy: "Zephyr",
  },
  {
    ign: "Halcyonn",
    uuid: "94b4c186-d235-44b9-f5a2-a35625965078",
    region: "AS",
    placements: { lightspeed: "HT2", cart: "HT2", sword: "HT4", mace: "LT5" },
    lastTested: "2026-08-02",
    testedBy: "Kaito",
  },
  {
    ign: "Vantablack",
    uuid: "a5c5d297-e346-45ca-06b3-b46736076189",
    region: "EU",
    placements: { diasmp: "HT2", smp: "LT2", ogv: "LT2", spearmace: "HT4" },
    lastTested: "2026-07-27",
    testedBy: "Nova",
  },
  {
    ign: "Quartzz",
    uuid: "b6d6e3a8-f457-46db-17c4-c57847187290",
    region: "NA",
    placements: { mace: "HT3", sword: "HT3", cart: "LT3", lightspeed: "LT5" },
    lastTested: "2026-08-17",
    testedBy: "Marlow",
  },
  {
    ign: "Emberlyn",
    uuid: "c7e7f4b9-0568-47ec-28d5-d68958298301",
    region: "OCE",
    placements: { smp: "HT3", ogv: "LT3", diasmp: "HT4" },
    lastTested: "2026-08-09",
    testedBy: "Zephyr",
  },
  {
    ign: "Sableon",
    uuid: "d8f805ca-1679-48fd-39e6-e79a693a9412",
    region: "SA",
    placements: { spearmace: "LT3", mace: "HT4", cart: "LT4", sword: "HT5" },
    lastTested: "2026-07-22",
    testedBy: "Kaito",
  },
  {
    ign: "Ironclad",
    uuid: "e90916db-278a-490e-4af7-8ab7a44ba523",
    region: "EU",
    placements: { smp: "HT4", diasmp: "LT4", ogv: "HT5", sword: "LT5" },
    lastTested: "2026-08-04",
    testedBy: "Nova",
  },
  {
    ign: "Lumenar",
    uuid: "fa1a27ec-389b-4a1f-5b08-9bc8b55cb634",
    region: "AS",
    placements: { lightspeed: "HT4", cart: "HT4", spearmace: "LT5" },
    lastTested: "2026-08-26",
    testedBy: "Marlow",
  },
];

export function scoreOf(p: Player, method: ScoringMethod = "sum") {
  return overallScore(p.placements, method);
}

export function rankedPlayers(method: ScoringMethod = "sum") {
  return [...PLAYERS]
    .map((p) => ({
      player: p,
      score: scoreOf(p, method),
      tier: overallTier(scoreOf(p, method)),
    }))
    .sort((a, b) => b.score - a.score);
}

export function categoryBoard(category: CategoryId) {
  return PLAYERS.filter((p) => p.placements[category])
    .map((p) => ({
      player: p,
      tier: p.placements[category] as Tier,
      points: TIER_POINTS[p.placements[category] as Tier],
    }))
    .sort((a, b) => b.points - a.points || a.player.ign.localeCompare(b.player.ign));
}

export function findPlayer(ign: string) {
  return PLAYERS.find((p) => p.ign.toLowerCase() === ign.toLowerCase());
}

export const ACTIVITY: {
  ign: string;
  category: CategoryId;
  from: Tier | "Untiered";
  to: Tier;
  when: string;
}[] = [
  { ign: "Frostbyte", category: "spearmace", from: "LT1", to: "HT1", when: "2h ago" },
  { ign: "Lumenar", category: "lightspeed", from: "LT4", to: "HT4", when: "9h ago" },
  { ign: "Zephyrix", category: "ogv", from: "Untiered", to: "LT2", when: "1d ago" },
  { ign: "Pyreon", category: "smp", from: "LT2", to: "HT2", when: "2d ago" },
  { ign: "Sableon", category: "cart", from: "HT4", to: "LT4", when: "3d ago" },
  { ign: "Marlow", category: "mace", from: "LT1", to: "HT1", when: "4d ago" },
];

export const ALL_CATEGORIES = CATEGORIES;
