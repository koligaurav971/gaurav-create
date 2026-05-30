// Chat domain types
module {
  public type ChatRoom = {
    #Free;
    #Premium;
    #VIP;
  };

  public type ChatMessage = {
    id : Nat;
    room : ChatRoom;
    sender : Principal;
    senderName : Text;
    content : Text;
    timestamp : Int;
    isDeleted : Bool;
    isPinned : Bool;
    reactions : [(Text, Nat)];
  };
}
