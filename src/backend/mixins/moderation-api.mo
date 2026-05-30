import ModerationTypes "../types/moderation";
import List "mo:core/List";
import ModerationLib "../lib/moderation";

mixin (
  mutedUsers : List.List<ModerationTypes.MutedUser>,
  moderationLogs : List.List<ModerationTypes.ModerationLog>,
  modState : { var nextModId : Nat },
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func muteUser(
    target : Principal,
    durationSecs : Nat,
    reason : Text,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    ModerationLib.muteUser(mutedUsers, target, durationSecs, reason, moderationLogs, modState);
    #ok(());
  };

  public shared ({ caller }) func unmuteUser(
    target : Principal,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    ignore ModerationLib.unmuteUser(mutedUsers, target);
    #ok(());
  };

  public shared query ({ caller }) func getMutedUsers() : async [ModerationTypes.MutedUser] {
    if (not isOwner(caller)) { return [] };
    ModerationLib.getMuted(mutedUsers);
  };

  public shared query ({ caller }) func getModerationLogs(
    limit : Nat,
  ) : async [ModerationTypes.ModerationLog] {
    if (not isOwner(caller)) { return [] };
    ModerationLib.getLogs(moderationLogs, limit);
  };

  public shared query func isUserMuted(p : Principal) : async Bool {
    ModerationLib.isMuted(mutedUsers, p);
  };
}
