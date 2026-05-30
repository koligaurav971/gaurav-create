import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            G
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Loading universe...</p>
      </motion.div>
    </div>
  );
}
