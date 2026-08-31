import { Link } from "@tanstack/react-router";
import { headUrl, type Tier } from "@/lib/tiers";
import { TierBadge } from "./TierBadge";

export function PlayerRow({
  rank,
  ign,
  region,
  tier,
  points,
  meta,
  children,
}: {
  rank: number;
  ign: string;
  region?: string;
  tier: Tier | "UNRANKED";
  points: number;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      to="/player/$ign"
      params={{ ign }}
      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-3 py-2.5 transition-colors hover:border-primary/60 hover:bg-card"
    >
      <span className="w-8 shrink-0 text-right font-display text-sm font-bold tabular-nums text-muted-foreground">
        {rank}
      </span>
      <img
        src={headUrl(ign, 64)}
        alt={`${ign} Minecraft skin head`}
        loading="lazy"
        className="size-8 shrink-0 rounded-md bg-muted"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{ign}</p>
        {meta ? (
          <p className="truncate text-xs text-muted-foreground">{meta}</p>
        ) : null}
      </div>
      {children}
      {region ? (
        <span className="hidden rounded border border-border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline">
          {region}
        </span>
      ) : null}
      <span className="w-12 text-right font-display text-sm font-bold tabular-nums text-foreground">
        {points}
      </span>
      <TierBadge tier={tier} />
    </Link>
  );
}
