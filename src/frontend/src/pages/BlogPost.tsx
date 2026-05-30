import { GlassCard } from "@/components/GlassCard";
import { useBlogPost } from "@/hooks/useBackend";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useBlogPost(id ?? "");

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            data-ocid="blogpost.back_link"
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <GlassCard className="p-8 text-center text-muted-foreground">
            Post not found.
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/blog"
          data-ocid="blogpost.back_link"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-6 md:p-8">
            <div className="text-xs text-muted-foreground">
              {new Date(post.createdAt * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
              {post.title}
            </h1>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {post.content.split("\n\n").map((paragraph, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: paragraph order is stable
                <p key={`para-${i}`}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
