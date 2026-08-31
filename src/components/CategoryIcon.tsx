import {
  Swords,
  TramFront,
  Zap,
  Hammer,
  Crosshair,
  Gem,
  Shield,
  Leaf,
  Apple,
  type LucideProps,
} from "lucide-react";
import type { CategoryId } from "@/lib/tiers";

const icons: Record<CategoryId, React.ComponentType<LucideProps>> = {
  sword: Swords,
  cart: TramFront,
  lightspeed: Zap,
  mace: Hammer,
  spearmace: Crosshair,
  diasmp: Gem,
  smp: Shield,
  ogv: Leaf,
  uhc: Apple,
};

const colors: Record<CategoryId, string> = {
  sword: "text-cat-sword",
  cart: "text-cat-cart",
  lightspeed: "text-cat-lightspeed",
  mace: "text-cat-mace",
  spearmace: "text-cat-spearmace",
  diasmp: "text-cat-diasmp",
  smp: "text-cat-smp",
  ogv: "text-cat-ogv",
  uhc: "text-cat-uhc",
};

export function CategoryIcon({
  id,
  className = "size-4",
}: {
  id: CategoryId;
  className?: string;
}) {
  const Icon = icons[id];
  return <Icon className={`${colors[id]} ${className}`} />;
}
