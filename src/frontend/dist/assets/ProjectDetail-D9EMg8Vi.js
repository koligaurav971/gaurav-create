import { c as createLucideIcon, f as useParams, u as useAuth, a as reactExports, j as jsxRuntimeExports, L as Link, m as motion, G as GlowButton } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { c as useProject, b as useProjects, a as useBackendActor } from "./useBackend-CdNmdtmR.js";
import { A as ArrowLeft } from "./arrow-left-DNg1nzFK.js";
import { E as Eye } from "./eye-B71W905d.js";
import { L as Lock } from "./lock-0KH-A4CT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
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
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function ProjectDetail() {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id ?? "");
  const { data: allProjects = [] } = useProjects();
  useAuth();
  const { actor } = useBackendActor();
  reactExports.useEffect(() => {
    if (!id || !actor) return;
    actor.incrementProjectView(BigInt(id)).catch(() => {
    });
  }, [id, actor]);
  const related = allProjects.filter((p) => p.id !== id && p.category === (project == null ? void 0 : project.category)).slice(0, 3);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "h-96 animate-pulse", glowColor: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}) }) }) });
  }
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Project not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/marketplace",
          className: "mt-4 inline-flex items-center gap-1 text-primary hover:underline",
          "data-ocid": "project.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to Marketplace"
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/marketplace",
        "data-ocid": "project.back_link",
        className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to Marketplace"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-64 rounded-2xl bg-gradient-to-br ${getCategoryGradient(project.category)} md:h-80`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground text-glow-purple md:text-4xl", children: project.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary", children: project.category }),
                project.isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-secondary", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary", children: "Premium" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
                  " ",
                  project.viewCount,
                  " views"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              project.isFree ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowButton,
                {
                  variant: "cyan",
                  className: "gap-1.5",
                  href: project.contentUrl,
                  "data-ocid": "project.download_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                    " Download"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowButton,
                {
                  variant: "purple",
                  className: "gap-1.5",
                  "data-ocid": "project.upgrade_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
                    " Upgrade to Premium"
                  ]
                }
              ),
              project.contentUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlowButton,
                {
                  variant: "ghost",
                  className: "gap-1.5",
                  href: project.contentUrl,
                  "data-ocid": "project.preview_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
                    " Preview"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { glowColor: "cyan", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "About this project" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground", children: project.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              "Published ",
              formatDate(project.createdAt)
            ] })
          ] }) }),
          !project.isFree && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mx-auto h-8 w-8 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-lg font-semibold text-foreground", children: "Premium Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Upgrade to Premium to unlock this project and exclusive resources." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: "Coming Soon" })
          ] }),
          related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "More Projects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: `/project/${p.id}`,
                "data-ocid": `project.related.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glowColor: "purple", className: "overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-32 bg-gradient-to-br ${getCategoryGradient(p.category)}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-semibold text-foreground", children: p.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-xs text-primary", children: p.category })
                  ] })
                ] })
              },
              p.id
            )) })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  ProjectDetail as default
};
