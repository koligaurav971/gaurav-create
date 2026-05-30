import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { membershipPlans } from "@/types";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Membership() {
  return (
    <div className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Memberships
          </h1>
          <p className="mt-2 text-muted-foreground">
            Unlock premium features and join exclusive creator spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {membershipPlans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard
                glowColor={plan.isPopular ? "purple" : "none"}
                className="relative flex h-full flex-col p-6"
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow">
                    Most Popular
                  </div>
                )}
                {plan.comingSoon && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                    <Sparkles className="h-3 w-3" /> Coming Soon
                  </div>
                )}

                <h3 className="font-display text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-2 font-display text-3xl font-bold text-primary">
                  {plan.price}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <GlowButton
                  variant={plan.isPopular ? "cyan" : "ghost"}
                  className="mt-6 w-full"
                  disabled={plan.comingSoon}
                  data-ocid={`membership.${plan.tier.toLowerCase()}_button`}
                >
                  {plan.comingSoon ? "Coming Soon" : "Choose Plan"}
                </GlowButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
