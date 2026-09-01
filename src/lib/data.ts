import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TIERS, type Tier } from "./tiers";

export type Category = { id: string; name: string; sort_order: number };
export type TierPointRow = { category_id: string; tier: string; points: number };
export type PlayerRecord = {
  id: string;
  ign: string;
  region: string;
  tested_by: string;
  last_tested: string;
};
export type PlacementRow = {
  player_id: string;
  category_id: string;
  tier: string;
};

export type Board = {
  categories: Category[];
  tierPoints: TierPointRow[];
  players: PlayerRecord[];
  placements: PlacementRow[];
};

export async function fetchBoard(): Promise<Board> {
  const [cats, pts, players, placements] = await Promise.all([
    supabase.from("categories").select("id,name,sort_order").order("sort_order"),
    supabase.from("tier_points").select("category_id,tier,points"),
    supabase.from("players").select("id,ign,region,tested_by,last_tested").order("ign"),
    supabase.from("placements").select("player_id,category_id,tier"),
  ]);
  const err = cats.error || pts.error || players.error || placements.error;
  if (err) throw err;
  return {
    categories: cats.data ?? [],
    tierPoints: pts.data ?? [],
    players: players.data ?? [],
    placements: placements.data ?? [],
  };
}

export function useBoard() {
  return useQuery({ queryKey: ["board"], queryFn: fetchBoard });
}

export const EMPTY_BOARD: Board = {
  categories: [],
  tierPoints: [],
  players: [],
  placements: [],
};

export function pointsOf(board: Board, categoryId: string, tier: string): number {
  return (
    board.tierPoints.find((p) => p.category_id === categoryId && p.tier === tier)?.points ?? 0
  );
}

export function placementsOf(board: Board, playerId: string) {
  const map: Record<string, Tier> = {};
  for (const p of board.placements) {
    if (p.player_id === playerId) map[p.category_id] = p.tier as Tier;
  }
  return map;
}

export function scoreOf(board: Board, playerId: string) {
  return board.placements
    .filter((p) => p.player_id === playerId)
    .reduce((sum, p) => sum + pointsOf(board, p.category_id, p.tier), 0);
}

export function overallTierOf(board: Board, score: number): Tier | "UNRANKED" {
  // thresholds scale with the highest possible score per gamemode
  const maxPerCat = Math.max(
    1,
    ...board.categories.map((c) =>
      Math.max(0, ...TIERS.map((t) => pointsOf(board, c.id, t))),
    ),
  );
  const total = maxPerCat * Math.max(1, board.categories.length);
  const ratios: [number, Tier][] = [
    [0.55, "HT1"],
    [0.42, "LT1"],
    [0.31, "HT2"],
    [0.22, "LT2"],
    [0.15, "HT3"],
    [0.1, "LT3"],
    [0.06, "HT4"],
    [0.035, "LT4"],
    [0.015, "HT5"],
    [0.0001, "LT5"],
  ];
  for (const [r, tier] of ratios) if (score >= total * r) return tier;
  return "UNRANKED";
}

export function rankedPlayers(board: Board) {
  return board.players
    .map((player) => {
      const score = scoreOf(board, player.id);
      return {
        player,
        score,
        tier: overallTierOf(board, score),
        placements: placementsOf(board, player.id),
      };
    })
    .sort((a, b) => b.score - a.score || a.player.ign.localeCompare(b.player.ign));
}

export function categoryBoard(board: Board, categoryId: string) {
  return board.placements
    .filter((p) => p.category_id === categoryId)
    .map((p) => {
      const player = board.players.find((pl) => pl.id === p.player_id)!;
      return { player, tier: p.tier as Tier, points: pointsOf(board, categoryId, p.tier) };
    })
    .filter((r) => r.player)
    .sort((a, b) => b.points - a.points || a.player.ign.localeCompare(b.player.ign));
}

export function findPlayer(board: Board, ign: string) {
  return board.players.find((p) => p.ign.toLowerCase() === ign.toLowerCase());
}
