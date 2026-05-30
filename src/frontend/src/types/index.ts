export type MembershipTier = "Free" | "Premium" | "VIP";
export type ChatRoom = "Free" | "Premium" | "VIP";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
  createdAt: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  contentUrl: string;
  isFree: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  room: ChatRoom;
  sender: string;
  senderName: string;
  content: string;
  timestamp: number;
  isDeleted: boolean;
  isPinned: boolean;
  reactions: Array<[string, number]>;
}

export interface UserProfile {
  principal: string;
  displayName: string;
  email?: string;
  avatar?: string;
  membershipTier: MembershipTier;
  joinedAt: number;
  isOwner: boolean;
}

export interface Announcement {
  id: string;
  content: string;
  createdAt: number;
  room?: ChatRoom;
}

export interface ModerationLog {
  id: string;
  action: string;
  targetPrincipal: string;
  reason: string;
  timestamp: number;
  moderator: string;
}

export interface MembershipPlan {
  tier: MembershipTier;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  comingSoon?: boolean;
}

export const membershipPlans: MembershipPlan[] = [
  {
    tier: "Free",
    name: "Free Member",
    price: "$0",
    description: "Access public projects and community features",
    features: [
      "Browse public projects",
      "Community chat access",
      "Basic profile badge",
      "Newsletter updates",
    ],
  },
  {
    tier: "Premium",
    name: "Premium Member",
    price: "$9.99/mo",
    description: "Unlock premium content and early access",
    features: [
      "Everything in Free",
      "Premium project downloads",
      "Early access to releases",
      "Premium chat room",
      "Exclusive resources",
      "Premium badge",
      "Ad-free experience",
    ],
    isPopular: true,
    comingSoon: true,
  },
  {
    tier: "VIP",
    name: "VIP Member",
    price: "$29.99/mo",
    description: "Full VIP experience with creator access",
    features: [
      "Everything in Premium",
      "VIP creator chat",
      "Beta testing access",
      "Behind-the-scenes content",
      "Direct creator Q&A",
      "VIP badge & perks",
      "Priority support",
    ],
    comingSoon: true,
  },
];

export const projectCategories = [
  "All",
  "Web Dev",
  "UI Design",
  "Templates",
  "Motion",
  "Tools",
];

export const chatRooms: { id: ChatRoom; name: string; description: string }[] =
  [
    { id: "Free", name: "Community", description: "Open chat for all members" },
    {
      id: "Premium",
      name: "Premium Lounge",
      description: "Exclusive for Premium+ members",
    },
    {
      id: "VIP",
      name: "VIP Creator Hub",
      description: "VIP members & creator access only",
    },
  ];

export const socialLinks = {
  instagram:
    "https://www.instagram.com/_gaurav.create_?igsh=MTBkMmtoOHA1dWc4eQ==",
  discord: "https://discord.gg/4DAD6EfsB",
  youtube: "https://www.youtube.com/@Gaurav.CreateYT",
};

export const OWNER_EMAIL = "gauravakoli27@gmail.com";
