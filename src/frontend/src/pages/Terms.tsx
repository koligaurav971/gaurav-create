import { GlassCard } from "@/components/GlassCard";
import { motion } from "motion/react";

export default function Terms() {
  return (
    <div className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Terms of Service
          </h1>
          <GlassCard className="mt-6 p-6">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">1. Acceptance</strong>
                <br />
                By using Gaurav.Create, you agree to these terms. If you do not
                agree, please do not use the platform.
              </p>
              <p>
                <strong className="text-foreground">2. Content</strong>
                <br />
                Projects and content are provided for personal and commercial
                use as specified per project license. Redistribution without
                permission is prohibited.
              </p>
              <p>
                <strong className="text-foreground">3. Conduct</strong>
                <br />
                Users must respect community guidelines. Harassment, spam, and
                illegal activity will result in moderation action.
              </p>
              <p>
                <strong className="text-foreground">4. Changes</strong>
                <br />
                Terms may be updated periodically. Continued use constitutes
                acceptance of changes.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
