import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categoryBoard } from "@/lib/players";
import { CATEGORY_MAP, TIERS, type CategoryId, type Tier } from "@/lib/tiers";
import { PlayerRow } from "@/components/PlayerRow";
import { CategoryIcon } from "@/components/CategoryIcon";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const cat = CATEGORY_MAP[params.category as CategoryId];
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Unavailable — MegaTiers" }, { name: "robots", content: "noindex" }],
      };
    const t = `${loaderData.cat.name} Tier List — MegaTiers`;
    const d = `${loaderData.cat.name} Minecraft PvP rankings: every tiered player from HT1 to LT5.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const board = useMemo(() => categoryBoard(cat.id), [cat.id]);
  const rows = board.filter(
    (r) =>
      r.player.ign.toLowerCase().includes(search.toLowerCase()) &&
      (tierFilter === "all" || r.tier === tierFilter),
  );

  const groups = TIERS.map((t) => ({
    tier: t as Tier,
    rows: rows.filter((r) => r.tier === t),
  })).filter((g) => g.rows.length > 0);

  let rank = 0;

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-card">
          <CategoryIcon id={cat.id} className="size-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold">{cat.name}</h1>
        </div>
      </header>

      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search player…"
          className="flex-1 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="all">All tiers</option>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {groups.map((g) => (
        <section key={g.tier}>
          <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {g.tier}
          </h2>
          <div className="space-y-2">
            {g.rows.map((r) => {
              rank += 1;
              return (
                <PlayerRow
                  key={r.player.ign}
                  rank={rank}
                  ign={r.player.ign}
                  region={r.player.region}
                  tier={r.tier}
                  points={r.points}
                  meta={`Last tested ${r.player.lastTested} · by ${r.player.testedBy}`}
                />
              );
            })}
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <p className="text-sm text-muted-foreground">No players match this filter.</p>
      )}
    </div>
  );
}
