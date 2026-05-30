import { createActor } from "@/backend";
import type {
  Announcement as BackendAnnouncement,
  ChatMessage as BackendChatMessage,
  Project as BackendProject,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type BackendChatRoom = "Free" | "Premium" | "VIP";
import type { Announcement, ChatMessage, Project } from "@/types";

function mapProject(p: BackendProject): Project {
  return {
    id: String(p.id),
    title: p.title,
    description: p.description,
    category: p.category,
    thumbnailUrl: p.thumbnailUrl,
    contentUrl: p.contentUrl,
    isFree: p.isFree,
    isFeatured: p.isFeatured,
    isTrending: p.isTrending,
    viewCount: Number(p.viewCount),
    createdAt: Number(p.createdAt),
  };
}

function mapChatMessage(m: BackendChatMessage): ChatMessage {
  return {
    id: String(m.id),
    room: m.room as import("@/types").ChatRoom,
    sender: m.sender.toText(),
    senderName: m.senderName,
    content: m.content,
    timestamp: Number(m.timestamp),
    isDeleted: m.isDeleted,
    isPinned: m.isPinned,
    reactions: m.reactions.map(([emoji, count]): [string, number] => [
      emoji,
      Number(count),
    ]),
  };
}

function mapAnnouncement(a: BackendAnnouncement): Announcement {
  return {
    id: String(a.id),
    content: a.content,
    createdAt: Number(a.createdAt),
    room: a.room ? (a.room as import("@/types").ChatRoom) : undefined,
  };
}

export function useBackendActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}

export function useProjects(category?: string | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const catOpt = category && category !== "All" ? category : null;
      const list = await actor.getProjects(catOpt, null);
      return list.map(mapProject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project | null>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return null;
      const p = await actor.getProject(BigInt(id));
      return p ? mapProject(p) : null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useFeaturedProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getProjects(null, true);
      return list.map(mapProject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useChatMessages(room: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["chat", room],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getMessages(
        room as BackendChatRoom,
        BigInt(100),
      );
      return list.map(mapChatMessage);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useAnnouncements() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAnnouncements(null);
      return list.map(mapAnnouncement);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      room,
      content,
    }: { room: string; content: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.sendMessage(room as BackendChatRoom, content);
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapChatMessage(res.ok);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
    },
  });
}

export function useDeleteMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room: _room }: { id: string; room: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteMessage(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
      qc.invalidateQueries({ queryKey: ["pinned", vars.room] });
    },
  });
}

export function usePinMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room: _room }: { id: string; room: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.pinMessage(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
      qc.invalidateQueries({ queryKey: ["pinned", vars.room] });
    },
  });
}

export function useUnpinMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room: _room }: { id: string; room: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.unpinMessage(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
      qc.invalidateQueries({ queryKey: ["pinned", vars.room] });
    },
  });
}

export function useAddReaction() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      messageId,
      emoji,
      room: _room,
    }: { messageId: string; emoji: string; room: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.addReaction(BigInt(messageId), emoji);
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
    },
  });
}

export function usePinnedMessages(room: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["pinned", room],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getPinnedMessages(room as BackendChatRoom);
      return list.map(mapChatMessage);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useOnlineUserCount() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<number>({
    queryKey: ["onlineCount"],
    queryFn: async () => {
      if (!actor) return 0;
      return Number(await actor.getOnlineUserCount());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useModerationLogs(limit = 10) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("@/types").ModerationLog[]>({
    queryKey: ["moderationLogs"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getModerationLogs(BigInt(limit));
      return list.map((l) => ({
        id: String(l.id),
        action: l.action,
        targetPrincipal: l.targetPrincipal?.toText() ?? "",
        reason: l.reason,
        timestamp: Number(l.timestamp),
        moderator: l.targetPrincipal?.toText() ?? "",
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMutedUsers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<
    Array<{ principal: string; mutedUntil: number; reason: string }>
  >({
    queryKey: ["mutedUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getMutedUsers();
      return list.map((u) => ({
        principal: u.principal.toText(),
        mutedUntil: Number(u.mutedUntil),
        reason: u.reason,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMuteUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      durationSecs,
      reason,
    }: { target: string; durationSecs: number; reason: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.muteUser(
        target as unknown as import("@icp-sdk/core/principal").Principal,
        BigInt(durationSecs),
        reason,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mutedUsers"] }),
  });
}

export function useUnmuteUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (target: string) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.unmuteUser(
        target as unknown as import("@icp-sdk/core/principal").Principal,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mutedUsers"] }),
  });
}

export function useBlogPosts(published: boolean | null = true) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("@/types").BlogPost[]>({
    queryKey: ["blogPosts", published],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getBlogPosts(published);
      return list.map((b) => ({
        id: String(b.id),
        title: b.title,
        content: b.content,
        excerpt: b.excerpt,
        isPublished: b.isPublished,
        createdAt: Number(b.createdAt),
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("@/types").BlogPost | null>({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      if (!actor) return null;
      const b = await actor.getBlogPost(BigInt(id));
      return b
        ? {
            id: String(b.id),
            title: b.title,
            content: b.content,
            excerpt: b.excerpt,
            isPublished: b.isPublished,
            createdAt: Number(b.createdAt),
          }
        : null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAllUsers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<import("@/types").UserProfile[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAllUsers();
      return list.map((u) => ({
        principal: u.principal.toText(),
        displayName: u.username,
        avatar: u.avatarUrl,
        membershipTier: u.tier as import("@/types").MembershipTier,
        joinedAt: Number(u.joinedAt),
        isOwner: false,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsOwner() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isOwner"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOwnerQuery();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      description: string;
      category: string;
      thumbnailUrl: string;
      contentUrl: string;
      isFree: boolean;
      isFeatured: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createProject(
        payload.title,
        payload.description,
        payload.category,
        payload.thumbnailUrl,
        payload.contentUrl,
        payload.isFree,
        payload.isFeatured,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapProject(res.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteProject(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteBlogPost(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useCreateAnnouncement() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      room,
      content,
    }: { room: string | null; content: string }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createAnnouncement(
        room as BackendChatRoom | null,
        content,
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapAnnouncement(res.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteAnnouncement(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}
