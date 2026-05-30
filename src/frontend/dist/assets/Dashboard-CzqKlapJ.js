import { c as createLucideIcon, u as useAuth, i as useNavigate, a as reactExports, j as jsxRuntimeExports, m as motion, S as Shield, k as LayoutGrid, G as GlowButton } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { a as useBackendActor, b as useProjects, p as useBlogPosts, q as useAllUsers, r as useAnnouncements, l as useModerationLogs, k as useMutedUsers, s as useCreateProject, t as useDeleteProject, v as useDeleteBlogPost, w as useCreateAnnouncement, x as useDeleteAnnouncement, n as useUnmuteUser } from "./useBackend-CdNmdtmR.js";
import { u as ue } from "./index-DagESB4a.js";
import { L as Layers } from "./layers-BWPRPtdc.js";
import { N as Newspaper } from "./newspaper-CftbUNrU.js";
import { U as Users } from "./users-DJJ8lPLE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v2", key: "stiyo7" }],
  ["path", { d: "M12 13h.01", key: "y0uutt" }]
];
const MessageSquareWarning = createLucideIcon("message-square-warning", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function Dashboard() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [showProjectForm, setShowProjectForm] = reactExports.useState(false);
  const [projectForm, setProjectForm] = reactExports.useState({
    title: "",
    description: "",
    category: "UI Kit",
    thumbnailUrl: "",
    contentUrl: "",
    isFree: true,
    isFeatured: false
  });
  const [announcementContent, setAnnouncementContent] = reactExports.useState("");
  useBackendActor();
  const { data: projects } = useProjects();
  const { data: blogPosts } = useBlogPosts();
  const { data: users } = useAllUsers();
  const { data: announcements } = useAnnouncements();
  const { data: moderationLogs } = useModerationLogs(5);
  const { data: mutedUsers } = useMutedUsers();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const deleteBlogPost = useDeleteBlogPost();
  const createAnnouncement = useCreateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();
  const unmuteUser = useUnmuteUser();
  reactExports.useEffect(() => {
    if (!isLoading && !(profile == null ? void 0 : profile.isOwner)) {
      navigate("/", { replace: true });
    }
  }, [profile, isLoading, navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[60vh] items-center justify-center text-muted-foreground", children: "Verifying access..." });
  }
  if (!(profile == null ? void 0 : profile.isOwner)) return null;
  const tabs = [
    { id: "overview", label: "Overview", icon: ChartColumn },
    { id: "projects", label: "Projects", icon: LayoutGrid },
    { id: "blog", label: "Blog", icon: Newspaper },
    { id: "members", label: "Members", icon: Users },
    { id: "moderation", label: "Moderation", icon: Shield },
    { id: "announcements", label: "Announcements", icon: Megaphone }
  ];
  const stats = [
    { label: "Total Projects", value: (projects == null ? void 0 : projects.length) ?? 0, icon: Layers },
    { label: "Blog Posts", value: (blogPosts == null ? void 0 : blogPosts.length) ?? 0, icon: Newspaper },
    { label: "Members", value: (users == null ? void 0 : users.length) ?? 0, icon: Users },
    {
      label: "Announcements",
      value: (announcements == null ? void 0 : announcements.length) ?? 0,
      icon: Megaphone
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-8 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-7 w-7 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Owner Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage projects, moderation, and community." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex gap-2 overflow-x-auto", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.id),
        "data-ocid": `dashboard.tab.${tab.id}`,
        className: `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "h-4 w-4" }),
          tab.label
        ]
      },
      tab.id
    )) }),
    activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s, _i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label })
            ] })
          ] }) }, s.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 font-semibold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-yellow-400" }),
                "Recent Moderation"
              ] }),
              moderationLogs && moderationLogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: moderationLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: log.action }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: log.reason })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(log.timestamp * 1e3).toLocaleDateString() })
                  ]
                },
                log.id
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No moderation logs yet." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 font-semibold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4 text-primary" }),
                "Recent Announcements"
              ] }),
              announcements && announcements.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: announcements.slice(0, 5).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground",
                  children: a.content
                },
                a.id
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No announcements yet." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [
            {
              icon: LayoutGrid,
              label: "Manage Projects",
              desc: "Upload & edit projects",
              action: () => setActiveTab("projects")
            },
            {
              icon: MessageSquareWarning,
              label: "Moderation",
              desc: "Chat moderation tools",
              action: () => setActiveTab("moderation")
            },
            {
              icon: Megaphone,
              label: "Announcements",
              desc: "Send community updates",
              action: () => setActiveTab("announcements")
            },
            {
              icon: ChartColumn,
              label: "Analytics",
              desc: "Overview & insights",
              action: () => setActiveTab("overview")
            }
          ].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.06 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-6 w-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold text-foreground", children: c.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: c.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GlowButton,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "mt-4 w-full",
                    onClick: c.action,
                    "data-ocid": `dashboard.${c.label.toLowerCase().replace(/\s+/g, "_")}_button`,
                    children: "Open"
                  }
                )
              ] })
            },
            c.label
          )) })
        ]
      }
    ),
    activeTab === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Projects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                variant: "cyan",
                size: "sm",
                onClick: () => setShowProjectForm(true),
                "data-ocid": "dashboard.add_project_button",
                children: "+ Add Project"
              }
            )
          ] }),
          showProjectForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "space-y-3 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "New Project" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Title",
                value: projectForm.title,
                onChange: (e) => setProjectForm({ ...projectForm, title: e.target.value })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Description",
                rows: 3,
                value: projectForm.description,
                onChange: (e) => setProjectForm({
                  ...projectForm,
                  description: e.target.value
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Category",
                value: projectForm.category,
                onChange: (e) => setProjectForm({ ...projectForm, category: e.target.value })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Thumbnail URL",
                value: projectForm.thumbnailUrl,
                onChange: (e) => setProjectForm({
                  ...projectForm,
                  thumbnailUrl: e.target.value
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Content URL",
                value: projectForm.contentUrl,
                onChange: (e) => setProjectForm({
                  ...projectForm,
                  contentUrl: e.target.value
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: projectForm.isFree,
                    onChange: (e) => setProjectForm({
                      ...projectForm,
                      isFree: e.target.checked
                    })
                  }
                ),
                " ",
                "Free"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: projectForm.isFeatured,
                    onChange: (e) => setProjectForm({
                      ...projectForm,
                      isFeatured: e.target.checked
                    })
                  }
                ),
                " ",
                "Featured"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  variant: "cyan",
                  size: "sm",
                  onClick: () => {
                    if (!projectForm.title.trim()) return;
                    createProject.mutate(projectForm, {
                      onSuccess: () => {
                        ue.success("Project created");
                        setShowProjectForm(false);
                        setProjectForm({
                          title: "",
                          description: "",
                          category: "UI Kit",
                          thumbnailUrl: "",
                          contentUrl: "",
                          isFree: true,
                          isFeatured: false
                        });
                      },
                      onError: (err) => ue.error(err.message)
                    });
                  },
                  children: "Create"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setShowProjectForm(false),
                  children: "Cancel"
                }
              )
            ] })
          ] }),
          projects && projects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "flex items-center justify-between p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    p.category,
                    " • ",
                    p.isFree ? "Free" : "Premium"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => ue.info("Edit coming soon"),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "text-red-400",
                      onClick: () => {
                        if (window.confirm("Delete this project?"))
                          deleteProject.mutate(p.id);
                      },
                      children: "Delete"
                    }
                  )
                ] })
              ]
            },
            p.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 text-center text-muted-foreground", children: "No projects yet. Add your first project above." })
        ]
      }
    ),
    activeTab === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Blog Posts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                variant: "cyan",
                size: "sm",
                onClick: () => ue.info("Blog post creation coming soon"),
                "data-ocid": "dashboard.add_blog_button",
                children: "+ New Post"
              }
            )
          ] }),
          blogPosts && blogPosts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: blogPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "flex items-center justify-between p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: post.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    post.isPublished ? "Published" : "Draft",
                    " •",
                    " ",
                    new Date(post.createdAt * 1e3).toLocaleDateString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => ue.info("Edit coming soon"),
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "text-red-400",
                      onClick: () => {
                        if (window.confirm("Delete this blog post?"))
                          deleteBlogPost.mutate(post.id);
                      },
                      children: "Delete"
                    }
                  )
                ] })
              ]
            },
            post.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 text-center text-muted-foreground", children: "No blog posts yet. Create your first post above." })
        ]
      }
    ),
    activeTab === "members" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Members" }),
          users && users.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "flex items-center justify-between p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary", children: u.displayName.charAt(0).toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: u.displayName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: u.membershipTier })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlowButton,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => ue.info("Mute feature coming soon"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3 w-3" }),
                      " Mute"
                    ]
                  }
                ) })
              ]
            },
            u.principal
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 text-center text-muted-foreground", children: "No members yet." })
        ]
      }
    ),
    activeTab === "moderation" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 font-semibold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-yellow-400" }),
              "Moderation Logs"
            ] }),
            moderationLogs && moderationLogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: moderationLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: log.action }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: log.reason })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(log.timestamp * 1e3).toLocaleDateString() })
                ]
              },
              log.id
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No moderation logs yet." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 font-semibold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4 text-red-400" }),
              "Muted Users"
            ] }),
            mutedUsers && mutedUsers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: mutedUsers.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground", children: [
                      u.principal.slice(0, 20),
                      "..."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      u.reason,
                      " • Until",
                      " ",
                      new Date(u.mutedUntil * 1e3).toLocaleDateString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GlowButton,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => unmuteUser.mutate(u.principal),
                      children: "Unmute"
                    }
                  )
                ]
              },
              u.principal
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No muted users." })
          ] })
        ] })
      }
    ),
    activeTab === "announcements" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold text-foreground", children: "New Announcement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary",
                placeholder: "Announcement content...",
                rows: 3,
                value: announcementContent,
                onChange: (e) => setAnnouncementContent(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowButton,
              {
                variant: "cyan",
                size: "sm",
                onClick: () => {
                  if (!announcementContent.trim()) return;
                  createAnnouncement.mutate(
                    { room: null, content: announcementContent },
                    {
                      onSuccess: () => {
                        ue.success("Announcement sent");
                        setAnnouncementContent("");
                      },
                      onError: (err) => ue.error(err.message)
                    }
                  );
                },
                children: "Send"
              }
            ) })
          ] }),
          announcements && announcements.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: announcements.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "flex items-center justify-between p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: a.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GlowButton,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-red-400",
                    onClick: () => {
                      if (window.confirm("Delete this announcement?"))
                        deleteAnnouncement.mutate(a.id);
                    },
                    children: "Delete"
                  }
                )
              ]
            },
            a.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 text-center text-muted-foreground", children: "No announcements yet." })
        ]
      }
    )
  ] }) });
}
export {
  Dashboard as default
};
