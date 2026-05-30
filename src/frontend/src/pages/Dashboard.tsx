import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { useAuth } from "@/hooks/useAuth";
import {
  useAllUsers,
  useAnnouncements,
  useBackendActor,
  useBlogPosts,
  useCreateAnnouncement,
  useCreateProject,
  useDeleteAnnouncement,
  useDeleteBlogPost,
  useDeleteProject,
  useModerationLogs,
  useMutedUsers,
  useProjects,
  useUnmuteUser,
} from "@/hooks/useBackend";
import {
  AlertTriangle,
  Ban,
  BarChart3,
  Layers,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  MessageSquareWarning,
  Newspaper,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "projects"
    | "blog"
    | "members"
    | "moderation"
    | "announcements"
  >("overview");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "UI Kit",
    thumbnailUrl: "",
    contentUrl: "",
    isFree: true,
    isFeatured: false,
  });
  const [announcementContent, setAnnouncementContent] = useState("");

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

  useEffect(() => {
    if (!isLoading && !profile?.isOwner) {
      navigate("/", { replace: true });
    }
  }, [profile, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        Verifying access...
      </div>
    );
  }

  if (!profile?.isOwner) return null;

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "projects" as const, label: "Projects", icon: LayoutGrid },
    { id: "blog" as const, label: "Blog", icon: Newspaper },
    { id: "members" as const, label: "Members", icon: Users },
    { id: "moderation" as const, label: "Moderation", icon: Shield },
    { id: "announcements" as const, label: "Announcements", icon: Megaphone },
  ];

  const stats = [
    { label: "Total Projects", value: projects?.length ?? 0, icon: Layers },
    { label: "Blog Posts", value: blogPosts?.length ?? 0, icon: Newspaper },
    { label: "Members", value: users?.length ?? 0, icon: Users },
    {
      label: "Announcements",
      value: announcements?.length ?? 0,
      icon: Megaphone,
    },
  ];

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <Shield className="h-7 w-7 text-primary" />
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Owner Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage projects, moderation, and community.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`dashboard.tab.${tab.id}`}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, _i) => (
                <GlassCard key={s.label} className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <GlassCard className="p-5">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Recent Moderation
                </h3>
                {moderationLogs && moderationLogs.length > 0 ? (
                  <div className="space-y-2">
                    {moderationLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                      >
                        <div>
                          <span className="font-medium text-foreground">
                            {log.action}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {log.reason}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No moderation logs yet.
                  </p>
                )}
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <Megaphone className="h-4 w-4 text-primary" />
                  Recent Announcements
                </h3>
                {announcements && announcements.length > 0 ? (
                  <div className="space-y-2">
                    {announcements.slice(0, 5).map((a) => (
                      <div
                        key={a.id}
                        className="rounded-lg bg-muted/40 px-3 py-2 text-sm text-foreground"
                      >
                        {a.content}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No announcements yet.
                  </p>
                )}
              </GlassCard>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: LayoutGrid,
                  label: "Manage Projects",
                  desc: "Upload & edit projects",
                  action: () => setActiveTab("projects"),
                },
                {
                  icon: MessageSquareWarning,
                  label: "Moderation",
                  desc: "Chat moderation tools",
                  action: () => setActiveTab("moderation"),
                },
                {
                  icon: Megaphone,
                  label: "Announcements",
                  desc: "Send community updates",
                  action: () => setActiveTab("announcements"),
                },
                {
                  icon: BarChart3,
                  label: "Analytics",
                  desc: "Overview & insights",
                  action: () => setActiveTab("overview"),
                },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <GlassCard className="p-5">
                    <c.icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-3 font-semibold text-foreground">
                      {c.label}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.desc}
                    </p>
                    <GlowButton
                      variant="ghost"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={c.action}
                      data-ocid={`dashboard.${c.label.toLowerCase().replace(/\s+/g, "_")}_button`}
                    >
                      Open
                    </GlowButton>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Projects
              </h2>
              <GlowButton
                variant="cyan"
                size="sm"
                onClick={() => setShowProjectForm(true)}
                data-ocid="dashboard.add_project_button"
              >
                + Add Project
              </GlowButton>
            </div>
            {showProjectForm && (
              <GlassCard className="space-y-3 p-5">
                <h3 className="font-semibold text-foreground">New Project</h3>
                <input
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Title"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Description"
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Category"
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, category: e.target.value })
                  }
                />
                <input
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Thumbnail URL"
                  value={projectForm.thumbnailUrl}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      thumbnailUrl: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="Content URL"
                  value={projectForm.contentUrl}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      contentUrl: e.target.value,
                    })
                  }
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={projectForm.isFree}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          isFree: e.target.checked,
                        })
                      }
                    />{" "}
                    Free
                  </label>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={projectForm.isFeatured}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          isFeatured: e.target.checked,
                        })
                      }
                    />{" "}
                    Featured
                  </label>
                </div>
                <div className="flex gap-2">
                  <GlowButton
                    variant="cyan"
                    size="sm"
                    onClick={() => {
                      if (!projectForm.title.trim()) return;
                      createProject.mutate(projectForm, {
                        onSuccess: () => {
                          toast.success("Project created");
                          setShowProjectForm(false);
                          setProjectForm({
                            title: "",
                            description: "",
                            category: "UI Kit",
                            thumbnailUrl: "",
                            contentUrl: "",
                            isFree: true,
                            isFeatured: false,
                          });
                        },
                        onError: (err: Error) => toast.error(err.message),
                      });
                    }}
                  >
                    Create
                  </GlowButton>
                  <GlowButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProjectForm(false)}
                  >
                    Cancel
                  </GlowButton>
                </div>
              </GlassCard>
            )}
            {projects && projects.length > 0 ? (
              <div className="space-y-2">
                {projects.map((p) => (
                  <GlassCard
                    key={p.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {p.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.category} • {p.isFree ? "Free" : "Premium"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info("Edit coming soon")}
                      >
                        Edit
                      </GlowButton>
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        className="text-red-400"
                        onClick={() => {
                          if (window.confirm("Delete this project?"))
                            deleteProject.mutate(p.id);
                        }}
                      >
                        Delete
                      </GlowButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center text-muted-foreground">
                No projects yet. Add your first project above.
              </GlassCard>
            )}
          </motion.div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Blog Posts
              </h2>
              <GlowButton
                variant="cyan"
                size="sm"
                onClick={() => toast.info("Blog post creation coming soon")}
                data-ocid="dashboard.add_blog_button"
              >
                + New Post
              </GlowButton>
            </div>
            {blogPosts && blogPosts.length > 0 ? (
              <div className="space-y-2">
                {blogPosts.map((post) => (
                  <GlassCard
                    key={post.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <div className="font-medium text-foreground">
                        {post.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.isPublished ? "Published" : "Draft"} •{" "}
                        {new Date(post.createdAt * 1000).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info("Edit coming soon")}
                      >
                        Edit
                      </GlowButton>
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        className="text-red-400"
                        onClick={() => {
                          if (window.confirm("Delete this blog post?"))
                            deleteBlogPost.mutate(post.id);
                        }}
                      >
                        Delete
                      </GlowButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center text-muted-foreground">
                No blog posts yet. Create your first post above.
              </GlassCard>
            )}
          </motion.div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="font-display text-xl font-bold text-foreground">
              Members
            </h2>
            {users && users.length > 0 ? (
              <div className="space-y-2">
                {users.map((u) => (
                  <GlassCard
                    key={u.principal}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {u.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {u.displayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {u.membershipTier}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GlowButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info("Mute feature coming soon")}
                      >
                        <Ban className="h-3 w-3" /> Mute
                      </GlowButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center text-muted-foreground">
                No members yet.
              </GlassCard>
            )}
          </motion.div>
        )}

        {/* Moderation Tab */}
        {activeTab === "moderation" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <GlassCard className="p-5">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Moderation Logs
                </h3>
                {moderationLogs && moderationLogs.length > 0 ? (
                  <div className="space-y-2">
                    {moderationLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                      >
                        <div>
                          <span className="font-medium text-foreground">
                            {log.action}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {log.reason}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No moderation logs yet.
                  </p>
                )}
              </GlassCard>
              <GlassCard className="p-5">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <Ban className="h-4 w-4 text-red-400" />
                  Muted Users
                </h3>
                {mutedUsers && mutedUsers.length > 0 ? (
                  <div className="space-y-2">
                    {mutedUsers.map((u) => (
                      <div
                        key={u.principal}
                        className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                      >
                        <div>
                          <div className="font-medium text-foreground">
                            {u.principal.slice(0, 20)}...
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {u.reason} • Until{" "}
                            {new Date(u.mutedUntil * 1000).toLocaleDateString()}
                          </div>
                        </div>
                        <GlowButton
                          variant="ghost"
                          size="sm"
                          onClick={() => unmuteUser.mutate(u.principal)}
                        >
                          Unmute
                        </GlowButton>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No muted users.
                  </p>
                )}
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <GlassCard className="p-5">
              <h3 className="mb-3 font-semibold text-foreground">
                New Announcement
              </h3>
              <textarea
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Announcement content..."
                rows={3}
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
              />
              <div className="mt-3 flex gap-2">
                <GlowButton
                  variant="cyan"
                  size="sm"
                  onClick={() => {
                    if (!announcementContent.trim()) return;
                    createAnnouncement.mutate(
                      { room: null, content: announcementContent },
                      {
                        onSuccess: () => {
                          toast.success("Announcement sent");
                          setAnnouncementContent("");
                        },
                        onError: (err: Error) => toast.error(err.message),
                      },
                    );
                  }}
                >
                  Send
                </GlowButton>
              </div>
            </GlassCard>
            {announcements && announcements.length > 0 ? (
              <div className="space-y-2">
                {announcements.map((a) => (
                  <GlassCard
                    key={a.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="text-sm text-foreground">{a.content}</div>
                    <GlowButton
                      variant="ghost"
                      size="sm"
                      className="text-red-400"
                      onClick={() => {
                        if (window.confirm("Delete this announcement?"))
                          deleteAnnouncement.mutate(a.id);
                      }}
                    >
                      Delete
                    </GlowButton>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center text-muted-foreground">
                No announcements yet.
              </GlassCard>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
