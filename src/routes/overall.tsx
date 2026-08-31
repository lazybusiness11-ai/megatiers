import { createFileRoute } from "@tanstack/react-router";
import { rankedPlayers } from "@/lib/players";
import { CATEGORIES } from "@/lib/tiers";
import { PlayerRow } from "@/components/PlayerRow";
import { CategoryIcon } from "@/components/CategoryIcon";

export const Route = createFileRoute("/overall")({
  head: () => ({
    meta: [
      { title: "Overall Leaderboard — MegaTiers" },
      {
        name: "description",
        content:
          "The combined MegaTiers leaderboard: points from all 8 PvP gamemodes aggregated into one Overall ranking.",
      },
      { property: "og:title", content: "Overall Leaderboard — MegaTiers" },
      {
        property: "og:description",
        content: "Combined Minecraft PvP points ranking across all 8 MegaTiers gamemodes.",
      },
    ],
  }),
  component: OverallPage,
});

function OverallPage() {
  const rows = rankedPlayers("sum");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Overall Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tier placements across all 8 gamemodes converted to points and combined.
        </p>
      </header>

      <div className="space-y-2">
        {rows.map((row, i) => (
          <PlayerRow
            key={row.player.ign}
            rank={i + 1}
            ign={row.player.ign}
            region={row.player.region}
            tier={row.tier}
            points={row.score}
            showTier={false}
          >
            <div className="hidden items-center gap-1 md:flex">
              {CATEGORIES.map((c) => {
                const t = row.player.placements[c.id];
                return (
                  <div
                    key={c.id}
                    title={`${c.name}: ${t ?? "Untiered"}`}
                    className={`flex w-9 flex-col items-center justify-center gap-0.5 rounded-md border border-border/70 py-1 ${
                      t ? "bg-muted" : "opacity-25"
                    }`}
                  >
                    <CategoryIcon id={c.id} className="size-3.5" />
                    <span className="font-display text-[10px] font-bold tabular-nums leading-none">
                      {t ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </PlayerRow>
        ))}
      </div>
    </div>
  );
}
