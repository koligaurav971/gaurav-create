import ProjectTypes "../types/projects";
import List "mo:core/List";
import ProjectsLib "../lib/projects";

mixin (
  projects : List.List<ProjectTypes.Project>,
  projectState : { var nextId : Nat },
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func createProject(
    title : Text,
    description : Text,
    category : Text,
    thumbnailUrl : Text,
    contentUrl : Text,
    isFree : Bool,
    isFeatured : Bool,
  ) : async { #ok : ProjectTypes.Project; #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    let project = ProjectsLib.create(projects, projectState, title, description, category, thumbnailUrl, contentUrl, isFree, isFeatured);
    #ok(project);
  };

  public shared ({ caller }) func updateProject(
    id : Nat,
    title : Text,
    description : Text,
    category : Text,
    thumbnailUrl : Text,
    contentUrl : Text,
    isFree : Bool,
    isFeatured : Bool,
  ) : async { #ok : ProjectTypes.Project; #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    switch (ProjectsLib.update(projects, id, title, description, category, thumbnailUrl, contentUrl, isFree, isFeatured)) {
      case (?p) { #ok(p) };
      case null { #err("Project not found") };
    };
  };

  public shared ({ caller }) func deleteProject(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ProjectsLib.remove(projects, id)) { #ok(()) } else { #err("Project not found") };
  };

  public shared query func getProjects(
    category : ?Text,
    featured : ?Bool,
  ) : async [ProjectTypes.Project] {
    ProjectsLib.getFiltered(projects, category, featured);
  };

  public shared query func getProject(id : Nat) : async ?ProjectTypes.Project {
    ProjectsLib.getById(projects, id);
  };

  public shared ({ caller }) func incrementProjectView(id : Nat) : async () {
    ignore caller;
    ProjectsLib.incrementView(projects, id);
  };

  public shared ({ caller }) func setProjectFeatured(
    id : Nat,
    featured : Bool,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ProjectsLib.setFeatured(projects, id, featured)) { #ok(()) } else { #err("Project not found") };
  };

  public shared ({ caller }) func setProjectTrending(
    id : Nat,
    trending : Bool,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (ProjectsLib.setTrending(projects, id, trending)) { #ok(()) } else { #err("Project not found") };
  };
}
