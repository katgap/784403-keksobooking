'use strict';

(function () {
  window.renderAd = function () {
    // общий объект
    var localAd = {};

    // объект author
    var localAuthor = {};
    var avatarNumber = window.auxiliaryFunctions.getRandom(1, 8);
    var flagAvatar = window.auxiliaryFunctions.findDuplicateValue(window.data.arrayAvatarNumbers, avatarNumber);
    while (flagAvatar) {
      avatarNumber = window.auxiliaryFunctions.getRandom(1, 8);
      flagAvatar = window.auxiliaryFunctions.findDuplicateValue(window.data.arrayAvatarNumbers, avatarNumber);
    }
    localAuthor.avatar = 'img/avatars/user' + '0' + avatarNumber + '.png';
    window.data.arrayAvatarNumbers[window.data.arrayAvatarNumbers.length] = avatarNumber;

    // объект location
    var localLocation = {};
    localLocation.x = window.auxiliaryFunctions.getRandom(0, 1200);
    localLocation.y = window.auxiliaryFunctions.getRandom(130, 630);

    // объект offer
    var localOffer = {};

    // "title": строка, заголовок предложения, одно из фиксированных значений, значения не повторяются
    var indexOfTypes;
    var typeOfAccommodation;
    var choiceOfAccommodationType = function () {
      do {
        indexOfTypes = window.auxiliaryFunctions.getRandom(0, 3);
        if (indexOfTypes === 0) {
          typeOfAccommodation = window.data.types.flat;
          window.data.arrayRandomTitles = window.data.arrayRandomTitlesFlat;
        } else if (indexOfTypes === 1) {
          typeOfAccommodation = window.data.types.palace;
          window.data.arrayRandomTitles = window.data.arrayRandomTitlesPalace;
        } else if (indexOfTypes === 2) {
          typeOfAccommodation = window.data.types.house;
          window.data.arrayRandomTitles = window.data.arrayRandomTitlesHouse;
        } else if (indexOfTypes === 3) {
          typeOfAccommodation = window.data.types.bungalo;
          window.data.arrayRandomTitles = window.data.arrayRandomTitlesBungalo;
        }
      } while (window.data.arrayRandomTitles.length > 2);
    };
    choiceOfAccommodationType();
    var indexTitle = window.auxiliaryFunctions.getRandom(0, 1);
    var flagTitle = window.auxiliaryFunctions.findDuplicateValue(window.data.arrayRandomTitles, typeOfAccommodation.titles[indexTitle]);
    while (flagTitle) {
      choiceOfAccommodationType();
      indexTitle = window.auxiliaryFunctions.getRandom(0, 1);
      flagTitle = window.auxiliaryFunctions.findDuplicateValue(window.data.arrayRandomTitles, typeOfAccommodation.titles[indexTitle]);
    }
    localOffer.title = typeOfAccommodation.titles[indexTitle];
    window.data.arrayRandomTitles[window.data.arrayRandomTitles.length] = typeOfAccommodation.titles[indexTitle];

    // "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    localOffer.address = localLocation.x + ', ' + localLocation.y;

    // "price": число, случайная цена от 1000 до 1000000
    localOffer.price = window.auxiliaryFunctions.getRandom(1000, 1000000);

    // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    localOffer.type = typeOfAccommodation.oneOfTypes;

    // "rooms": число, случайное количество комнат от 1 до 5
    localOffer.rooms = window.auxiliaryFunctions.getRandom(1, 5);

    // "guests": число, случайное количество гостей, которое можно разместить
    localOffer.guests = Math.ceil(Math.random() * 100);

    // "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    var indexCheckin = window.auxiliaryFunctions.getRandom(0, 2);
    localOffer.checkin = window.data.times[indexCheckin];

    // "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    var indexCheckout = window.auxiliaryFunctions.getRandom(0, 2);
    localOffer.checkout = window.data.times[indexCheckout];

    // "features": массив строк случайной длины из предложенных
    var numberOfFeatures = window.auxiliaryFunctions.getRandom(1, 6);
    var myFeatures = [];
    for (var i = 0; i < numberOfFeatures; i++) {
      var indexFeatures = window.auxiliaryFunctions.getRandom(0, 5);
      var flagFeatures = window.auxiliaryFunctions.findDuplicateValue(myFeatures, window.data.arrayFeatures[indexFeatures]);
      while (flagFeatures) {
        indexFeatures = window.auxiliaryFunctions.getRandom(0, 5);
        flagFeatures = window.auxiliaryFunctions.findDuplicateValue(myFeatures, window.data.arrayFeatures[indexFeatures]);
      }
      myFeatures[myFeatures.length] = window.data.arrayFeatures[indexFeatures];
    }
    localOffer.features = myFeatures;

    // "description": пустая строка
    localOffer.description = '';

    // "photos": массив из строк, расположенных в произвольном порядке
    localOffer.photos = window.auxiliaryFunctions.changeOrder(window.data.arrayPhotos);

    localAd.author = localAuthor;
    localAd.offer = localOffer;
    localAd.location = localLocation;

    return localAd;
  };
})();

