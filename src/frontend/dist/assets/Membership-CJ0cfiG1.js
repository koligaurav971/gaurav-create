import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, h as membershipPlans, G as GlowButton } from "./index-BocZk3t7.js";
import { G as GlassCard } from "./GlassCard-JtSwK8Tm.js";
import { S as Sparkles } from "./sparkles-vY0h_vfi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
function Membership() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-10 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mb-10 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground md:text-4xl", children: "Memberships" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Unlock premium features and join exclusive creator spaces." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3", children: membershipPlans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            glowColor: plan.isPopular ? "purple" : "none",
            className: "relative flex h-full flex-col p-6",
            children: [
              plan.isPopular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow", children: "Most Popular" }),
              plan.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                " Coming Soon"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: plan.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl font-bold text-primary", children: plan.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: plan.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 flex-1 space-y-2.5", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
              ] }, f)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GlowButton,
                {
                  variant: plan.isPopular ? "cyan" : "ghost",
                  className: "mt-6 w-full",
                  disabled: plan.comingSoon,
                  "data-ocid": `membership.${plan.tier.toLowerCase()}_button`,
                  children: plan.comingSoon ? "Coming Soon" : "Choose Plan"
                }
              )
            ]
          }
        )
      },
      plan.tier
    )) })
  ] }) });
}
export {
  Membership as default
};
