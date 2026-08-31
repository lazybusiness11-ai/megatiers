import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/tiers";
import { CategoryIcon } from "./CategoryIcon";
import { Trophy } from "lucide-react";

export function CategoryNav() {
  return (
    <nav className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex min-w-max items-center gap-2">
        <Link
          to="/overall"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
          activeProps={{ className: "border-primary/70 text-foreground bg-primary/10" }}
        >
          <Trophy className="size-4 text-primary" />
          Overall
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            to="/category/$category"
            params={{ category: c.id }}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            activeProps={{ className: "border-primary/70 text-foreground bg-primary/10" }}
          >
            <CategoryIcon id={c.id} className="size-4" />
            {c.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
