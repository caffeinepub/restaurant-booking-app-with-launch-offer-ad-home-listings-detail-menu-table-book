import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  type OldRestaurant = {
    id : Nat;
    name : Text;
    description : Text;
    address : Text;
    menu : [OldMenuItem];
  };

  type OldMenuItem = {
    name : Text;
    description : Text;
    price : Nat;
  };

  type OldBooking = {
    id : Nat;
    restaurantId : Nat;
    customerName : Text;
    dateTime : Int;
    partySize : Nat;
  };

  type OldReel = {
    id : Nat;
    title : Text;
    videoUrl : Text;
    description : Text;
  };

  type OldActor = {
    restaurants : Map.Map<Nat, OldRestaurant>;
    bookings : Map.Map<Nat, OldBooking>;
    reels : Map.Map<Nat, OldReel>;
    nextRestaurantId : Nat;
    nextBookingId : Nat;
    nextReelId : Nat;
  };

  type NewRestaurant = {
    id : Nat;
    name : Text;
    description : Text;
    address : Text;
    menu : [NewMenuItem];
  };

  type NewMenuItem = {
    name : Text;
    description : Text;
    price : Nat;
  };

  type NewBooking = {
    id : Nat;
    restaurantId : Nat;
    customerName : Text;
    dateTime : Int;
    partySize : Nat;
  };

  type NewReel = {
    id : Nat;
    title : Text;
    videoUrl : Text;
    description : Text;
  };

  type NewActor = {
    restaurants : Map.Map<Nat, NewRestaurant>;
    bookings : Map.Map<Nat, NewBooking>;
    reels : Map.Map<Nat, NewReel>;
    nextRestaurantId : Nat;
    nextBookingId : Nat;
    nextReelId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      restaurants = old.restaurants;
      bookings = old.bookings;
      reels = old.reels;
      nextRestaurantId = old.nextRestaurantId;
      nextBookingId = old.nextBookingId;
      nextReelId = old.nextReelId;
    };
  };
};
