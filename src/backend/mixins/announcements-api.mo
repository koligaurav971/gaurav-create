import AnnouncementTypes "../types/announcements";
import ChatTypes "../types/chat";
import List "mo:core/List";
import AnnouncementsLib "../lib/announcements";

mixin (
  announcements : List.List<AnnouncementTypes.Announcement>,
  announcementState : { var nextId : Nat },
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func createAnnouncement(
    room : ?ChatTypes.ChatRoom,
    content : Text,
  ) : async { #ok : AnnouncementTypes.Announcement; #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    let a = AnnouncementsLib.create(announcements, announcementState, room, content);
    #ok(a);
  };

  public shared ({ caller }) func deleteAnnouncement(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (AnnouncementsLib.remove(announcements, id)) { #ok(()) } else { #err("Announcement not found") };
  };

  public shared query func getAnnouncements(
    room : ?ChatTypes.ChatRoom,
  ) : async [AnnouncementTypes.Announcement] {
    AnnouncementsLib.getAll(announcements, room);
  };
}
