import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  const [minCats, setMinCats] = useState(1);
  const rows = useMemo(
    () =>
      rankedPlayers("sum").filter(
        (r) => Object.keys(r.player.placements).length >= minCats,
      ),
    [minCats],
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Overall Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tier placements across all 8 gamemodes converted to points and combined.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Min. categories
          <select
            value={minCats}
            onChange={(e) => setMinCats(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1.5 text-foreground outline-none focus:border-primary"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-2">
        {rows.map((row, i) => (
          <PlayerRow
            key={row.player.ign}
            rank={i + 1}
            ign={row.player.ign}
            region={row.player.region}
            tier={row.tier}
            points={row.score}
          >
            <div className="hidden items-center gap-1 md:flex">
              {CATEGORIES.map((c) => {
                const t = row.player.placements[c.id];
                return (
                  <span
                    key={c.id}
                    title={`${c.name}: ${t ?? "Untiered"}`}
                    className={`flex size-7 items-center justify-center rounded-md border border-border/70 ${
                      t ? "bg-muted" : "opacity-25"
                    }`}
                  >
                    <CategoryIcon id={c.id} className="size-3.5" />
                  </span>
                );
              })}
            </div>
          </PlayerRow>
        ))}
      </div>
    </div>
  );
}
