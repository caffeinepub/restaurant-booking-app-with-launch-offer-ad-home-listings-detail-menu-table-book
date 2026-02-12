import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Restaurant = {
    id : Nat;
    name : Text;
    description : Text;
    address : Text;
    menu : [MenuItem];
  };

  type MenuItem = {
    name : Text;
    description : Text;
    price : Nat;
  };

  type Booking = {
    id : Nat;
    restaurantId : Nat;
    customerName : Text;
    dateTime : Time.Time;
    partySize : Nat;
  };

  type Reel = {
    id : Nat;
    title : Text;
    videoUrl : Text;
    description : Text;
  };

  let restaurants = Map.empty<Nat, Restaurant>();
  let bookings = Map.empty<Nat, Booking>();
  let reels = Map.empty<Nat, Reel>();
  var nextRestaurantId = 1;
  var nextBookingId = 1;
  var nextReelId = 1;

  public shared ({ caller }) func initializeData() : async () {
    // Seed restaurants
    let sampleMenu : [MenuItem] = [{
      name = "Burger";
      description = "Juicy beef burger with cheese";
      price = 1500;
    }, {
      name = "Pasta";
      description = "Homemade pasta with tomato sauce";
      price = 1200;
    }];

    for (i in Nat.range(0, 5)) {
      let restaurant : Restaurant = {
        id = nextRestaurantId;
        name = "Hotel " # nextRestaurantId.toText();
        description = "Great place with awesome food";
        address = "Address " # nextRestaurantId.toText();
        menu = sampleMenu;
      };
      restaurants.add(nextRestaurantId, restaurant);
      nextRestaurantId += 1;
    };

    // Seed reels
    for (i in Nat.range(0, 5)) {
      let reel : Reel = {
        id = nextReelId;
        title = "Reel " # nextReelId.toText();
        videoUrl = "https://example.com/video" # nextReelId.toText();
        description = "Awesome restaurant advertisement";
      };
      reels.add(nextReelId, reel);
      nextReelId += 1;
    };
  };

  public query ({ caller }) func getAllRestaurants() : async [Restaurant] {
    restaurants.values().toArray();
  };

  public query ({ caller }) func getRestaurantDetails(id : Nat) : async ?Restaurant {
    restaurants.get(id);
  };

  public query ({ caller }) func getAllReels() : async [Reel] {
    reels.values().toArray();
  };

  public shared ({ caller }) func createBooking(
    restaurantId : Nat,
    customerName : Text,
    dateTime : Time.Time,
    partySize : Nat,
  ) : async Nat {
    switch (restaurants.get(restaurantId)) {
      case (null) { 0 };
      case (?_) {
        let booking : Booking = {
          id = nextBookingId;
          restaurantId;
          customerName;
          dateTime;
          partySize;
        };
        bookings.add(nextBookingId, booking);
        nextBookingId += 1;
        booking.id;
      };
    };
  };
};
