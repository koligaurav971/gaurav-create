import { GlassCard } from "@/components/GlassCard";
import { motion } from "motion/react";

export default function Privacy() {
  return (
    <div className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <GlassCard className="mt-6 p-6">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">1. Data Collection</strong>
                <br />
                We collect minimal data required for authentication and platform
                functionality. This includes your Internet Identity principal
                and basic profile information.
              </p>
              <p>
                <strong className="text-foreground">2. Usage</strong>
                <br />
                Your data is used solely to provide platform services, including
                project access, chat, and membership features.
              </p>
              <p>
                <strong className="text-foreground">3. Cookies</strong>
                <br />
                We use essential cookies for session management. No third-party
                tracking cookies are used.
              </p>
              <p>
                <strong className="text-foreground">4. Contact</strong>
                <br />
                For privacy concerns, reach out via Discord or Instagram.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
