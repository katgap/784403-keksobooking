'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var types = ['palace', 'flat', 'house', 'bungalo'];

var times = ['12:00', '13:00', '14:00'];

var arrayFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var arrayAvatarNumbers = [];
var arrayRandomTitles = [];

var getRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var changeOrder = function (array) {
  var j = 0;
  var temp = 0;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

var findDuplicateValue = function (array, value) {
  var flag = false;
  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      flag = true;
    }
  }
  return flag;
};

var renderAd = function () {
  // общий объект
  var localAd = {};

  // объект author
  var localAuthor = {};
  var avatarNumber = getRandom(1, 8);
  var flagAvatar = findDuplicateValue(arrayAvatarNumbers, avatarNumber);
  while (flagAvatar) {
    avatarNumber = getRandom(1, 8);
    flagAvatar = findDuplicateValue(arrayAvatarNumbers, avatarNumber);
  }
  localAuthor.avatar = 'img/avatars/user' + '0' + avatarNumber + '.png';
  arrayAvatarNumbers[arrayAvatarNumbers.length] = avatarNumber;

  // объект location
  var localLocation = {};
  localLocation.x = getRandom(0, 1200);
  localLocation.y = getRandom(130, 630);

  // объект offer
  var localOffer = {};

  // "title": строка, заголовок предложения, одно из фиксированных значений, значения не повторяются
  var indexTitle = getRandom(0, 7);
  var flagTitle = findDuplicateValue(arrayRandomTitles, titles[indexTitle]);
  while (flagTitle) {
    indexTitle = getRandom(0, 7);
    flagTitle = findDuplicateValue(arrayRandomTitles, titles[indexTitle]);
  }
  localOffer.title = titles[indexTitle];
  arrayRandomTitles[arrayRandomTitles.length] = titles[indexTitle];

  // "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
  localOffer.address = '{ ' + localLocation.x + ' , ' + localLocation.y + ' }';

  // "price": число, случайная цена от 1000 до 1000000
  localOffer.price = getRandom(1000, 1000000);

  // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  var indexType = getRandom(0, 3);
  localOffer.type = types[indexType];

  // "rooms": число, случайное количество комнат от 1 до 5
  localOffer.rooms = getRandom(1, 5);

  // "guests": число, случайное количество гостей, которое можно разместить
  localOffer.guests = Math.ceil(Math.random() * 100);

  // "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  var indexCheckin = getRandom(0, 2);
  localOffer.checkin = times[indexCheckin];

  // "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  var indexCheckout = getRandom(0, 2);
  localOffer.checkout = times[indexCheckout];

  // "features": массив строк случайной длины из предложенных
  var numberOfFeatures = getRandom(1, 6);
  var myFeatures = [];
  for (var i = 0; i < numberOfFeatures; i++) {
    var indexFeatures = getRandom(0, 5);
    var flagFeatures = findDuplicateValue(myFeatures, arrayFeatures[indexFeatures]);
    while (flagFeatures) {
      indexFeatures = getRandom(0, 5);
      flagFeatures = findDuplicateValue(myFeatures, arrayFeatures[indexFeatures]);
    }
    myFeatures[myFeatures.length] = arrayFeatures[indexFeatures];
  }
  localOffer.features = myFeatures;


  // "description": пустая строка
  localOffer.description = '';

  // "photos": массив из строк, расположенных в произвольном порядке
  localOffer.photos = changeOrder(arrayPhotos);

  localAd.author = localAuthor;
  localAd.offer = localOffer;
  localAd.location = localLocation;

  return localAd;
};

var numberOfAds = 8;
var Ads = [];
for (var indexAd = 0; indexAd < numberOfAds; indexAd++) {
  Ads[indexAd] = renderAd();
}
