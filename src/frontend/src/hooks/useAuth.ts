import { createActor } from "@/backend";
import type { UserProfile } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";

export function useAuth() {
  const ii = useInternetIdentity();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = ii.loginStatus === "success" && !!ii.identity;
  const principal = ii.identity?.getPrincipal().toText() ?? "";

  useEffect(() => {
    let cancelled = false;
    async function fetchProfile() {
      if (!actor || !isAuthenticated) {
        setProfile(null);
        return;
      }
      setIsLoading(true);
      try {
        const owner = await actor.isOwnerQuery();
        if (cancelled) return;
        setProfile({
          principal,
          displayName: `${principal.slice(0, 12)}...`,
          membershipTier: "Free",
          joinedAt: Date.now(),
          isOwner: owner,
        });
      } catch {
        setProfile(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [actor, isAuthenticated, principal]);

  return {
    ...ii,
    isAuthenticated,
    principal,
    profile,
    isLoading: isLoading || actorLoading,
  };
}
