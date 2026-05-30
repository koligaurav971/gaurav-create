import Types "../types/users";
import Time "mo:core/Time";
import List "mo:core/List";

module {
  public type UserProfile = Types.UserProfile;
  public type MembershipTier = Types.MembershipTier;

  public func register(
    users : List.List<UserProfile>,
    caller : Principal,
    username : Text,
    avatarUrl : Text,
  ) : UserProfile {
    // Update existing profile if found
    switch (users.find(func(u : UserProfile) : Bool { u.principal == caller })) {
      case (?existing) {
        let updated = { existing with username = username; avatarUrl = avatarUrl };
        users.mapInPlace(func(u : UserProfile) : UserProfile {
          if (u.principal == caller) { updated } else { u };
        });
        updated;
      };
      case null {
        let profile : UserProfile = {
          principal = caller;
          username = username;
          avatarUrl = avatarUrl;
          tier = #Free;
          joinedAt = Time.now();
        };
        users.add(profile);
        profile;
      };
    };
  };

  public func getByPrincipal(
    users : List.List<UserProfile>,
    p : Principal,
  ) : ?UserProfile {
    users.find(func(u : UserProfile) : Bool { u.principal == p });
  };

  public func setTier(
    users : List.List<UserProfile>,
    target : Principal,
    tier : MembershipTier,
  ) : Bool {
    var found = false;
    users.mapInPlace(func(u : UserProfile) : UserProfile {
      if (u.principal == target) {
        found := true;
        { u with tier = tier };
      } else { u };
    });
    found;
  };

  public func getAll(users : List.List<UserProfile>) : [UserProfile] {
    users.toArray();
  };

  public func isUserOnline(p : Principal, lastSeen : List.List<(Principal, Int)>) : Bool {
    let tenMinutesNs : Int = 10 * 60 * 1_000_000_000;
    let cutoff = Time.now() - tenMinutesNs;
    switch (lastSeen.find(func(entry : (Principal, Int)) : Bool { entry.0 == p })) {
      case (?(_, ts)) { ts >= cutoff };
      case null { false };
    };
  };

  public func countOnline(lastSeen : List.List<(Principal, Int)>) : Nat {
    let tenMinutesNs : Int = 10 * 60 * 1_000_000_000;
    let cutoff = Time.now() - tenMinutesNs;
    var count = 0;
    for ((_, ts) in lastSeen.values()) {
      if (ts >= cutoff) { count += 1 };
    };
    count;
  };
}
