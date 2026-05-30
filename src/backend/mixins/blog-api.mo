import BlogTypes "../types/blog";
import List "mo:core/List";
import BlogLib "../lib/blog";

mixin (
  blogPosts : List.List<BlogTypes.BlogPost>,
  blogState : { var nextId : Nat },
  isOwner : Principal -> Bool,
) {
  public shared ({ caller }) func createBlogPost(
    title : Text,
    content : Text,
    excerpt : Text,
  ) : async { #ok : BlogTypes.BlogPost; #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    let post = BlogLib.create(blogPosts, blogState, title, content, excerpt);
    #ok(post);
  };

  public shared ({ caller }) func updateBlogPost(
    id : Nat,
    title : Text,
    content : Text,
    excerpt : Text,
  ) : async { #ok : BlogTypes.BlogPost; #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    switch (BlogLib.update(blogPosts, id, title, content, excerpt)) {
      case (?p) { #ok(p) };
      case null { #err("Post not found") };
    };
  };

  public shared ({ caller }) func deleteBlogPost(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (BlogLib.remove(blogPosts, id)) { #ok(()) } else { #err("Post not found") };
  };

  public shared query func getBlogPosts(
    published : ?Bool,
  ) : async [BlogTypes.BlogPost] {
    BlogLib.getAll(blogPosts, published);
  };

  public shared query func getBlogPost(id : Nat) : async ?BlogTypes.BlogPost {
    BlogLib.getById(blogPosts, id);
  };

  public shared ({ caller }) func publishBlogPost(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    if (not isOwner(caller)) { return #err("Unauthorized") };
    if (BlogLib.publish(blogPosts, id)) { #ok(()) } else { #err("Post not found") };
  };
}
