// Announcements domain types
import ChatTypes "./chat";
module {
  public type Announcement = {
    id : Nat;
    room : ?ChatTypes.ChatRoom;
    content : Text;
    createdAt : Int;
  };
}
