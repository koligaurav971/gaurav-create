// Blog domain types
module {
  public type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    excerpt : Text;
    createdAt : Int;
    isPublished : Bool;
  };
}
