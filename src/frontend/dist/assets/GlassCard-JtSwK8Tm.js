import { j as jsxRuntimeExports, m as motion, E as cn } from "./index-BocZk3t7.js";
function GlassCard({
  children,
  className,
  glowColor = "none",
  onClick,
  hoverable = true
}) {
  const glowMap = {
    purple: "shadow-glow-purple",
    cyan: "shadow-glow-cyan",
    blue: "shadow-glow-blue",
    none: ""
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: hoverable ? { y: -4, transition: { duration: 0.25 } } : void 0,
      className: cn(
        "rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl",
        glowMap[glowColor],
        className
      ),
      onClick,
      children
    }
  );
}
export {
  GlassCard as G
};
