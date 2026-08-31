import { createFileRoute, notFound } from "@tanstack/react-router";
import { findPlayer, scoreOf } from "@/lib/players";
import {
  CATEGORIES,
  TIER_POINTS,
  bodyUrl,
  overallTier,
  type Tier,
} from "@/lib/tiers";
import { TierBadge } from "@/components/TierBadge";
import { CategoryIcon } from "@/components/CategoryIcon";

export const Route = createFileRoute("/player/$ign")({
  loader: ({ params }) => {
    const player = findPlayer(params.ign);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Player not found — MegaTiers" }, { name: "robots", content: "noindex" }],
      };
    const t = `${loaderData.player.ign} — MegaTiers Profile`;
    const d = `${loaderData.player.ign}'s Minecraft PvP tier placements and Overall score across all 8 MegaTiers gamemodes.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: PlayerPage,
});

function PlayerPage() {
  const { player } = Route.useLoaderData();
  const score = scoreOf(player, "sum");
  const tier = overallTier(score);

  return (
    <div className="space-y-8">
      <header className="surface-card flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start">
        <img
          src={bodyUrl(player.ign, 256)}
          alt={`${player.ign} Minecraft skin`}
          className="h-48 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold">{player.ign}</h1>
          <p className="mt-1 break-all font-mono text-xs text-muted-foreground">{player.uuid}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <div className="rounded-lg border border-border bg-muted px-4 py-2">
              <p className="text-xs text-muted-foreground">Overall score</p>
              <p className="font-display text-2xl font-bold tabular-nums">{score}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted px-4 py-2">
              <p className="text-xs text-muted-foreground">Overall tier</p>
              <div className="mt-1">
                <TierBadge tier={tier} />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted px-4 py-2">
              <p className="text-xs text-muted-foreground">Region</p>
              <p className="font-display text-lg font-bold">{player.region}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Last tested {player.lastTested} · tested by {player.testedBy}
          </p>
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Category breakdown</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const t = player.placements[c.id] as Tier | undefined;
            return (
              <div
                key={c.id}
                className={`flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-4 py-3 ${
                  t ? "" : "opacity-50"
                }`}
              >
                <CategoryIcon id={c.id} className="size-5" />
                <span className="font-medium">{c.name}</span>
                <span className="ml-auto font-display text-sm font-bold tabular-nums text-muted-foreground">
                  {t ? TIER_POINTS[t] : 0} pts
                </span>
                <TierBadge tier={t ?? "Untiered"} />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Placement history</h2>
        <ol className="surface-card divide-y divide-border/70 text-sm">
          {CATEGORIES.filter((c) => player.placements[c.id]).map((c) => (
            <li key={c.id} className="flex items-center gap-3 p-3">
              <CategoryIcon id={c.id} className="size-4" />
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">
                placed {player.placements[c.id]}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {player.lastTested}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
