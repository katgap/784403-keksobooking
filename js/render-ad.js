'use strict';

(function () {
  window.renderAd = function (localAd) {

    // объект author
    var localAuthor = {};
    localAuthor.avatar = localAd.author.avatar;

    // объект location
    var localLocation = {};
    localLocation.x = localAd.location.x;
    localLocation.y = localAd.location.y;

    // объект offer
    var localOffer = {};

    // "title"
    localOffer.title = localAd.offer.title;

    // "address"
    localOffer.address = localAd.offer.address;

    // "price"
    localOffer.price = localAd.offer.price;

    // "type"
    localOffer.type = localAd.offer.type;

    // "rooms"
    localOffer.rooms = localAd.offer.rooms;

    // "guests"
    localOffer.guests = localAd.offer.guests;

    // "checkin"
    localOffer.checkin = localAd.offer.checkin;

    // "checkout"
    localOffer.checkout = localAd.offer.checkout;

    // "features"
    localOffer.features = localAd.offer.features;

    // "description"
    localOffer.description = localAd.offer.description;

    // "photos"
    localOffer.photos = localAd.offer.photos;

    localAd.author = localAuthor;
    localAd.offer = localOffer;
    localAd.location = localLocation;

    return localAd;
  };
})();

