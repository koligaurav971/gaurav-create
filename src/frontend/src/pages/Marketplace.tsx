import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { useAuth } from "@/hooks/useAuth";
import { useFeaturedProjects, useProjects } from "@/hooks/useBackend";
import { projectCategories } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Flame,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { data: allProjects = [], isLoading } = useProjects(category);
  const { data: featured = [] } = useFeaturedProjects();
  const { profile } = useAuth();
  const isOwner = profile?.isOwner ?? false;

  const filtered = allProjects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const trending = allProjects.filter((p) => p.isTrending);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
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
    }, 4000);
    return () => clearInterval(interval);
  }, [featured.length, isDragging]);

  const scrollFeatured = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow-purple">
                  PROJECT MARKETPLACE
                </span>
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Discover premium digital creations
              </p>
            </div>
            {isOwner && (
              <GlowButton
                variant="cyan"
                className="gap-2"
                onClick={() => toast.info("Project upload coming soon")}
                data-ocid="marketplace.add_project_button"
              >
                <Plus className="h-4 w-4" /> Add Project
              </GlowButton>
            )}
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            data-ocid="marketplace.search_input"
            className="w-full rounded-xl border border-white/10 bg-card/60 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        {/* Featured Carousel */}
        {featured.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Featured
              </h2>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => scrollFeatured("left")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  data-ocid="marketplace.carousel_prev"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFeatured("right")}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  data-ocid="marketplace.carousel_next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                cursor: isDragging ? "grabbing" : "grab",
              }}
            >
              {featured.map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  className="shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                  data-ocid={`marketplace.featured.${p.id}`}
                >
                  <GlassCard
                    glowColor="cyan"
                    className="w-72 overflow-hidden md:w-80"
                  >
                    <div
                      className={`h-48 bg-gradient-to-br ${getCategoryGradient(p.category)}`}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {p.category}
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              data-ocid={`marketplace.filter.${c.toLowerCase().replace(/\s+/g, "_")}`}
              className={`shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                category === c
                  ? "bg-primary/20 text-primary shadow-glow-cyan"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Trending */}
        {trending.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <Flame className="h-5 w-5 text-destructive" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Trending Now
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  className="shrink-0"
                  data-ocid={`marketplace.trending.${p.id}`}
                >
                  <GlassCard
                    glowColor="purple"
                    className="w-64 overflow-hidden"
                  >
                    <div
                      className={`h-36 bg-gradient-to-br ${getCategoryGradient(p.category)}`}
                    />
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-primary">
                          {p.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" /> {p.viewCount}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Project Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                key={`skeleton-${i}`}
                className="h-64 animate-pulse"
                glowColor="none"
              >
                <div />
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/project/${p.id}`}
                  data-ocid={`marketplace.item.${i + 1}`}
                >
                  <GlassCard
                    glowColor="purple"
                    className="group relative overflow-hidden"
                  >
                    <div
                      className={`h-44 bg-gradient-to-br ${getCategoryGradient(p.category)}`}
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-foreground">
                            {p.title}
                          </h3>
                          <span className="mt-1 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {p.isFree ? (
                            <span className="rounded-md bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary">
                              Free
                            </span>
                          ) : (
                            <span className="rounded-md bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" /> {p.viewCount} views
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <GlowButton variant="cyan" size="sm">
                        View Project
                      </GlowButton>
                    </div>
                    {/* Owner controls */}
                    {isOwner && (
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast.info("Edit project coming soon");
                          }}
                          className="rounded-lg bg-card/80 p-1.5 text-foreground hover:bg-primary/20"
                          data-ocid={`marketplace.edit_button.${i + 1}`}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast.info("Delete project coming soon");
                          }}
                          className="rounded-lg bg-card/80 p-1.5 text-destructive hover:bg-destructive/20"
                          data-ocid={`marketplace.delete_button.${i + 1}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              No projects found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
