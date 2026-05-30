import { c as createLucideIcon, a as reactExports, u as useAuth, j as jsxRuntimeExports, m as motion, G as GlowButton, L as Link, p as projectCategories } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { b as useProjects, u as useFeaturedProjects } from "./useBackend-CdNmdtmR.js";
import { u as ue } from "./index-DagESB4a.js";
import { C as ChevronRight, T as Trash2 } from "./trash-2-dSFMbR3t.js";
import { E as Eye } from "./eye-B71W905d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function getCategoryGradient(category) {
  const map = {
    "Web Dev": "from-primary/20 to-secondary/20",
    "UI Design": "from-accent/20 to-primary/20",
    Templates: "from-secondary/20 to-accent/20",
    Motion: "from-primary/15 to-destructive/15",
    Tools: "from-secondary/15 to-primary/15"
  };
  return map[category] || "from-primary/15 to-accent/15";
}
function Marketplace() {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const { data: allProjects = [], isLoading } = useProjects(category);
  const { data: featured = [] } = useFeaturedProjects();
  const { profile } = useAuth();
  const isOwner = (profile == null ? void 0 : profile.isOwner) ?? false;
  const filtered = allProjects.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase())
  );
  const trending = allProjects.filter((p) => p.isTrending);
  const scrollRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [startX, setStartX] = reactExports.useState(0);
  const [scrollLeft, setScrollLeft] = reactExports.useState(0);
  const handleMouseDown = (e) => {
    var _a, _b;
    setIsDragging(true);
    setStartX(e.pageX - (((_a = scrollRef.current) == null ? void 0 : _a.offsetLeft) ?? 0));
    setScrollLeft(((_b = scrollRef.current) == null ? void 0 : _b.scrollLeft) ?? 0);
  };
  const handleMouseMove = (e) => {
    var _a;
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (((_a = scrollRef.current) == null ? void 0 : _a.offsetLeft) ?? 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  reactExports.useEffect(() => {
    const el = scrollRef.current;
    if (!el || featured.length <= 1) return;
    const interval = setInterval(() => {
      if (isDragging) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 4e3);
    return () => clearInterval(interval);
  }, [featured.length, isDragging]);
  const scrollFeatured = (dir) => {
    var _a;
    (_a = scrollRef.current) == null ? void 0 : _a.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold md:text-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow-purple", children: "PROJECT MARKETPLACE" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-muted-foreground", children: "Discover premium digital creations" })
          ] }),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlowButton,
            {
              variant: "cyan",
              className: "gap-2",
              onClick: () => ue.info("Project upload coming soon"),
              "data-ocid": "marketplace.add_project_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add Project"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search projects...",
          "data-ocid": "marketplace.search_input",
          className: "w-full rounded-xl border border-white/10 bg-card/60 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        }
      )
    ] }),
    featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Featured" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => scrollFeatured("left"),
              className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
              "data-ocid": "marketplace.carousel_prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => scrollFeatured("right"),
              className: "rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
              "data-ocid": "marketplace.carousel_next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseUp,
          className: "flex gap-4 overflow-x-auto pb-2 scrollbar-hide",
          style: {
            scrollSnapType: "x mandatory",
            cursor: isDragging ? "grabbing" : "grab"
          },
          children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: `/project/${p.id}`,
              className: "shrink-0",
              style: { scrollSnapAlign: "start" },
              "data-ocid": `marketplace.featured.${p.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  glowColor: "cyan",
                  className: "w-72 overflow-hidden md:w-80",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-48 bg-gradient-to-br ${getCategoryGradient(p.category)}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: p.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.category })
                    ] })
                  ]
                }
              )
            },
            p.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-2 overflow-x-auto pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
      projectCategories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setCategory(c),
          "data-ocid": `marketplace.filter.${c.toLowerCase().replace(/\s+/g, "_")}`,
          className: `shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition-all ${category === c ? "bg-primary/20 text-primary shadow-glow-cyan" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
          type: "button",
          children: c
        },
        c
      ))
    ] }),
    trending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Trending Now" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2 scrollbar-hide", children: trending.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: `/project/${p.id}`,
          className: "shrink-0",
          "data-ocid": `marketplace.trending.${p.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              glowColor: "purple",
              className: "w-64 overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-36 bg-gradient-to-br ${getCategoryGradient(p.category)}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary", children: p.category }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                      " ",
                      p.viewCount
                    ] })
                  ] })
                ] })
              ]
            }
          )
        },
        p.id
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassCard,
      {
        className: "h-64 animate-pulse",
        glowColor: "none",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      },
      `skeleton-${i}`
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: `/project/${p.id}`,
            "data-ocid": `marketplace.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                glowColor: "purple",
                className: "group relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-44 bg-gradient-to-br ${getCategoryGradient(p.category)}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-semibold text-foreground", children: p.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary", children: p.category })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 flex-col items-end gap-1", children: p.isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary", children: "Premium" }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                      " ",
                      p.viewCount,
                      " views"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { variant: "cyan", size: "sm", children: "View Project" }) }),
                  isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          ue.info("Edit project coming soon");
                        },
                        className: "rounded-lg bg-card/80 p-1.5 text-foreground hover:bg-primary/20",
                        "data-ocid": `marketplace.edit_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          ue.info("Delete project coming soon");
                        },
                        className: "rounded-lg bg-card/80 p-1.5 text-destructive hover:bg-destructive/20",
                        "data-ocid": `marketplace.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      },
      p.id
    )) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "mt-16 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "No projects found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Try adjusting your search or filter criteria" })
        ]
      }
    )
  ] }) });
}
export {
  Marketplace as default
};
