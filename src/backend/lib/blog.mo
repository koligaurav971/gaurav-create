import Types "../types/blog";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type BlogPost = Types.BlogPost;

  public func create(
    posts : List.List<BlogPost>,
    state : { var nextId : Nat },
    title : Text,
    content : Text,
    excerpt : Text,
  ) : BlogPost {
    let id = state.nextId;
    state.nextId += 1;
    let post : BlogPost = {
      id = id;
      title = title;
      content = content;
      excerpt = excerpt;
      createdAt = Time.now();
      isPublished = false;
    };
    posts.add(post);
    post;
  };

  public func update(
    posts : List.List<BlogPost>,
    id : Nat,
    title : Text,
    content : Text,
    excerpt : Text,
  ) : ?BlogPost {
    var result : ?BlogPost = null;
    posts.mapInPlace(
      func(p : BlogPost) : BlogPost {
        if (p.id == id) {
          let updated : BlogPost = { p with title = title; content = content; excerpt = excerpt };
          result := ?updated;
          updated;
        } else { p };
      }
    );
    result;
  };

  public func remove(posts : List.List<BlogPost>, id : Nat) : Bool {
    let sizeBefore = posts.size();
    posts.retain(func(p : BlogPost) : Bool { p.id != id });
    posts.size() != sizeBefore;
  };

  public func getAll(posts : List.List<BlogPost>, published : ?Bool) : [BlogPost] {
    switch (published) {
      case null { posts.toArray() };
      case (?pub) {
        posts.toArray().filter(func(p : BlogPost) : Bool { p.isPublished == pub });
      };
    };
  };

  public func getById(posts : List.List<BlogPost>, id : Nat) : ?BlogPost {
    posts.find(func(p : BlogPost) : Bool { p.id == id });
  };

  public func publish(posts : List.List<BlogPost>, id : Nat) : Bool {
    var found = false;
    posts.mapInPlace(
      func(p : BlogPost) : BlogPost {
        if (p.id == id) {
          found := true;
          { p with isPublished = not p.isPublished };
        } else { p };
      }
    );
    found;
  };

  public func seedBlogPosts(
    posts : List.List<BlogPost>,
    state : { var nextId : Nat },
  ) : () {
    if (posts.size() > 0) { return };
    let p1 = create(
      posts, state,
      "Welcome to Gaurav.Create",
      "Welcome to the Gaurav.Create platform - a futuristic creator hub for builders, designers, and innovators. Explore premium templates, join the community chat, and unlock exclusive resources.",
      "The premier destination for futuristic creators."
    );
    ignore publish(posts, p1.id);
    let p2 = create(
      posts, state,
      "Building the Future of Creator Platforms",
      "In this post, we dive deep into the architecture and vision behind Gaurav.Create - how we built a cyberpunk-inspired, community-driven platform on the Internet Computer.",
      "Behind the scenes of building Gaurav.Create on the Internet Computer."
    );
    ignore publish(posts, p2.id);
  };
}
