import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight, Activity } from "lucide-react";
import { CATEGORIES, CATEGORY_MAP, headUrl } from "@/lib/tiers";
import { ACTIVITY, PLAYERS, categoryBoard, rankedPlayers } from "@/lib/players";
import { PlayerRow } from "@/components/PlayerRow";
import { TierBadge } from "@/components/TierBadge";
import { CategoryIcon } from "@/components/CategoryIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MegaTiers — Minecraft PvP Tier List & Rankings" },
      {
        name: "description",
        content:
          "MegaTiers ranks Minecraft PvP players across 8 gamemodes plus a combined Overall points leaderboard.",
      },
      { property: "og:title", content: "MegaTiers — Minecraft PvP Tier List" },
      {
        property: "og:description",
        content:
          "Tier rankings for Sword, Cart, Lightspeed, Mace, Spearmace, Diasmp, Smp and Ogv, plus the Overall leaderboard.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const top = useMemo(() => rankedPlayers("sum").slice(0, 8), []);
  const matches = useMemo(
    () =>
      q.trim()
        ? PLAYERS.filter((p) => p.ign.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5)
        : [],
    [q],
  );

  return (
    <div className="space-y-12">
      <section className="pt-6 text-center sm:pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Minecraft PvP Rankings
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">
          Every gamemode. <span className="text-primary">One</span> leaderboard.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          MegaTiers tests players across 8 PvP gamemodes and converts every tier
          placement into points for a single Overall ranking.
        </p>

        <div className="relative mx-auto mt-7 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a Minecraft username…"
            aria-label="Search player"
            className="w-full rounded-xl border border-border bg-card/70 py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          {matches.length > 0 && (
            <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover text-left shadow-[var(--shadow-elevated)]">
              {matches.map((p) => (
                <li key={p.ign}>
                  <Link
                    to="/player/$ign"
                    params={{ ign: p.ign }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-accent"
                  >
                    <img src={headUrl(p.ign, 32)} alt="" className="size-6 rounded" />
                    <span className="text-sm font-medium">{p.ign}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{p.region}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Gamemodes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const leader = categoryBoard(c.id)[0];
            return (
              <Link
                key={c.id}
                to="/category/$category"
                params={{ category: c.id }}
                className="surface-card group p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <CategoryIcon id={c.id} className="size-5" />
                  <span className="font-display font-semibold">{c.name}</span>
                  <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
                {leader && (
                  <div className="mt-3 flex items-center gap-2 border-t border-border/70 pt-3">
                    <img src={headUrl(leader.player.ign, 32)} alt="" className="size-6 rounded" />
                    <span className="truncate text-sm font-medium">{leader.player.ign}</span>
                    <span className="ml-auto">
                      <TierBadge tier={leader.tier} size="sm" />
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Overall</h2>
            <Link to="/overall" className="text-sm text-primary hover:underline">
              Full leaderboard
            </Link>
          </div>
          <div className="space-y-2">
            {top.map((row, i) => (
              <PlayerRow
                key={row.player.ign}
                rank={i + 1}
                ign={row.player.ign}
                region={row.player.region}
                tier={row.tier}
                points={row.score}
                meta={`${Object.keys(row.player.placements).length} categories ranked`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Activity className="size-4 text-primary" /> Recent changes
          </h2>
          <ul className="surface-card divide-y divide-border/70">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-center gap-3 p-3">
                <img src={headUrl(a.ign, 32)} alt="" className="size-7 rounded" />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate">
                    <span className="font-semibold">{a.ign}</span>{" "}
                    <span className="text-muted-foreground">
                      {a.from} → {a.to} in {CATEGORY_MAP[a.category].name}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
