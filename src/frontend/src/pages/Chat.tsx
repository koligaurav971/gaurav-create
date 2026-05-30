import { GlassCard } from "@/components/GlassCard";
import { GlowButton } from "@/components/GlowButton";
import { MembershipBadge } from "@/components/MembershipBadge";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddReaction,
  useChatMessages,
  useDeleteMessage,
  useModerationLogs,
  useMuteUser,
  useMutedUsers,
  useOnlineUserCount,
  usePinMessage,
  usePinnedMessages,
  useSendMessage,
  useUnmuteUser,
} from "@/hooks/useBackend";
import { type ChatRoom, type MembershipTier, chatRooms } from "@/types";
import {
  ChevronRight,
  Crown,
  Hash,
  Lock,
  MessageSquare,
  Pin,
  ScrollText,
  Send,
  Shield,
  Smile,
  Star,
  Trash2,
  Users,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "😮",
  "🎉",
  "🔥",
  "👏",
  "💯",
  "🚀",
  "✨",
  "👀",
  "🙌",
  "💪",
  "🤔",
  "👋",
  "🌟",
  "💎",
  "⚡",
  "🎯",
  "🏆",
];

const tierColors: Record<MembershipTier, string> = {
  Free: "text-foreground",
  Premium: "text-purple-300",
  VIP: "text-amber-300",
};

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function RoomIcon({ room, hasAccess }: { room: ChatRoom; hasAccess: boolean }) {
  if (room === "Free")
    return <Hash className="h-4 w-4 text-muted-foreground" />;
  if (room === "Premium") {
    return hasAccess ? (
      <Star className="h-4 w-4 text-purple-300" />
    ) : (
      <Lock className="h-4 w-4 text-muted-foreground" />
    );
  }
  return hasAccess ? (
    <Crown className="h-4 w-4 text-amber-300" />
  ) : (
    <Crown className="h-4 w-4 text-muted-foreground" />
  );
}

function MessageBubble({
  msg,
  isOwner,
  onDelete,
  onPin,
  onReact,
}: {
  msg: import("@/types").ChatMessage;
  isOwner: boolean;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onReact: (id: string, emoji: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const senderTier: MembershipTier = "Free";

  if (msg.isDeleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-2 text-sm italic text-muted-foreground"
        data-ocid={`chat.message.${msg.id}`}
      >
        [Message removed]
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex gap-3 px-4 py-2 transition-colors hover:bg-white/5"
      data-ocid={`chat.message.${msg.id}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-accent/40 text-xs font-bold text-primary-foreground">
        {getInitials(msg.senderName || msg.sender)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${tierColors[senderTier]}`}>
            {msg.senderName || msg.sender.slice(0, 12)}
          </span>
          <MembershipBadge tier={senderTier} className="scale-90" />
          <span className="text-xs text-muted-foreground">
            {formatTime(msg.timestamp)}
          </span>
          {msg.isPinned && <Pin className="h-3 w-3 text-amber-400" />}
        </div>
        <div className="mt-0.5 text-sm text-foreground">{msg.content}</div>
        {msg.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {msg.reactions.map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => onReact(msg.id, emoji)}
                className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-xs transition-colors hover:bg-white/10"
                type="button"
                data-ocid={`chat.reaction.${msg.id}`}
              >
                <span>{emoji}</span>
                <span className="text-muted-foreground">{count}</span>
              </button>
            ))}
          </div>
        )}
        <AnimatePresence>
          {hovered && isOwner && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 flex gap-2"
            >
              <button
                onClick={() => onPin(msg.id)}
                className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                type="button"
                data-ocid={`chat.pin_button.${msg.id}`}
              >
                <Pin className="h-3 w-3" /> Pin
              </button>
              <button
                onClick={() => onDelete(msg.id)}
                className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-xs text-destructive transition-colors hover:bg-destructive/20"
                type="button"
                data-ocid={`chat.delete_button.${msg.id}`}
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ModerationPanel({
  room,
  onClose,
}: {
  room: ChatRoom;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"messages" | "muted" | "logs">("messages");
  const { data: messages = [] } = useChatMessages(room);
  const { data: mutedUsers = [] } = useMutedUsers();
  const { data: logs = [] } = useModerationLogs(20);
  const deleteMsg = useDeleteMessage();
  const muteUser = useMuteUser();
  const unmuteUser = useUnmuteUser();
  const [muteTarget, setMuteTarget] = useState("");
  const [muteDuration, setMuteDuration] = useState("3600");
  const [muteReason, setMuteReason] = useState("");

  const handleMute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!muteTarget || !muteReason) return;
    muteUser.mutate({
      target: muteTarget,
      durationSecs: Number.parseInt(muteDuration),
      reason: muteReason,
    });
    setMuteTarget("");
    setMuteReason("");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-white/10 bg-card/95 backdrop-blur-xl"
      data-ocid="chat.moderation_panel"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Moderation</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          type="button"
          data-ocid="chat.close_moderation_button"
          aria-label="Close moderation panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex border-b border-white/10">
        {(["messages", "muted", "logs"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 px-3 py-2.5 text-xs font-medium capitalize transition-colors ${
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            type="button"
            data-ocid={`chat.moderation_tab.${t}`}
          >
            {t === "messages" && (
              <MessageSquare className="mx-auto mb-0.5 h-3.5 w-3.5" />
            )}
            {t === "muted" && (
              <VolumeX className="mx-auto mb-0.5 h-3.5 w-3.5" />
            )}
            {t === "logs" && (
              <ScrollText className="mx-auto mb-0.5 h-3.5 w-3.5" />
            )}
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {tab === "messages" && (
          <div className="space-y-2">
            {messages.map((m) => (
              <div key={m.id} className="rounded-lg bg-white/5 p-2.5 text-xs">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {m.senderName || m.sender.slice(0, 12)}
                  </span>
                  <button
                    onClick={() => deleteMsg.mutate({ id: m.id, room })}
                    className="text-destructive hover:text-destructive/80"
                    type="button"
                    data-ocid={`chat.mod_delete_button.${m.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <p className="truncate text-muted-foreground">{m.content}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "muted" && (
          <div className="space-y-3">
            <form
              onSubmit={handleMute}
              className="space-y-2 rounded-lg bg-white/5 p-3"
            >
              <p className="text-xs font-medium text-foreground">Mute User</p>
              <input
                value={muteTarget}
                onChange={(e) => setMuteTarget(e.target.value)}
                placeholder="Principal ID"
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                data-ocid="chat.mute_target_input"
              />
              <input
                value={muteDuration}
                onChange={(e) => setMuteDuration(e.target.value)}
                placeholder="Duration (seconds)"
                type="number"
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                data-ocid="chat.mute_duration_input"
              />
              <input
                value={muteReason}
                onChange={(e) => setMuteReason(e.target.value)}
                placeholder="Reason"
                className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                data-ocid="chat.mute_reason_input"
              />
              <GlowButton
                variant="purple"
                size="sm"
                type="submit"
                className="w-full"
              >
                Mute User
              </GlowButton>
            </form>
            <div className="space-y-2">
              {mutedUsers.map((u) => (
                <div
                  key={u.principal}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground">
                      {u.principal.slice(0, 20)}...
                    </p>
                    <p className="text-xs text-muted-foreground">{u.reason}</p>
                  </div>
                  <button
                    onClick={() => unmuteUser.mutate(u.principal)}
                    className="shrink-0 rounded-md bg-white/5 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                    type="button"
                    data-ocid={`chat.unmute_button.${u.principal.slice(0, 8)}`}
                  >
                    Unmute
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "logs" && (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="rounded-lg bg-white/5 p-2.5 text-xs">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="font-medium text-primary">{log.action}</span>
                  <span className="text-muted-foreground">
                    {formatTime(log.timestamp)}
                  </span>
                </div>
                <p className="text-muted-foreground">{log.reason}</p>
                <p className="mt-0.5 truncate text-muted-foreground/60">
                  {log.targetPrincipal}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Chat() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>("Free");
  const [messageInput, setMessageInput] = useState("");
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { profile, isAuthenticated } = useAuth();
  const isOwner = profile?.isOwner ?? false;
  const userTier: MembershipTier = profile?.membershipTier ?? "Free";

  const { data: messages = [], isLoading: messagesLoading } =
    useChatMessages(selectedRoom);
  const { data: pinned = [] } = usePinnedMessages(selectedRoom);
  const { data: onlineCount = 0 } = useOnlineUserCount();
  const sendMessage = useSendMessage();
  const deleteMessage = useDeleteMessage();
  const pinMessage = usePinMessage();
  const addReaction = useAddReaction();

  const roomInfo = chatRooms.find((r) => r.id === selectedRoom)!;

  const canAccessRoom = (room: ChatRoom) => {
    if (room === "Free") return true;
    if (room === "Premium") return userTier === "Premium" || userTier === "VIP";
    return userTier === "VIP";
  };

  const hasAccess = canAccessRoom(selectedRoom);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messageInput.length > 0) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(t);
    }
    setIsTyping(false);
  }, [messageInput]);

  const handleSend = useCallback(() => {
    if (!messageInput.trim() || !hasAccess || !isAuthenticated) return;
    sendMessage.mutate({ room: selectedRoom, content: messageInput.trim() });
    setMessageInput("");
    setShowEmojiPicker(false);
  }, [messageInput, hasAccess, isAuthenticated, selectedRoom, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReact = (msgId: string, emoji: string) => {
    addReaction.mutate({ messageId: msgId, emoji, room: selectedRoom });
  };

  const handleDelete = (id: string) => {
    deleteMessage.mutate({ id, room: selectedRoom });
  };

  const handlePin = (id: string) => {
    pinMessage.mutate({ id, room: selectedRoom });
  };

  const insertEmoji = (emoji: string) => {
    setMessageInput((prev) => prev + emoji);
    inputRef.current?.focus();
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative flex h-[calc(100vh-5rem)] flex-col overflow-hidden md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-card/40 backdrop-blur-sm md:flex">
        <div className="border-b border-white/10 px-4 py-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Community
          </h3>
        </div>
        <div className="flex-1 space-y-0.5 p-2">
          {chatRooms.map((r) => {
            const active = selectedRoom === r.id;
            const access = canAccessRoom(r.id);
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRoom(r.id)}
                data-ocid={`chat.room.${r.id.toLowerCase()}_tab`}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-l-2 border-primary bg-white/10 text-foreground shadow-glow-cyan"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
                type="button"
              >
                <RoomIcon room={r.id} hasAccess={access} />
                <span className="flex-1">{r.name}</span>
                {!access && (
                  <Lock className="h-3 w-3 text-muted-foreground/50" />
                )}
              </button>
            );
          })}
        </div>
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <Users className="h-3.5 w-3.5" />
            <span>{onlineCount} online</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-card/30 px-4 py-3 backdrop-blur-sm">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <RoomIcon room={selectedRoom} hasAccess={hasAccess} />
              <h2 className="truncate text-sm font-semibold text-foreground">
                {roomInfo.name}
              </h2>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {roomInfo.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>{onlineCount} online</span>
            </div>
            {isOwner && (
              <GlowButton
                variant="purple"
                size="sm"
                onClick={() => setShowModerationPanel(true)}
                data-ocid="chat.open_moderation_button"
              >
                <Shield className="mr-1.5 h-3.5 w-3.5" />
                Moderate
              </GlowButton>
            )}
          </div>
        </div>

        {/* Pinned Announcements */}
        <AnimatePresence>
          {pinned.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-2"
            >
              {pinned.map((p) => (
                <div key={p.id} className="flex items-start gap-2 text-xs">
                  <Pin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <span className="text-amber-200/80">{p.content}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messagesLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <div key={`skel-${i}`} className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 rounded bg-white/5" />
                    <div className="h-3 w-3/4 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div
              className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center"
              data-ocid="chat.empty_state"
            >
              <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No messages yet. Be the first to say something!
              </p>
            </div>
          ) : (
            <div className="py-2">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isOwner={isOwner}
                  onDelete={handleDelete}
                  onPin={handlePin}
                  onReact={handleReact}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="px-4 py-1 text-xs text-muted-foreground"
              >
                {profile?.displayName || "Someone"} is typing...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message Input */}
        <div className="relative border-t border-white/10 bg-card/30 p-3 backdrop-blur-sm">
          {!hasAccess ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Upgrade to {selectedRoom} to access this room</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  type="button"
                  data-ocid="chat.emoji_button"
                  aria-label="Open emoji picker"
                >
                  <Smile className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {showEmojiPicker && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 8 }}
                      className="absolute bottom-12 left-0 z-40 grid w-56 grid-cols-5 gap-1 rounded-xl border border-white/10 bg-card/95 p-2 backdrop-blur-xl shadow-glow"
                      data-ocid="chat.emoji_picker"
                    >
                      {EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => insertEmoji(emoji)}
                          className="flex h-9 items-center justify-center rounded-lg text-lg transition-colors hover:bg-white/10"
                          type="button"
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                ref={inputRef}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                data-ocid="chat.message_input"
                className="flex-1 rounded-xl border border-white/10 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <GlowButton
                variant="cyan"
                size="sm"
                onClick={handleSend}
                disabled={!messageInput.trim() || sendMessage.isPending}
                data-ocid="chat.send_button"
              >
                <Send className="h-4 w-4" />
              </GlowButton>
            </div>
          )}
        </div>

        {/* Mobile Room Tabs */}
        <div className="flex border-t border-white/10 bg-card/50 md:hidden">
          {chatRooms.map((r) => {
            const active = selectedRoom === r.id;
            const access = canAccessRoom(r.id);
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRoom(r.id)}
                data-ocid={`chat.mobile_room.${r.id.toLowerCase()}_tab`}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
                type="button"
              >
                <RoomIcon room={r.id} hasAccess={access} />
                <span>{r.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Moderation Panel Overlay */}
      <AnimatePresence>
        {showModerationPanel && isOwner && (
          <ModerationPanel
            room={selectedRoom}
            onClose={() => setShowModerationPanel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
