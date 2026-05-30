// Project domain types
module {
  public type Project = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    thumbnailUrl : Text;
    contentUrl : Text;
    isFree : Bool;
    isFeatured : Bool;
    isTrending : Bool;
    viewCount : Nat;
    createdAt : Int;
  };
}
