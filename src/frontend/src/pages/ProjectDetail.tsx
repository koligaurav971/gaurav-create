import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { useAuth } from "@/hooks/useAuth";
import { useBackendActor, useProject, useProjects } from "@/hooks/useBackend";
import {
  ArrowLeft,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function getCategoryGradient(category: string) {
  const map: Record<string, string> = {
    "Web Dev": "from-primary/20 to-secondary/20",
    "UI Design": "from-accent/20 to-primary/20",
    Templates: "from-secondary/20 to-accent/20",
    Motion: "from-primary/15 to-destructive/15",
    Tools: "from-secondary/15 to-primary/15",
  };
  return map[category] || "from-primary/15 to-accent/15";
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id ?? "");
  const { data: allProjects = [] } = useProjects();
  useAuth();
  const { actor } = useBackendActor();

  useEffect(() => {
    if (!id || !actor) return;
    actor.incrementProjectView(BigInt(id)).catch(() => {});
  }, [id, actor]);

  const related = allProjects
    .filter((p) => p.id !== id && p.category === project?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl">
          <GlassCard className="h-96 animate-pulse" glowColor="none">
            <div />
          </GlassCard>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Project not found
          </h2>
          <Link
            to="/marketplace"
            className="mt-4 inline-flex items-center gap-1 text-primary hover:underline"
            data-ocid="project.back_link"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/marketplace"
          data-ocid="project.back_link"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Marketplace
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Banner */}
          <div
            className={`h-64 rounded-2xl bg-gradient-to-br ${getCategoryGradient(project.category)} md:h-80`}
          />

          {/* Title & Meta */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground text-glow-purple md:text-4xl">
                {project.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {project.category}
                </span>
                {project.isFree ? (
                  <span className="rounded-md bg-secondary/20 px-2.5 py-1 text-xs font-semibold text-secondary">
                    Free
                  </span>
                ) : (
                  <span className="rounded-md bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary">
                    Premium
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {project.viewCount} views
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {project.isFree ? (
                <GlowButton
                  variant="cyan"
                  className="gap-1.5"
                  href={project.contentUrl}
                  data-ocid="project.download_button"
                >
                  <Download className="h-4 w-4" /> Download
                </GlowButton>
              ) : (
                <GlowButton
                  variant="purple"
                  className="gap-1.5"
                  data-ocid="project.upgrade_button"
                >
                  <Lock className="h-4 w-4" /> Upgrade to Premium
                </GlowButton>
              )}
              {project.contentUrl && (
                <GlowButton
                  variant="ghost"
                  className="gap-1.5"
                  href={project.contentUrl}
                  data-ocid="project.preview_button"
                >
                  <ExternalLink className="h-4 w-4" /> Preview
                </GlowButton>
              )}
            </div>
          </div>

          {/* Description */}
          <GlassCard glowColor="cyan" className="mt-6">
            <div className="p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                About this project
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Published {formatDate(project.createdAt)}
              </div>
            </div>
          </GlassCard>

          {/* Premium CTA */}
          {!project.isFree && (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <Lock className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                Premium Content
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upgrade to Premium to unlock this project and exclusive
                resources.
              </p>
              <div className="mt-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Coming Soon
              </div>
            </div>
          )}

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-foreground">
                More Projects
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((p, i) => (
                  <Link
                    key={p.id}
                    to={`/project/${p.id}`}
                    data-ocid={`project.related.${i + 1}`}
                  >
                    <GlassCard glowColor="purple" className="overflow-hidden">
                      <div
                        className={`h-32 bg-gradient-to-br ${getCategoryGradient(p.category)}`}
                      />
                      <div className="p-3">
                        <h3 className="truncate text-sm font-semibold text-foreground">
                          {p.title}
                        </h3>
                        <span className="mt-1 text-xs text-primary">
                          {p.category}
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
