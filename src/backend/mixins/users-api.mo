import UserTypes "../types/users";
import List "mo:core/List";
import UsersLib "../lib/users";
import Time "mo:core/Time";

mixin (
  users : List.List<UserTypes.UserProfile>,
  lastSeen : List.List<(Principal, Int)>,
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func registerOrUpdateUser(
    username : Text,
    avatarUrl : Text,
  ) : async { #ok : UserTypes.UserProfile; #err : Text } {
    let profile = UsersLib.register(users, caller, username, avatarUrl);
    // Update lastSeen
    let now = Time.now();
    let keptSeen = lastSeen.filter(func(e : (Principal, Int)) : Bool { e.0 != caller });
    lastSeen.truncate(0);
    for (e in keptSeen.values()) { lastSeen.add(e) };
    lastSeen.add((caller, now));
    #ok(profile);
  };

  public shared query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UsersLib.getByPrincipal(users, caller);
  };

  public shared query func getUserProfile(p : Principal) : async ?UserTypes.UserProfile {
    UsersLib.getByPrincipal(users, p);
  };

  public shared ({ caller }) func setMembershipTier(
    target : Principal,
    tier : UserTypes.MembershipTier,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    let ok = UsersLib.setTier(users, target, tier);
    if (ok) { #ok(()) } else { #err("User not found") };
  };

  public shared query ({ caller }) func getAllUsers() : async [UserTypes.UserProfile] {
    if (not isOwner(caller)) { return [] };
    UsersLib.getAll(users);
  };

  public shared query func getOnlineUserCount() : async Nat {
    UsersLib.countOnline(lastSeen);
  };
}
