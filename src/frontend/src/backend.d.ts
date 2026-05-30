import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    isPublished: boolean;
    createdAt: bigint;
    excerpt: string;
}
export interface MutedUser {
    principal: Principal;
    mutedUntil: bigint;
    reason: string;
}
export interface Announcement {
    id: bigint;
    content: string;
    createdAt: bigint;
    room?: ChatRoom;
}
export interface ChatMessage {
    id: bigint;
    isDeleted: boolean;
    content: string;
    room: ChatRoom;
    sender: Principal;
    timestamp: bigint;
    senderName: string;
    isPinned: boolean;
    reactions: Array<[string, bigint]>;
}
export interface ModerationLog {
    id: bigint;
    action: ModerationAction;
    targetPrincipal?: Principal;
    targetMessageId?: bigint;
    timestamp: bigint;
    reason: string;
}
export interface Project {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    contentUrl: string;
    createdAt: bigint;
    description: string;
    isFree: boolean;
    viewCount: bigint;
    isFeatured: boolean;
    category: string;
    isTrending: boolean;
}
export interface UserProfile {
    principal: Principal;
    username: string;
    joinedAt: bigint;
    tier: MembershipTier;
    avatarUrl: string;
}
export enum MembershipTier {
    VIP = "VIP",
    Premium = "Premium",
    Free = "Free"
}
export enum ModerationAction {
    DeleteMessage = "DeleteMessage",
    AutoFlagProfanity = "AutoFlagProfanity",
    PinMessage = "PinMessage",
    AutoFlagLink = "AutoFlagLink",
    AutoFlagScam = "AutoFlagScam",
    AutoFlagSpam = "AutoFlagSpam",
    UnpinMessage = "UnpinMessage",
    MuteUser = "MuteUser",
    FlagSuspiciousActivity = "FlagSuspiciousActivity"
}
export interface backendInterface {
    addReaction(messageId: bigint, emoji: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    claimOwner(): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createAnnouncement(room: ChatRoom | null, content: string): Promise<{
        __kind__: "ok";
        ok: Announcement;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createBlogPost(title: string, content: string, excerpt: string): Promise<{
        __kind__: "ok";
        ok: BlogPost;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createProject(title: string, description: string, category: string, thumbnailUrl: string, contentUrl: string, isFree: boolean, isFeatured: boolean): Promise<{
        __kind__: "ok";
        ok: Project;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteAnnouncement(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteBlogPost(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteMessage(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProject(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getAnalytics(): Promise<{
        activeUsersToday: bigint;
        totalMessages: bigint;
        totalProjects: bigint;
        totalUsers: bigint;
    }>;
    getAnnouncements(room: ChatRoom | null): Promise<Array<Announcement>>;
    getBlogPost(id: bigint): Promise<BlogPost | null>;
    getBlogPosts(published: boolean | null): Promise<Array<BlogPost>>;
    getMessages(room: ChatRoom, limit: bigint): Promise<Array<ChatMessage>>;
    getModerationLogs(limit: bigint): Promise<Array<ModerationLog>>;
    getMutedUsers(): Promise<Array<MutedUser>>;
    getMyProfile(): Promise<UserProfile | null>;
    getOnlineUserCount(): Promise<bigint>;
    getPinnedMessages(room: ChatRoom): Promise<Array<ChatMessage>>;
    getProject(id: bigint): Promise<Project | null>;
    getProjects(category: string | null, featured: boolean | null): Promise<Array<Project>>;
    getUserProfile(p: Principal): Promise<UserProfile | null>;
    incrementProjectView(id: bigint): Promise<void>;
    isOwnerQuery(): Promise<boolean>;
    isUserMuted(p: Principal): Promise<boolean>;
    muteUser(target: Principal, durationSecs: bigint, reason: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    pinMessage(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    publishBlogPost(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerOrUpdateUser(username: string, avatarUrl: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendMessage(room: ChatRoom, content: string): Promise<{
        __kind__: "ok";
        ok: ChatMessage;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setMembershipTier(target: Principal, tier: MembershipTier): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setOwnerPrincipal(newOwner: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setProjectFeatured(id: bigint, featured: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setProjectTrending(id: bigint, trending: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    unmuteUser(target: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    unpinMessage(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateBlogPost(id: bigint, title: string, content: string, excerpt: string): Promise<{
        __kind__: "ok";
        ok: BlogPost;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProject(id: bigint, title: string, description: string, category: string, thumbnailUrl: string, contentUrl: string, isFree: boolean, isFeatured: boolean): Promise<{
        __kind__: "ok";
        ok: Project;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
