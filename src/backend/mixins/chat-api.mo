import ChatTypes "../types/chat";
import ModerationTypes "../types/moderation";
import List "mo:core/List";
import UserTypes "../types/users";
import ChatLib "../lib/chat";
import UsersLib "../lib/users";

mixin (
  messages : List.List<ChatTypes.ChatMessage>,
  chatState : { var nextId : Nat },
  mutedUsers : List.List<ModerationTypes.MutedUser>,
  moderationLogs : List.List<ModerationTypes.ModerationLog>,
  modState : { var nextModId : Nat },
  users : List.List<UserTypes.UserProfile>,
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func sendMessage(
    room : ChatTypes.ChatRoom,
    content : Text,
  ) : async { #ok : ChatTypes.ChatMessage; #err : Text } {
    let senderName = switch (UsersLib.getByPrincipal(users, caller)) {
      case (?u) { u.username };
      case null { "Anonymous" };
    };
    switch (ChatLib.send(messages, chatState, caller, senderName, room, content, mutedUsers, moderationLogs, modState)) {
      case (?msg) { #ok(msg) };
      case null { #err("Message blocked: you are muted or content violates community rules") };
    };
  };

  public shared query func getMessages(
    room : ChatTypes.ChatRoom,
    limit : Nat,
  ) : async [ChatTypes.ChatMessage] {
    ChatLib.getMessages(messages, room, limit);
  };

  public shared ({ caller }) func deleteMessage(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ChatLib.deleteMessage(messages, id, moderationLogs, modState)) { #ok(()) } else { #err("Message not found") };
  };

  public shared ({ caller }) func pinMessage(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ChatLib.pinMessage(messages, id, true, moderationLogs, modState)) { #ok(()) } else { #err("Message not found") };
  };

  public shared ({ caller }) func unpinMessage(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ChatLib.pinMessage(messages, id, false, moderationLogs, modState)) { #ok(()) } else { #err("Message not found") };
  };

  public shared ({ caller }) func addReaction(
    messageId : Nat,
    emoji : Text,
  ) : async { #ok : (); #err : Text } {
    if (ChatLib.addReaction(messages, messageId, emoji, caller)) { #ok(()) } else { #err("Message not found") };
  };

  public shared query func getPinnedMessages(
    room : ChatTypes.ChatRoom,
  ) : async [ChatTypes.ChatMessage] {
    ChatLib.getPinned(messages, room);
  };
}
