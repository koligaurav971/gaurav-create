import { c as createLucideIcon, r as resolveElements, a as reactExports, u as useAuth, b as useQuery, M as MessageSquare, j as jsxRuntimeExports, m as motion, L as Link, G as GlowButton, C as Crown, s as socialLinks, d as MessageCircle, Y as Youtube, I as Instagram, e as MembershipBadge } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { u as useFeaturedProjects, a as useBackendActor } from "./useBackend-CdNmdtmR.js";
import { U as Users } from "./users-DJJ8lPLE.js";
import { L as Layers } from "./layers-BWPRPtdc.js";
import { S as Star } from "./star-B6_T_PXF.js";
import { S as Sparkles } from "./sparkles-vY0h_vfi.js";
import { A as ArrowRight } from "./arrow-right-CN8A78oi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function AnimatedCounter({
  target,
  suffix = ""
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2e3;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "font-display text-4xl font-bold text-foreground md:text-5xl",
      children: [
        count.toLocaleString(),
        suffix
      ]
    }
  );
}
function CyberGridBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        className: "absolute inset-0 h-full w-full opacity-20",
        xmlns: "http://www.w3.org/2000/svg",
        role: "presentation",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "pattern",
            {
              id: "cyber-grid",
              width: "60",
              height: "60",
              patternUnits: "userSpaceOnUse",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M 60 0 L 0 0 0 60",
                  fill: "none",
                  stroke: "rgba(0,217,255,0.3)",
                  strokeWidth: "0.5"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#cyber-grid)" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" })
  ] });
}
function FloatingPanel({
  children,
  className,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.8 + delay, duration: 0.6 },
      className,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: { y: [0, -8, 0] },
          transition: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay
          },
          children
        }
      )
    }
  );
}
function Home() {
  const { isAuthenticated, profile } = useAuth();
  const { data: featuredProjects, isLoading: projectsLoading } = useFeaturedProjects();
  const { actor } = useBackendActor();
  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) return null;
      const a = await actor.getAnalytics();
      return {
        totalUsers: Number(a.totalUsers),
        totalProjects: Number(a.totalProjects),
        totalMessages: Number(a.totalMessages),
        activeUsersToday: Number(a.activeUsersToday)
      };
    },
    enabled: !!actor
  });
  const stats = analytics ? [
    {
      icon: Users,
      label: "Members",
      value: analytics.totalUsers,
      suffix: "+"
    },
    {
      icon: Layers,
      label: "Projects",
      value: analytics.totalProjects,
      suffix: "+"
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: analytics.totalMessages,
      suffix: "+"
    },
    {
      icon: Star,
      label: "Stars",
      value: analytics.activeUsersToday * 10,
      suffix: "+"
    }
  ] : [
    { icon: Users, label: "Members", value: 100, suffix: "+" },
    { icon: Layers, label: "Projects", value: 25, suffix: "+" },
    { icon: MessageSquare, label: "Messages", value: 1e3, suffix: "+" },
    { icon: Star, label: "Stars", value: 500, suffix: "+" }
  ];
  const titleChars = "GAURAV.CREATE".split("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-screen items-center justify-center overflow-hidden px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CyberGridBackground, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FloatingPanel,
        {
          className: "absolute right-4 top-24 hidden lg:block",
          delay: 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { glowColor: "purple", className: "w-56 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Community" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-foreground", children: "1,200+ Members" })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FloatingPanel,
        {
          className: "absolute left-4 top-40 hidden lg:block",
          delay: 0.5,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { glowColor: "cyan", className: "w-56 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Latest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-foreground", children: "New Release!" })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FloatingPanel,
        {
          className: "absolute bottom-32 right-8 hidden lg:block",
          delay: 1,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { glowColor: "blue", className: "w-56 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Trending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold text-foreground", children: "Cyber UI Kit" })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex max-w-5xl flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: {
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            },
            className: "flex flex-wrap justify-center",
            children: titleChars.map((char, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                variants: {
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                },
                transition: { duration: 0.5, ease: "easeOut" },
                className: `font-display text-6xl font-extrabold tracking-tight text-foreground md:text-8xl lg:text-9xl ${char === "." ? "text-primary text-glow-cyan" : "text-glow-cyan"}`,
                children: char === " " ? " " : char
              },
              `char-${i}-${char}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.8, duration: 0.6 },
            className: "mt-4 font-display text-xl font-semibold text-purple-400 md:text-2xl lg:text-3xl",
            children: "Create • Innovate • Inspire"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1, duration: 0.6 },
            className: "mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
            children: "A futuristic creator universe for digital innovation. Explore premium projects, connect with a thriving community, and unlock your creative potential in a cyberpunk-inspired digital ecosystem."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1.2, duration: 0.6 },
            className: "mt-10 flex flex-wrap items-center justify-center gap-3",
            children: [
              isAuthenticated && (profile == null ? void 0 : profile.isOwner) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", "data-ocid": "home.dashboard_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "cyan", size: "lg", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
                " Dashboard"
              ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", "data-ocid": "home.signin_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "cyan", size: "lg", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                " Sign In"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: socialLinks.discord,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "home.discord_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "purple", size: "lg", className: "gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                    " Join Discord"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: socialLinks.youtube,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "home.youtube_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "ghost", size: "lg", className: "gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4 text-red-500" }),
                    " Subscribe"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: socialLinks.instagram,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "home.instagram_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "ghost", size: "lg", className: "gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4 text-pink-500" }),
                    " Follow"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", "data-ocid": "home.explore_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "cyan", size: "lg", className: "gap-2", children: [
                "Explore Projects ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 2, duration: 1 },
          className: "absolute bottom-8 left-1/2 -translate-x-1/2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              animate: { y: [0, 8, 0] },
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              className: "flex flex-col items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Scroll to explore" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 text-muted-foreground" })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-white/5 bg-muted/30 px-4 py-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "mb-10 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Live Universe Stats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1, duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              glowColor: "purple",
              className: "flex flex-col items-center gap-3 p-8 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-7 w-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: s.value, suffix: s.suffix }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium uppercase tracking-wider text-muted-foreground", children: s.label })
              ]
            }
          )
        },
        s.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background px-4 py-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "mb-10 flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Featured Projects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/marketplace",
                "data-ocid": "home.view_all_link",
                className: "text-sm font-medium text-primary transition-colors hover:text-primary/80",
                children: "View All Projects →"
              }
            )
          ]
        }
      ),
      projectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassCard,
        {
          glowColor: "cyan",
          className: "h-72 animate-pulse",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
        },
        i
      )) }) : featuredProjects && featuredProjects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: featuredProjects.slice(0, 6).map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1, duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: `/project/${project.id}`,
              "data-ocid": `home.project.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  glowColor: "cyan",
                  className: "overflow-hidden",
                  hoverable: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
                      project.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: project.thumbnailUrl,
                          alt: project.title,
                          className: "h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-12 w-12 text-primary/40" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MembershipBadge,
                        {
                          tier: project.isFree ? "Free" : "Premium",
                          className: "text-xs"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-medium uppercase tracking-wider text-primary", children: project.category }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: project.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: project.description })
                    ] })
                  ]
                }
              )
            }
          )
        },
        project.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground", children: "No featured projects yet. Check back soon!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", "data-ocid": "home.view_all_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "cyan", size: "lg", className: "gap-2", children: [
        "View All Projects ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-white/5 bg-muted/30 px-4 py-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "mb-10 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Join the Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Connect with creators, share ideas, and grow together in our futuristic digital universe." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-3", children: [
        {
          icon: MessageCircle,
          name: "Discord",
          color: "text-indigo-400",
          bg: "bg-indigo-500/10",
          glow: "purple",
          members: "1,000+ creators",
          cta: "Join Server",
          url: socialLinks.discord,
          desc: "Real-time chat, announcements, and community events"
        },
        {
          icon: Youtube,
          name: "YouTube",
          color: "text-red-500",
          bg: "bg-red-500/10",
          glow: "cyan",
          members: "Subscribe for tutorials",
          cta: "Subscribe",
          url: socialLinks.youtube,
          desc: "Tutorials, behind-the-scenes, and creative showcases"
        },
        {
          icon: Instagram,
          name: "Instagram",
          color: "text-pink-500",
          bg: "bg-pink-500/10",
          glow: "purple",
          members: "Follow for inspiration",
          cta: "Follow",
          url: socialLinks.instagram,
          desc: "Daily inspiration, project previews, and creative process"
        }
      ].map((social, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.15, duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: social.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": `home.community.${social.name.toLowerCase()}_card`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassCard,
                {
                  glowColor: social.glow,
                  className: "group p-6 text-center",
                  hoverable: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${social.bg} transition-transform duration-300 group-hover:scale-110`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(social.icon, { className: `h-8 w-8 ${social.color}` })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-bold text-foreground", children: social.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-medium text-muted-foreground", children: social.members }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: social.desc }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm font-semibold text-primary", children: [
                      social.cta,
                      " →"
                    ] })
                  ]
                }
              )
            }
          )
        },
        social.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden px-4 py-20 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "relative z-10 mx-auto max-w-3xl text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl", children: [
              "Ready to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-cyan", children: "Create" }),
              "?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground", children: "Join the futuristic creator universe. Sign in to unlock projects, chat with the community, and start building the future." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", "data-ocid": "home.footer_signin_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "cyan", size: "lg", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                " Sign In to Get Started"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", "data-ocid": "home.footer_explore_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { variant: "ghost", size: "lg", children: "Explore Projects" }) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Home as default
};
