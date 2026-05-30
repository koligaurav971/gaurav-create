// Cross-cutting types shared across all domains
module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type Result<T, E> = { #ok : T; #err : E };
}
