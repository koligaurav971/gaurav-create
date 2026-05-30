import List "mo:core/List";
import UserTypes "types/users";
import ProjectTypes "types/projects";
import ChatTypes "types/chat";
import ModerationTypes "types/moderation";
import BlogTypes "types/blog";
import AnnouncementTypes "types/announcements";
import UsersMixin "mixins/users-api";
import ProjectsMixin "mixins/projects-api";
import ChatMixin "mixins/chat-api";
import ModerationMixin "mixins/moderation-api";
import AnnouncementsMixin "mixins/announcements-api";
import BlogMixin "mixins/blog-api";
import AnalyticsMixin "mixins/analytics-api";
import ProjectsLib "lib/projects";
import AnnouncementsLib "lib/announcements";
import BlogLib "lib/blog";

actor {
  // ─── Owner principal (one-time claimable) ────────────────────────────────
  let ownerState = { var principal : ?Principal = null };

  func isOwner(caller : Principal) : Bool {
    switch (ownerState.principal) {
      case (?owner) { owner == caller };
      case null { false };
    };
  };

  public shared ({ caller }) func claimOwner() : async { #ok : (); #err : Text } {
    switch (ownerState.principal) {
      case (?_) { #err("Owner already claimed") };
      case null {
        ownerState.principal := ?caller;
        #ok(());
      };
    };
  };

  public shared ({ caller }) func setOwnerPrincipal(newOwner : Principal) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    ownerState.principal := ?newOwner;
    #ok(());
  };

  public shared query ({ caller }) func isOwnerQuery() : async Bool {
    isOwner(caller);
  };

  // ─── Stable state ────────────────────────────────────────────────────────
  let users            = List.empty<UserTypes.UserProfile>();
  let lastSeen         = List.empty<(Principal, Int)>();
  let projects         = List.empty<ProjectTypes.Project>();
  let projectState     = { var nextId : Nat = 0 };
  let messages         = List.empty<ChatTypes.ChatMessage>();
  let chatState        = { var nextId : Nat = 0 };
  let mutedUsers       = List.empty<ModerationTypes.MutedUser>();
  let moderationLogs   = List.empty<ModerationTypes.ModerationLog>();
  let modState         = { var nextModId : Nat = 0 };
  let announcements    = List.empty<AnnouncementTypes.Announcement>();
  let announcementState = { var nextId : Nat = 0 };
  let blogPosts        = List.empty<BlogTypes.BlogPost>();
  let blogState        = { var nextId : Nat = 0 };

  // ─── Init / Seed ─────────────────────────────────────────────────────────
  ProjectsLib.seedProjects(projects, projectState);
  AnnouncementsLib.seedAnnouncements(announcements, announcementState);
  BlogLib.seedBlogPosts(blogPosts, blogState);

  // ─── Mixins ───────────────────────────────────────────────────────────────
  include UsersMixin(users, lastSeen, isOwner);
  include ProjectsMixin(projects, projectState, isOwner);
  include ChatMixin(messages, chatState, mutedUsers, moderationLogs, modState, users, isOwner);
  include ModerationMixin(mutedUsers, moderationLogs, modState, isOwner);
  include AnnouncementsMixin(announcements, announcementState, isOwner);
  include BlogMixin(blogPosts, blogState, isOwner);
  include AnalyticsMixin(users, projects, messages, lastSeen, isOwner);
}

