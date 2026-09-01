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

export const PLAYERS: Player[] = [];

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
}[] = [];

export const ALL_CATEGORIES = CATEGORIES;
