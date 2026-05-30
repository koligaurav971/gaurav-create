var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { l as Subscribable, n as shallowEqualObjects, q as hashKey, t as getDefaultState, w as notifyManager, x as useQueryClient, a as reactExports, y as noop, z as shouldThrowError, b as useQuery, B as useActor, D as createActor } from "./index-BocZk3t7.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function mapProject(p) {
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
    createdAt: Number(p.createdAt)
  };
}
function mapChatMessage(m) {
  return {
    id: String(m.id),
    room: m.room,
    sender: m.sender.toText(),
    senderName: m.senderName,
    content: m.content,
    timestamp: Number(m.timestamp),
    isDeleted: m.isDeleted,
    isPinned: m.isPinned,
    reactions: m.reactions.map(([emoji, count]) => [
      emoji,
      Number(count)
    ])
  };
}
function mapAnnouncement(a) {
  return {
    id: String(a.id),
    content: a.content,
    createdAt: Number(a.createdAt),
    room: a.room ? a.room : void 0
  };
}
function useBackendActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isFetching };
}
function useProjects(category) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      const catOpt = category && category !== "All" ? category : null;
      const list = await actor.getProjects(catOpt, null);
      return list.map(mapProject);
    },
    enabled: !!actor && !isFetching
  });
}
function useProject(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return null;
      const p = await actor.getProject(BigInt(id));
      return p ? mapProject(p) : null;
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useFeaturedProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getProjects(null, true);
      return list.map(mapProject);
    },
    enabled: !!actor && !isFetching
  });
}
function useChatMessages(room) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["chat", room],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getMessages(
        room,
        BigInt(100)
      );
      return list.map(mapChatMessage);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e3
  });
}
function useAnnouncements() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAnnouncements(null);
      return list.map(mapAnnouncement);
    },
    enabled: !!actor && !isFetching
  });
}
function useSendMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      room,
      content
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.sendMessage(room, content);
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapChatMessage(res.ok);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
    }
  });
}
function useDeleteMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room: _room }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteMessage(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
      qc.invalidateQueries({ queryKey: ["pinned", vars.room] });
    }
  });
}
function usePinMessage() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room: _room }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.pinMessage(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
      qc.invalidateQueries({ queryKey: ["pinned", vars.room] });
    }
  });
}
function useAddReaction() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      messageId,
      emoji,
      room: _room
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.addReaction(BigInt(messageId), emoji);
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["chat", vars.room] });
    }
  });
}
function usePinnedMessages(room) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["pinned", room],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getPinnedMessages(room);
      return list.map(mapChatMessage);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5e3
  });
}
function useOnlineUserCount() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["onlineCount"],
    queryFn: async () => {
      if (!actor) return 0;
      return Number(await actor.getOnlineUserCount());
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 1e4
  });
}
function useModerationLogs(limit = 10) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["moderationLogs"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getModerationLogs(BigInt(limit));
      return list.map((l) => {
        var _a2, _b;
        return {
          id: String(l.id),
          action: l.action,
          targetPrincipal: ((_a2 = l.targetPrincipal) == null ? void 0 : _a2.toText()) ?? "",
          reason: l.reason,
          timestamp: Number(l.timestamp),
          moderator: ((_b = l.targetPrincipal) == null ? void 0 : _b.toText()) ?? ""
        };
      });
    },
    enabled: !!actor && !isFetching
  });
}
function useMutedUsers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["mutedUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getMutedUsers();
      return list.map((u) => ({
        principal: u.principal.toText(),
        mutedUntil: Number(u.mutedUntil),
        reason: u.reason
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function useMuteUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      durationSecs,
      reason
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.muteUser(
        target,
        BigInt(durationSecs),
        reason
      );
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mutedUsers"] })
  });
}
function useUnmuteUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (target) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.unmuteUser(
        target
      );
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mutedUsers"] })
  });
}
function useBlogPosts(published = true) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
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
        createdAt: Number(b.createdAt)
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function useBlogPost(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      if (!actor) return null;
      const b = await actor.getBlogPost(BigInt(id));
      return b ? {
        id: String(b.id),
        title: b.title,
        content: b.content,
        excerpt: b.excerpt,
        isPublished: b.isPublished,
        createdAt: Number(b.createdAt)
      } : null;
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useAllUsers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) return [];
      const list = await actor.getAllUsers();
      return list.map((u) => ({
        principal: u.principal.toText(),
        displayName: u.username,
        avatar: u.avatarUrl,
        membershipTier: u.tier,
        joinedAt: Number(u.joinedAt),
        isOwner: false
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createProject(
        payload.title,
        payload.description,
        payload.category,
        payload.thumbnailUrl,
        payload.contentUrl,
        payload.isFree,
        payload.isFeatured
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapProject(res.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] })
  });
}
function useDeleteProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteProject(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] })
  });
}
function useDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteBlogPost(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] })
  });
}
function useCreateAnnouncement() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      room,
      content
    }) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.createAnnouncement(
        room,
        content
      );
      if (res.__kind__ === "err") throw new Error(res.err);
      return mapAnnouncement(res.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
  });
}
function useDeleteAnnouncement() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      const res = await actor.deleteAnnouncement(BigInt(id));
      if (res.__kind__ === "err") throw new Error(res.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
  });
}
export {
  useBackendActor as a,
  useProjects as b,
  useProject as c,
  useChatMessages as d,
  usePinnedMessages as e,
  useOnlineUserCount as f,
  useSendMessage as g,
  useDeleteMessage as h,
  usePinMessage as i,
  useAddReaction as j,
  useMutedUsers as k,
  useModerationLogs as l,
  useMuteUser as m,
  useUnmuteUser as n,
  useBlogPost as o,
  useBlogPosts as p,
  useAllUsers as q,
  useAnnouncements as r,
  useCreateProject as s,
  useDeleteProject as t,
  useFeaturedProjects as u,
  useDeleteBlogPost as v,
  useCreateAnnouncement as w,
  useDeleteAnnouncement as x
};
