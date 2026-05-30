import Types "../types/projects";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Project = Types.Project;

  public func create(
    projects : List.List<Project>,
    state : { var nextId : Nat },
    title : Text,
    description : Text,
    category : Text,
    thumbnailUrl : Text,
    contentUrl : Text,
    isFree : Bool,
    isFeatured : Bool,
  ) : Project {
    let id = state.nextId;
    state.nextId += 1;
    let project : Project = {
      id = id;
      title = title;
      description = description;
      category = category;
      thumbnailUrl = thumbnailUrl;
      contentUrl = contentUrl;
      isFree = isFree;
      isFeatured = isFeatured;
      isTrending = false;
      viewCount = 0;
      createdAt = Time.now();
    };
    projects.add(project);
    project;
  };

  public func update(
    projects : List.List<Project>,
    id : Nat,
    title : Text,
    description : Text,
    category : Text,
    thumbnailUrl : Text,
    contentUrl : Text,
    isFree : Bool,
    isFeatured : Bool,
  ) : ?Project {
    var result : ?Project = null;
    projects.mapInPlace(func(p : Project) : Project {
      if (p.id == id) {
        let updated = { p with title = title; description = description; category = category; thumbnailUrl = thumbnailUrl; contentUrl = contentUrl; isFree = isFree; isFeatured = isFeatured };
        result := ?updated;
        updated;
      } else { p };
    });
    result;
  };

  public func remove(projects : List.List<Project>, id : Nat) : Bool {
    let sizeBefore = projects.size();
    let kept = projects.filter(func(p : Project) : Bool { p.id != id });
    if (kept.size() != sizeBefore) {
      projects.truncate(0);
      for (p in kept.values()) { projects.add(p) };
      true;
    } else {
      false;
    };
  };

  public func getFiltered(
    projects : List.List<Project>,
    category : ?Text,
    featured : ?Bool,
  ) : [Project] {
    let filtered = projects.filter(func(p : Project) : Bool {
      let catMatch = switch (category) {
        case (?c) { p.category == c };
        case null { true };
      };
      let featMatch = switch (featured) {
        case (?f) { p.isFeatured == f };
        case null { true };
      };
      catMatch and featMatch;
    });
    filtered.toArray();
  };

  public func getById(projects : List.List<Project>, id : Nat) : ?Project {
    projects.find(func(p : Project) : Bool { p.id == id });
  };

  public func incrementView(projects : List.List<Project>, id : Nat) : () {
    projects.mapInPlace(func(p : Project) : Project {
      if (p.id == id) { { p with viewCount = p.viewCount + 1 } } else { p };
    });
  };

  public func setFeatured(projects : List.List<Project>, id : Nat, featured : Bool) : Bool {
    var found = false;
    projects.mapInPlace(func(p : Project) : Project {
      if (p.id == id) {
        found := true;
        { p with isFeatured = featured };
      } else { p };
    });
    found;
  };

  public func setTrending(projects : List.List<Project>, id : Nat, trending : Bool) : Bool {
    var found = false;
    projects.mapInPlace(func(p : Project) : Project {
      if (p.id == id) {
        found := true;
        { p with isTrending = trending };
      } else { p };
    });
    found;
  };

  public func seedProjects(
    projects : List.List<Project>,
    state : { var nextId : Nat },
  ) : () {
    if (projects.size() > 0) { return };
    let seeds : [(Text, Text, Text, Bool, Bool)] = [
      ("React Admin Dashboard", "A fully-featured cyberpunk-styled React admin dashboard with charts, tables, and dark UI components.", "React", true, true),
      ("Cyberpunk UI Kit", "A stunning collection of futuristic UI components with neon glow effects, glassmorphism, and animations.", "UI Kit", true, true),
      ("Motoko Starter Template", "A production-ready Motoko canister starter with multi-file architecture, types, and testing setup.", "Motoko", true, false),
      ("Framer Motion Animations Pack", "50+ cinematic animations and motion presets for React apps, ready to plug in.", "Animation", false, false),
      ("Tailwind Component Library", "Premium dark-mode Tailwind CSS components: cards, buttons, modals, navbars, and more.", "Tailwind", true, true),
    ];
    for ((title, description, category, isFree, isFeatured) in seeds.vals()) {
      ignore create(projects, state, title, description, category, "", "", isFree, isFeatured);
    };
    ignore setTrending(projects, 0, true);
    ignore setTrending(projects, 1, true);
  };
}
