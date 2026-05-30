import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "Building the Future of Creator Platforms",
    date: "May 2026",
    excerpt: "How Gaurav.Create is redefining digital creation.",
  },
  {
    id: "2",
    title: "Cyberpunk UI Design Principles",
    date: "Apr 2026",
    excerpt: "Neon, glassmorphism, and immersive interfaces.",
  },
  {
    id: "3",
    title: "Community First: Why We Built a Chat System",
    date: "Mar 2026",
    excerpt: "Real-time connection for creators and fans.",
  },
];

export default function Blog() {
  return (
    <div className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Blog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Updates, insights, and behind-the-scenes from the creator.
          </p>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.id}`} data-ocid={`blog.item.${i + 1}`}>
                <GlassCard className="flex items-start gap-4 p-5 transition-colors hover:bg-card/80">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">
                      {post.date}
                    </div>
                    <h3 className="mt-0.5 font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
