import ChatTypes "../types/chat";
import ModerationTypes "../types/moderation";
import List "mo:core/List";
import Time "mo:core/Time";
import ModerationLib "moderation";
import Array "mo:core/Array";

module {
  public type ChatMessage = ChatTypes.ChatMessage;
  public type ChatRoom = ChatTypes.ChatRoom;
  public type ModerationLog = ModerationTypes.ModerationLog;
  public type MutedUser = ModerationTypes.MutedUser;

  public func send(
    messages : List.List<ChatMessage>,
    state : { var nextId : Nat },
    caller : Principal,
    senderName : Text,
    room : ChatRoom,
    content : Text,
    mutedUsers : List.List<MutedUser>,
    moderationLogs : List.List<ModerationLog>,
    modState : { var nextModId : Nat },
  ) : ?ChatMessage {
    // Reject if caller is muted
    if (ModerationLib.isMuted(mutedUsers, caller)) {
      return null;
    };

    let id = state.nextId;
    state.nextId += 1;

    // Run auto-moderation
    let modAction = ModerationLib.autoModerate(content, moderationLogs, modState, caller, id);

    // Scam/link messages are stored as deleted; other flags just logged
    let isDeleted = switch (modAction) {
      case (?#AutoFlagScam) { true };
      case (?#AutoFlagLink) { true };
      case (_) { false };
    };

    let msg : ChatMessage = {
      id = id;
      room = room;
      sender = caller;
      senderName = senderName;
      content = content;
      timestamp = Time.now();
      isDeleted = isDeleted;
      isPinned = false;
      reactions = [];
    };
    messages.add(msg);

    // Enforce 200-message limit per room (drop oldest)
    var roomCount = 0;
    for (m in messages.values()) {
      if (m.room == room) { roomCount += 1 };
    };
    if (roomCount > 200) {
      // Remove oldest message in room
      var removed = false;
      let kept = messages.filter(func(m : ChatMessage) : Bool {
        if (not removed and m.room == room) {
          removed := true;
          false;
        } else { true };
      });
      messages.truncate(0);
      for (m in kept.values()) { messages.add(m) };
    };

    if (isDeleted) { null } else { ?msg };
  };

  public func getMessages(
    messages : List.List<ChatMessage>,
    room : ChatRoom,
    limit : Nat,
  ) : [ChatMessage] {
    let buf = List.empty<ChatMessage>();
    for (m in messages.values()) {
      if (m.room == room and not m.isDeleted) { buf.add(m) };
    };
    let all = buf.toArray();
    let size = all.size();
    if (size <= limit) { all }
    else { Array.tabulate<ChatMessage>(limit, func(i) = all[size - limit + i]) };
  };

  public func deleteMessage(
    messages : List.List<ChatMessage>,
    id : Nat,
    moderationLogs : List.List<ModerationLog>,
    modState : { var nextModId : Nat },
  ) : Bool {
    var found = false;
    messages.mapInPlace(func(m : ChatMessage) : ChatMessage {
      if (m.id == id) { found := true; { m with isDeleted = true } } else { m };
    });
    if (found) {
      let logId = modState.nextModId;
      modState.nextModId += 1;
      moderationLogs.add({
        id = logId;
        action = #DeleteMessage;
        targetPrincipal = null;
        targetMessageId = ?id;
        reason = "Owner deleted message";
        timestamp = Time.now();
      });
    };
    found;
  };

  public func pinMessage(
    messages : List.List<ChatMessage>,
    id : Nat,
    pin : Bool,
    moderationLogs : List.List<ModerationLog>,
    modState : { var nextModId : Nat },
  ) : Bool {
    var found = false;
    messages.mapInPlace(func(m : ChatMessage) : ChatMessage {
      if (m.id == id) { found := true; { m with isPinned = pin } } else { m };
    });
    if (found) {
      let logId = modState.nextModId;
      modState.nextModId += 1;
      let action = if (pin) { #PinMessage } else { #UnpinMessage };
      moderationLogs.add({
        id = logId;
        action = action;
        targetPrincipal = null;
        targetMessageId = ?id;
        reason = if (pin) { "Message pinned" } else { "Message unpinned" };
        timestamp = Time.now();
      });
    };
    found;
  };

  public func addReaction(
    messages : List.List<ChatMessage>,
    messageId : Nat,
    emoji : Text,
    caller : Principal,
  ) : Bool {
    ignore caller;
    var found = false;
    messages.mapInPlace(func(m : ChatMessage) : ChatMessage {
      if (m.id == messageId and not m.isDeleted) {
        found := true;
        var updated = false;
        let newReactions = m.reactions.map<(Text, Nat), (Text, Nat)>(func(r : (Text, Nat)) {
          if (r.0 == emoji) { updated := true; (r.0, r.1 + 1) } else { r };
        });
        let finalReactions = if (updated) { newReactions } else {
          let rb = List.fromArray<(Text, Nat)>(newReactions);
          rb.add((emoji, 1));
          rb.toArray();
        };
        { m with reactions = finalReactions };
      } else { m };
    });
    found;
  };

  public func getPinned(
    messages : List.List<ChatMessage>,
    room : ChatRoom,
  ) : [ChatMessage] {
    let buf = List.empty<ChatMessage>();
    for (m in messages.values()) {
      if (m.room == room and m.isPinned and not m.isDeleted) { buf.add(m) };
    };
    buf.toArray();
  };
}
