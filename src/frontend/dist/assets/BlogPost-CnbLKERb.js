import { c as createLucideIcon, f as useParams, j as jsxRuntimeExports, L as Link, m as motion } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { o as useBlogPost } from "./useBackend-CdNmdtmR.js";
import { A as ArrowLeft } from "./arrow-left-DNg1nzFK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function BlogPost() {
  const { id } = useParams();
  const { data: post, isLoading } = useBlogPost(id ?? "");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[60vh] items-center justify-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
      " Loading..."
    ] });
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog",
          "data-ocid": "blogpost.back_link",
          className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to Blog"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-8 text-center text-muted-foreground", children: "Post not found." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/blog",
        "data-ocid": "blogpost.back_link",
        className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to Blog"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(post.createdAt * 1e3).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-2xl font-bold text-foreground md:text-3xl", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground", children: post.content.split("\n\n").map((paragraph, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: paragraph order is stable
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paragraph }, `para-${i}`)
          )) })
        ] })
      }
    )
  ] }) });
}
export {
  BlogPost as default
};
