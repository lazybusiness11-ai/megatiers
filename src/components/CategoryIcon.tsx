import {
  Swords,
  TramFront,
  Zap,
  Hammer,
  Crosshair,
  Gem,
  Shield,
  Leaf,
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
