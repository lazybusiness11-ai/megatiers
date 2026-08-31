import type { Tier } from "@/lib/tiers";

const styles: Record<string, string> = {
  "1": "border-tier-1/50 text-tier-1 bg-tier-1/10",
  "2": "border-tier-2/50 text-tier-2 bg-tier-2/10",
  "3": "border-tier-3/50 text-tier-3 bg-tier-3/10",
  "4": "border-tier-4/50 text-tier-4 bg-tier-4/10",
  "5": "border-tier-5/50 text-tier-5 bg-tier-5/10",
};

export function TierBadge({
  tier,
  size = "md",
}: {
  tier: Tier | "UNRANKED" | "Untiered";
  size?: "sm" | "md";
}) {
  if (tier === "UNRANKED" || tier === "Untiered") {
    return (
      <span className="inline-flex items-center rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
        Untiered
      </span>
    );
  }
  const cls = styles[tier[2]] ?? styles["5"];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-display font-bold tabular-nums ${cls} ${
        size === "sm" ? "text-[11px]" : "text-xs"
      }`}
    >
      <span className="opacity-70">{tier.slice(0, 2)}</span>
      <span>{tier[2]}</span>
    </span>
  );
}
