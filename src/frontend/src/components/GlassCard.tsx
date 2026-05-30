import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue" | "none";
  onClick?: () => void;
  hoverable?: boolean;
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  onClick,
  hoverable = true,
}: GlassCardProps) {
  const glowMap = {
    purple: "shadow-glow-purple",
    cyan: "shadow-glow-cyan",
    blue: "shadow-glow-blue",
    none: "",
  };

  return (
    <motion.div
      whileHover={
        hoverable ? { y: -4, transition: { duration: 0.25 } } : undefined
      }
      className={cn(
        "rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl",
        glowMap[glowColor],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
