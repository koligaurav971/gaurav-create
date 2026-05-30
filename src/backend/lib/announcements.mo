import Types "../types/announcements";
import ChatTypes "../types/chat";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Announcement = Types.Announcement;
  public type ChatRoom = ChatTypes.ChatRoom;

  public func create(
    announcements : List.List<Announcement>,
    state : { var nextId : Nat },
    room : ?ChatRoom,
    content : Text,
  ) : Announcement {
    let id = state.nextId;
    state.nextId += 1;
    let announcement : Announcement = {
      id = id;
      room = room;
      content = content;
      createdAt = Time.now();
    };
    announcements.add(announcement);
    announcement;
  };

  public func remove(announcements : List.List<Announcement>, id : Nat) : Bool {
    let sizeBefore = announcements.size();
    let kept = announcements.filter(func(a : Announcement) : Bool { a.id != id });
    announcements.clear();
    announcements.append(kept);
    announcements.size() != sizeBefore;
  };

  public func getAll(
    announcements : List.List<Announcement>,
    room : ?ChatRoom,
  ) : [Announcement] {
    announcements.toArray().filter(func(a : Announcement) : Bool {
      switch (room) {
        case (?r) {
          switch (a.room) {
            case (?ar) { ar == r };
            case null { true };
          }
        };
        case null { true };
      }
    });
  };

  public func seedAnnouncements(
    announcements : List.List<Announcement>,
    state : { var nextId : Nat },
  ) : () {
    if (announcements.size() > 0) { return };
    ignore create(
      announcements, state, null,
      "Welcome to Gaurav.Create community! Read the rules and enjoy!"
    );
  };
}
