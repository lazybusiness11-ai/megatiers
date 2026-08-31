import { createFileRoute } from "@tanstack/react-router";
import { TIERS, TIER_POINTS } from "@/lib/tiers";
import { TierBadge } from "@/components/TierBadge";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "How Tiers & Points Work — MegaTiers" },
      {
        name: "description",
        content:
          "How MegaTiers testing works, what each tier means, and how Overall points are calculated across the 8 gamemodes.",
      },
      { property: "og:title", content: "How Tiers & Points Work — MegaTiers" },
      {
        property: "og:description",
        content: "The MegaTiers methodology: testing, tier badges and the Overall points system.",
      },
    ],
  }),
  component: InfoPage,
});

function InfoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold">How it works</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything about MegaTiers testing, tiers and the Overall points system.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Testing</h2>
        <p className="text-sm text-muted-foreground">
          Players are evaluated by the tester panel through 1v1 tests, tournament
          results and submitted clips. Each test results in a placement between
          High Tier 1 (HT1) and Low Tier 5 (LT5) in a single gamemode. Inactive
          players are marked retired and untested players stay untiered.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Points table</h2>
        <div className="surface-card divide-y divide-border/70">
          {TIERS.map((t) => (
            <div key={t} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <TierBadge tier={t} />
              <span className="text-muted-foreground">{t}</span>
              <span className="ml-auto font-display font-bold tabular-nums">
                {TIER_POINTS[t]} pts
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
            <TierBadge tier="Untiered" />
            <span className="ml-auto font-display font-bold tabular-nums">0 pts</span>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Overall score</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Sum (default):</strong> all points
            from the 8 categories added together — rewards versatility.
          </li>
          <li>
            <strong className="text-foreground">Average:</strong> mean of the
            categories a player is actually tiered in — friendly to specialists.
          </li>
          <li>
            <strong className="text-foreground">Best 4:</strong> only the four
            highest category scores count.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          The resulting score is bucketed into Overall Tiers so the Overall page
          reads exactly like a gamemode page.
        </p>
      </section>
    </div>
  );
}
