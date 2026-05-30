import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { socialLinks } from "@/types";
import {
  Box,
  Code,
  Cpu,
  Crown,
  Figma,
  GitBranch,
  Globe,
  Instagram,
  Layers,
  MessageCircle,
  Monitor,
  Palette,
  Rocket,
  Sparkles,
  Terminal,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const skills = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Crafting immersive interfaces with glassmorphism, neon aesthetics, and futuristic visual systems.",
    glow: "purple" as const,
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building scalable applications with React, TypeScript, Motoko, and modern web technologies.",
    glow: "cyan" as const,
  },
  {
    icon: Zap,
    title: "Motion Design",
    description:
      "Creating cinematic animations, scroll-triggered effects, and interactive micro-interactions.",
    glow: "purple" as const,
  },
  {
    icon: Globe,
    title: "Community Building",
    description:
      "Growing engaged creator communities through Discord, social media, and collaborative platforms.",
    glow: "cyan" as const,
  },
];

const techStack = [
  { icon: Code, name: "React", color: "text-cyan-400" },
  { icon: Terminal, name: "TypeScript", color: "text-blue-400" },
  { icon: Cpu, name: "Motoko", color: "text-purple-400" },
  { icon: Layers, name: "Tailwind CSS", color: "text-cyan-400" },
  { icon: Figma, name: "Figma", color: "text-pink-400" },
  { icon: GitBranch, name: "Git", color: "text-orange-400" },
  { icon: Box, name: "Three.js", color: "text-white" },
  { icon: Monitor, name: "Next.js", color: "text-white" },
];

const journeyMilestones = [
  {
    year: "2020",
    title: "The Spark",
    description:
      "Discovered the world of digital design and began experimenting with UI/UX concepts and web technologies.",
  },
  {
    year: "2021",
    title: "First Projects",
    description:
      "Launched initial creative projects, building a portfolio of futuristic interfaces and motion experiments.",
  },
  {
    year: "2022",
    title: "Community Growth",
    description:
      "Started building online presence. Discord server launched. First 100 community members joined.",
  },
  {
    year: "2023",
    title: "YouTube & Content",
    description:
      "Began creating tutorials and behind-the-scenes content. Reached first 1,000 subscribers milestone.",
  },
  {
    year: "2024",
    title: "Gaurav.Create",
    description:
      "Launched the futuristic creator platform. A cyberpunk universe for digital innovation and community.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Bio */}
      <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary font-display text-6xl font-bold text-white shadow-glow-cyan md:h-40 md:w-40 md:text-7xl">
                G
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-glow-purple">
                <Crown className="h-5 w-5 text-white" />
              </div>
            </motion.div>

            {/* Bio Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="font-display text-4xl font-extrabold text-foreground md:text-5xl">
                  Gaurav
                </h1>
                <p className="mt-2 font-display text-lg font-semibold text-primary">
                  Futuristic Creator & Developer
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                I architect immersive digital experiences at the intersection of
                design and technology. From cyberpunk UI systems to motion
                graphics and community platforms, every creation is built with
                futuristic vision and meticulous craft. Welcome to my digital
                universe.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start"
              >
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="about.youtube_button"
                >
                  <GlowButton variant="ghost" size="sm" className="gap-2">
                    <Youtube className="h-4 w-4 text-red-500" /> YouTube
                  </GlowButton>
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="about.instagram_button"
                >
                  <GlowButton variant="ghost" size="sm" className="gap-2">
                    <Instagram className="h-4 w-4 text-pink-500" /> Instagram
                  </GlowButton>
                </a>
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="about.discord_button"
                >
                  <GlowButton variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4 text-indigo-400" />{" "}
                    Discord
                  </GlowButton>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-y border-white/5 bg-muted/30 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Tech Stack
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <GlassCard
                  glowColor="cyan"
                  className="group flex flex-col items-center gap-3 p-5 text-center"
                  hoverable
                >
                  <tech.icon
                    className={`h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${tech.color}`}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {tech.name}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Cards */}
      <section className="bg-background px-4 py-16 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Expertise
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Specialized skills honed through years of building futuristic
              digital experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <GlassCard
                  glowColor={skill.glow}
                  className="group h-full p-6"
                  hoverable
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <skill.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {skill.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="border-y border-white/5 bg-muted/30 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Creator Journey
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2" />

            {journeyMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`relative mb-10 flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-glow-purple md:left-1/2" />

                {/* Content */}
                <div
                  className={`ml-10 flex-1 md:ml-0 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12 md:text-left"
                  }`}
                >
                  <GlassCard
                    glowColor={i % 2 === 0 ? "purple" : "cyan"}
                    className="p-5"
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        i % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-bold text-primary">
                        {milestone.year}
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </GlassCard>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="bg-background px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Let's <span className="text-primary text-glow-cyan">Connect</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Follow the journey, join the community, and be part of the
              futuristic creator movement.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.social_youtube"
              >
                <GlowButton variant="ghost" size="lg" className="gap-2">
                  <Youtube className="h-5 w-5 text-red-500" /> YouTube
                </GlowButton>
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.social_instagram"
              >
                <GlowButton variant="ghost" size="lg" className="gap-2">
                  <Instagram className="h-5 w-5 text-pink-500" /> Instagram
                </GlowButton>
              </a>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.social_discord"
              >
                <GlowButton variant="ghost" size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5 text-indigo-400" /> Discord
                </GlowButton>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
