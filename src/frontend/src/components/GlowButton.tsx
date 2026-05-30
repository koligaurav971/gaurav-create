import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "cyan" | "purple" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function GlowButton({
  children,
  variant = "cyan",
  size = "md",
  onClick,
  href,
  disabled,
  className,
  type = "button",
}: GlowButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

  const variants = {
    cyan: "bg-primary text-primary-foreground shadow-glow hover:shadow-glow-lg hover:brightness-110",
    purple: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "text-foreground hover:bg-muted",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={classes}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
