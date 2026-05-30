import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { MembershipBadge } from "@/components/MembershipBadge";
import { useAuth } from "@/hooks/useAuth";
import { useBackendActor, useFeaturedProjects } from "@/hooks/useBackend";
import { socialLinks } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ChevronDown,
  Crown,
  Instagram,
  Layers,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
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

  return (
    <div
      ref={ref}
      className="font-display text-4xl font-bold text-foreground md:text-5xl"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

function CyberGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="cyber-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(0,217,255,0.3)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyber-grid)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}

function FloatingPanel({
  children,
  className,
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.6 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { isAuthenticated, profile } = useAuth();
  const { data: featuredProjects, isLoading: projectsLoading } =
    useFeaturedProjects();
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
        activeUsersToday: Number(a.activeUsersToday),
      };
    },
    enabled: !!actor,
  });

  const stats = analytics
    ? [
        {
          icon: Users,
          label: "Members",
          value: analytics.totalUsers,
          suffix: "+",
        },
        {
          icon: Layers,
          label: "Projects",
          value: analytics.totalProjects,
          suffix: "+",
        },
        {
          icon: MessageSquare,
          label: "Messages",
          value: analytics.totalMessages,
          suffix: "+",
        },
        {
          icon: Star,
          label: "Stars",
          value: analytics.activeUsersToday * 10,
          suffix: "+",
        },
      ]
    : [
        { icon: Users, label: "Members", value: 100, suffix: "+" },
        { icon: Layers, label: "Projects", value: 25, suffix: "+" },
        { icon: MessageSquare, label: "Messages", value: 1000, suffix: "+" },
        { icon: Star, label: "Stars", value: 500, suffix: "+" },
      ];

  const titleChars = "GAURAV.CREATE".split("");

  return (
    <div className="flex flex-col gap-0">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <CyberGridBackground />

        {/* Floating panels */}
        <FloatingPanel
          className="absolute right-4 top-24 hidden lg:block"
          delay={0}
        >
          <GlassCard glowColor="purple" className="w-56 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Community</div>
                <div className="font-display text-lg font-bold text-foreground">
                  1,200+ Members
                </div>
              </div>
            </div>
          </GlassCard>
        </FloatingPanel>

        <FloatingPanel
          className="absolute left-4 top-40 hidden lg:block"
          delay={0.5}
        >
          <GlassCard glowColor="cyan" className="w-56 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Latest</div>
                <div className="font-display text-lg font-bold text-foreground">
                  New Release!
                </div>
              </div>
            </div>
          </GlassCard>
        </FloatingPanel>

        <FloatingPanel
          className="absolute bottom-32 right-8 hidden lg:block"
          delay={1}
        >
          <GlassCard glowColor="blue" className="w-56 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Trending</div>
                <div className="font-display text-lg font-bold text-foreground">
                  Cyber UI Kit
                </div>
              </div>
            </div>
          </GlassCard>
        </FloatingPanel>

        <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
          {/* Animated title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="flex flex-wrap justify-center"
          >
            {titleChars.map((char, i) => (
              <motion.span
                key={`char-${i}-${char}`}
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`font-display text-6xl font-extrabold tracking-tight text-foreground md:text-8xl lg:text-9xl ${
                  char === "."
                    ? "text-primary text-glow-cyan"
                    : "text-glow-cyan"
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 font-display text-xl font-semibold text-purple-400 md:text-2xl lg:text-3xl"
          >
            Create • Innovate • Inspire
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A futuristic creator universe for digital innovation. Explore
            premium projects, connect with a thriving community, and unlock your
            creative potential in a cyberpunk-inspired digital ecosystem.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {isAuthenticated && profile?.isOwner ? (
              <Link to="/dashboard" data-ocid="home.dashboard_button">
                <GlowButton variant="cyan" size="lg" className="gap-2">
                  <Crown className="h-4 w-4" /> Dashboard
                </GlowButton>
              </Link>
            ) : (
              <Link to="/chat" data-ocid="home.signin_button">
                <GlowButton variant="cyan" size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" /> Sign In
                </GlowButton>
              </Link>
            )}

            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.discord_button"
            >
              <GlowButton variant="purple" size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" /> Join Discord
              </GlowButton>
            </a>

            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.youtube_button"
            >
              <GlowButton variant="ghost" size="lg" className="gap-2">
                <Youtube className="h-4 w-4 text-red-500" /> Subscribe
              </GlowButton>
            </a>

            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="home.instagram_button"
            >
              <GlowButton variant="ghost" size="lg" className="gap-2">
                <Instagram className="h-4 w-4 text-pink-500" /> Follow
              </GlowButton>
            </a>

            <Link to="/marketplace" data-ocid="home.explore_button">
              <GlowButton variant="cyan" size="lg" className="gap-2">
                Explore Projects <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">
              Scroll to explore
            </span>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Stats */}
      <section className="border-y border-white/5 bg-muted/30 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Live Universe Stats
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard
                  glowColor="purple"
                  className="flex flex-col items-center gap-3 p-8 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                  <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-background px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center justify-between"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Featured Projects
              </h2>
              <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <Link
              to="/marketplace"
              data-ocid="home.view_all_link"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View All Projects →
            </Link>
          </motion.div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <GlassCard
                  key={i}
                  glowColor="cyan"
                  className="h-72 animate-pulse"
                >
                  <div />
                </GlassCard>
              ))}
            </div>
          ) : featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.slice(0, 6).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/project/${project.id}`}
                    data-ocid={`home.project.item.${i + 1}`}
                  >
                    <GlassCard
                      glowColor="cyan"
                      className="overflow-hidden"
                      hoverable
                    >
                      <div className="relative h-48 overflow-hidden">
                        {project.thumbnailUrl ? (
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                            <Layers className="h-12 w-12 text-primary/40" />
                          </div>
                        )}
                        <div className="absolute right-3 top-3">
                          <MembershipBadge
                            tier={project.isFree ? "Free" : "Premium"}
                            className="text-xs"
                          />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                          {project.category}
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No featured projects yet. Check back soon!
            </div>
          )}

          <div className="mt-10 text-center">
            <Link to="/marketplace" data-ocid="home.view_all_button">
              <GlowButton variant="cyan" size="lg" className="gap-2">
                View All Projects <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="border-y border-white/5 bg-muted/30 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Join the Community
            </h2>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Connect with creators, share ideas, and grow together in our
              futuristic digital universe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                name: "Discord",
                color: "text-indigo-400",
                bg: "bg-indigo-500/10",
                glow: "purple" as const,
                members: "1,000+ creators",
                cta: "Join Server",
                url: socialLinks.discord,
                desc: "Real-time chat, announcements, and community events",
              },
              {
                icon: Youtube,
                name: "YouTube",
                color: "text-red-500",
                bg: "bg-red-500/10",
                glow: "cyan" as const,
                members: "Subscribe for tutorials",
                cta: "Subscribe",
                url: socialLinks.youtube,
                desc: "Tutorials, behind-the-scenes, and creative showcases",
              },
              {
                icon: Instagram,
                name: "Instagram",
                color: "text-pink-500",
                bg: "bg-pink-500/10",
                glow: "purple" as const,
                members: "Follow for inspiration",
                cta: "Follow",
                url: socialLinks.instagram,
                desc: "Daily inspiration, project previews, and creative process",
              },
            ].map((social, i) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`home.community.${social.name.toLowerCase()}_card`}
                >
                  <GlassCard
                    glowColor={social.glow}
                    className="group p-6 text-center"
                    hoverable
                  >
                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${social.bg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <social.icon className={`h-8 w-8 ${social.color}`} />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      {social.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {social.members}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {social.desc}
                    </p>
                    <div className="mt-4 text-sm font-semibold text-primary">
                      {social.cta} →
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden px-4 py-20 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl">
            Ready to <span className="text-primary text-glow-cyan">Create</span>
            ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Join the futuristic creator universe. Sign in to unlock projects,
            chat with the community, and start building the future.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/chat" data-ocid="home.footer_signin_button">
              <GlowButton variant="cyan" size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" /> Sign In to Get Started
              </GlowButton>
            </Link>
            <Link to="/marketplace" data-ocid="home.footer_explore_button">
              <GlowButton variant="ghost" size="lg">
                Explore Projects
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
