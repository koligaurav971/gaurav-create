import UserTypes "../types/users";
import ProjectTypes "../types/projects";
import ChatTypes "../types/chat";
import List "mo:core/List";
import UsersLib "../lib/users";

mixin (
  users : List.List<UserTypes.UserProfile>,
  projects : List.List<ProjectTypes.Project>,
  messages : List.List<ChatTypes.ChatMessage>,
  lastSeen : List.List<(Principal, Int)>,
  isOwner : Principal -> Bool,
) {
  public shared query ({ caller }) func getAnalytics() : async {
    totalUsers : Nat;
    totalProjects : Nat;
    totalMessages : Nat;
    activeUsersToday : Nat;
  } {
    if (not isOwner(caller)) { return { totalUsers = 0; totalProjects = 0; totalMessages = 0; activeUsersToday = 0 } };
    {
      totalUsers = users.size();
      totalProjects = projects.size();
      totalMessages = messages.size();
      activeUsersToday = UsersLib.countOnline(lastSeen);
    };
  };
}
