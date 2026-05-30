// User domain types
module {
  public type MembershipTier = {
    #Free;
    #Premium;
    #VIP;
  };

  public type UserProfile = {
    principal : Principal;
    username : Text;
    avatarUrl : Text;
    tier : MembershipTier;
    joinedAt : Int;
  };
}
