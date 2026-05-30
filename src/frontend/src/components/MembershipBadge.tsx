import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/types";

interface MembershipBadgeProps {
  tier: MembershipTier;
  className?: string;
}

const tierStyles: Record<MembershipTier, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Premium:
    "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30",
  VIP: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30",
};

export function MembershipBadge({ tier, className }: MembershipBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tierStyles[tier],
        className,
      )}
    >
      {tier}
    </span>
  );
}
