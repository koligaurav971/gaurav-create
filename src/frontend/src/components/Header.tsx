import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GlowButton } from "./GlowButton";
import { MembershipBadge } from "./MembershipBadge";

export function Header() {
  const { isAuthenticated, profile, login, clear } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-white/10 bg-card/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2"
          data-ocid="header.logo_link"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-bold shadow-glow">
            G
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Gaurav.Create
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && profile?.isOwner && (
            <Link to="/dashboard" data-ocid="header.dashboard_link">
              <GlowButton variant="ghost" size="sm" className="gap-1.5">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </GlowButton>
            </Link>
          )}

          {isAuthenticated && profile && (
            <div className="hidden items-center gap-2 md:flex">
              <MembershipBadge tier={profile.membershipTier} />
              <span className="text-sm text-muted-foreground">
                {profile.displayName}
              </span>
            </div>
          )}

          {isAuthenticated ? (
            <GlowButton
              variant="ghost"
              size="sm"
              onClick={clear}
              data-ocid="header.logout_button"
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </GlowButton>
          ) : (
            <GlowButton
              variant="cyan"
              size="sm"
              onClick={login}
              data-ocid="header.login_button"
              className="gap-1.5"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </GlowButton>
          )}
        </div>
      </div>
    </motion.header>
  );
}
