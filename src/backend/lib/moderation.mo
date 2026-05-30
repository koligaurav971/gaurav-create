import Types "../types/moderation";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  public type MutedUser = Types.MutedUser;
  public type ModerationLog = Types.ModerationLog;
  public type ModerationAction = Types.ModerationAction;

  public func muteUser(
    mutedUsers : List.List<MutedUser>,
    target : Principal,
    durationSecs : Nat,
    reason : Text,
    moderationLogs : List.List<ModerationLog>,
    state : { var nextModId : Nat },
  ) : () {
    let expiresAt : Int = Time.now() + (durationSecs * 1_000_000_000 : Int);
    // Remove existing mute entry if present
    let kept = mutedUsers.filter(func(m : MutedUser) : Bool { m.principal != target });
    mutedUsers.truncate(0);
    for (m in kept.values()) { mutedUsers.add(m) };
    mutedUsers.add({ principal = target; mutedUntil = expiresAt; reason = reason });
    let logId = state.nextModId;
    state.nextModId += 1;
    moderationLogs.add({
      id = logId;
      action = #MuteUser;
      targetPrincipal = ?target;
      targetMessageId = null;
      reason = reason;
      timestamp = Time.now();
    });
  };

  public func unmuteUser(mutedUsers : List.List<MutedUser>, target : Principal) : Bool {
    let sizeBefore = mutedUsers.size();
    let kept = mutedUsers.filter(func(m : MutedUser) : Bool { m.principal != target });
    mutedUsers.truncate(0);
    for (m in kept.values()) { mutedUsers.add(m) };
    mutedUsers.size() != sizeBefore;
  };

  public func getMuted(mutedUsers : List.List<MutedUser>) : [MutedUser] {
    mutedUsers.toArray();
  };

  public func getLogs(moderationLogs : List.List<ModerationLog>, limit : Nat) : [ModerationLog] {
    let all = moderationLogs.toArray();
    let size = all.size();
    if (size <= limit) { all }
    else {
      let start : Nat = size - limit;
      Array.tabulate<ModerationLog>(limit, func(i) = all[start + i]);
    };
  };

  public func isMuted(mutedUsers : List.List<MutedUser>, p : Principal) : Bool {
    let now = Time.now();
    switch (mutedUsers.find(func(m : MutedUser) : Bool { m.principal == p })) {
      case (?(m)) { m.mutedUntil > now };
      case null { false };
    };
  };

  public func autoModerate(
    content : Text,
    moderationLogs : List.List<ModerationLog>,
    state : { var nextModId : Nat },
    sender : Principal,
    messageId : Nat,
  ) : ?ModerationAction {
    let lower = content.toLower();

    // Scam keyword check
    let scamKeywords = ["free money", "click here", "win prize", "crypto", "nft", "giveaway", "dm me", "limited offer"];
    var isScam = false;
    for (kw in scamKeywords.vals()) {
      if (lower.contains(#text kw)) { isScam := true };
    };

    // Link check
    let isLink = lower.contains(#text "http://") or lower.contains(#text "https://")
      or lower.contains(#text ".com") or lower.contains(#text ".net") or lower.contains(#text ".io")
      or lower.contains(#text ".org") or lower.contains(#text ".xyz");

    // Profanity check (basic blocklist)
    let profanityList = ["shit", "fuck", "asshole", "bitch", "cunt", "dick", "pussy", "bastard"];
    var hasProfanity = false;
    for (word in profanityList.vals()) {
      if (lower.contains(#text word)) { hasProfanity := true };
    };

    // Spam check: repeated characters (>5 same in sequence)
    var maxRepeat = 0;
    var curRepeat = 1;
    let chars = content.toArray();
    var idx = 1;
    while (idx < chars.size()) {
      if (chars[idx] == chars[idx - 1]) {
        curRepeat += 1;
        if (curRepeat > maxRepeat) { maxRepeat := curRepeat };
      } else {
        curRepeat := 1;
      };
      idx += 1;
    };
    let isSpam = maxRepeat > 5;

    // Determine action (highest severity first)
    let action : ?ModerationAction = if (isScam) { ?#AutoFlagScam }
      else if (isLink) { ?#AutoFlagLink }
      else if (hasProfanity) { ?#AutoFlagProfanity }
      else if (isSpam) { ?#AutoFlagSpam }
      else { null };

    switch (action) {
      case (?a) {
        let logId = state.nextModId;
        state.nextModId += 1;
        moderationLogs.add({
          id = logId;
          action = a;
          targetPrincipal = ?sender;
          targetMessageId = ?messageId;
          reason = "Auto-moderation: " # debug_show(a);
          timestamp = Time.now();
        });
        ?a;
      };
      case null { null };
    };
  };
}
