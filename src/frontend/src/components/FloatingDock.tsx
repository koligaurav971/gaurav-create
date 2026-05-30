import { cn } from "@/lib/utils";
import {
  Crown,
  Home,
  LayoutGrid,
  Menu,
  MessageSquare,
  Shield,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/marketplace", icon: LayoutGrid, label: "Marketplace" },
  { to: "/chat", icon: MessageSquare, label: "Chat" },
  { to: "/membership", icon: Crown, label: "Membership" },
];

export function FloatingDock() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop dock */}
      <nav className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:flex">
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-card/70 px-3 py-2 shadow-glow backdrop-blur-xl">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={`nav.${item.label.toLowerCase()}.link`}
                className={cn(
                  "group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-300",
                  active
                    ? "bg-primary/20 text-primary shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span
                  className={cn(
                    "max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[100px] group-hover:px-1",
                    active && "max-w-[100px] px-1",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        data-ocid="nav.mobile_menu_button"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-card/80 shadow-glow backdrop-blur-xl md:hidden"
        type="button"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-card/95 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <span className="font-display text-lg font-bold text-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  data-ocid="nav.close_menu_button"
                  className="rounded-lg p-2 hover:bg-muted"
                  type="button"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-3">
                {navItems.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      data-ocid={`nav.mobile.${item.label.toLowerCase()}.link`}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
