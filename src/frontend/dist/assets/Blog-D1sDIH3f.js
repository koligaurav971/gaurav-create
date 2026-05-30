import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { N as Newspaper } from "./newspaper-CftbUNrU.js";
import { A as ArrowRight } from "./arrow-right-CN8A78oi.js";
const posts = [
  {
    id: "1",
    title: "Building the Future of Creator Platforms",
    date: "May 2026",
    excerpt: "How Gaurav.Create is redefining digital creation."
  },
  {
    id: "2",
    title: "Cyberpunk UI Design Principles",
    date: "Apr 2026",
    excerpt: "Neon, glassmorphism, and immersive interfaces."
  },
  {
    id: "3",
    title: "Community First: Why We Built a Chat System",
    date: "Mar 2026",
    excerpt: "Real-time connection for creators and fans."
  }
];
function Blog() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground md:text-4xl", children: "Blog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Updates, insights, and behind-the-scenes from the creator." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/blog/${post.id}`, "data-ocid": `blog.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex items-start gap-4 p-5 transition-colors hover:bg-card/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: post.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-0.5 font-semibold text-foreground", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: post.excerpt })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "mt-2 h-4 w-4 shrink-0 text-muted-foreground" })
        ] }) })
      },
      post.id
    )) })
  ] }) });
}
export {
  Blog as default
};
