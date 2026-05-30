// Moderation domain types
module {
  public type ModerationAction = {
    #DeleteMessage;
    #MuteUser;
    #PinMessage;
    #UnpinMessage;
    #AutoFlagSpam;
    #AutoFlagProfanity;
    #AutoFlagScam;
    #AutoFlagLink;
    #FlagSuspiciousActivity;
  };

  public type ModerationLog = {
    id : Nat;
    action : ModerationAction;
    targetPrincipal : ?Principal;
    targetMessageId : ?Nat;
    reason : Text;
    timestamp : Int;
  };

  public type MutedUser = {
    principal : Principal;
    mutedUntil : Int;
    reason : Text;
  };
}
