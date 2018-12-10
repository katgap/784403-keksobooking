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
  localOffer.address = localLocation.x + ', ' + localLocation.y;

  // "price": число, случайная цена от 1000 до 1000000
  localOffer.price = getRandom(1000, 1000000);

  // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  // var indexType = getRandom(0, 3);
  // localOffer.type = types[indexType];
  localOffer.type = '';
  if (localOffer.title === 'Большая уютная квартира' || localOffer.title === 'Маленькая неуютная квартира') {
    localOffer.type = types[1];
  } else if (localOffer.title === 'Огромный прекрасный дворец' || localOffer.title === 'Маленький ужасный дворец') {
    localOffer.type = types[0];
  } else if (localOffer.title === 'Красивый гостевой домик' || localOffer.title === 'Некрасивый негостеприимный домик') {
    localOffer.type = types[2];
  } else if (localOffer.title === 'Уютное бунгало далеко от моря' || localOffer.title === 'Неуютное бунгало по колено в воде') {
    localOffer.type = types[3];
  }

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

// создание меток на карте
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mark = document.querySelector('.map__pin');
var positionInfo = mark.getBoundingClientRect();
var widthOfMark = positionInfo.width;
var heightOfMark = positionInfo.height;

var listOfMarks = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createMark = function (ad) {
  var userAvatar = ad.author.avatar;
  var xMark = ad.location.x + widthOfMark / 2;
  var yMark = ad.location.y + heightOfMark;
  var newMark = document.getElementById('pin').content.querySelector('.map__pin');
  var element = newMark.cloneNode(true);
  element.querySelector('img').setAttribute('src', userAvatar);
  element.setAttribute('style', 'left: ' + xMark + 'px; top: ' + yMark + 'px;');

  return element;
};

var drawMark = function (array, list) {
  for (var i = 0; i < array.length; i++) {
    var newElement = createMark(array[i]);
    fragment.appendChild(newElement);
  }
  list.appendChild(fragment);
};

// создание модального окна с инфрмацией об объявлении
var createCard = function (ad) {
  var card = document.getElementById('card').content.querySelector('.map__card');
  var newCard = card.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = ad.offer.title;
  newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
  newCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  // тип
  var popupType = ad.offer.type;
  if (popupType === 'flat') {
    newCard.querySelector('.popup__type').textContent = 'Квартира';
  } else if (popupType === 'bungalo') {
    newCard.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (popupType === 'house') {
    newCard.querySelector('.popup__type').textContent = 'Дом';
  } else if (popupType === 'palace') {
    newCard.querySelector('.popup__type').textContent = 'Дворец';
  }
  newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  // удобства
  var listOfFeatures = newCard.querySelector('ul');
  var featuresElement = newCard.querySelectorAll('li');
  for (var l = 0; l < featuresElement.length; l++) {
    listOfFeatures.removeChild(featuresElement[l]);
  }
  var featuresFragment = document.createDocumentFragment();
  for (var k = 0; k < ad.offer.features.length; k++) {
    for (var m = 0; m < arrayFeatures.length; m++) {
      if (ad.offer.features[k] === arrayFeatures[m]) {
        featuresFragment.appendChild(featuresElement[m]);
      }
    }
  }
  listOfFeatures.appendChild(featuresFragment);

  newCard.querySelector('.popup__description').textContent = ad.offer.description;

  // фото
  var cardPhotos = newCard.querySelector('.popup__photos');
  var photoElement = cardPhotos.querySelector('.popup__photo');
  cardPhotos.removeChild(photoElement);
  var photoFragment = document.createDocumentFragment();
  var myNewPhoto;
  var newSrc;
  for (var h = 0; h < ad.offer.photos.length; h++) {
    myNewPhoto = photoElement.cloneNode(true);
    newSrc = ad.offer.photos[h];
    myNewPhoto.src = newSrc;
    photoFragment.appendChild(myNewPhoto);
  }
  cardPhotos.appendChild(photoFragment);

  newCard.querySelector('img').setAttribute('src', ad.author.avatar);

  listOfMarks.insertAdjacentElement('afterend', newCard);
};

drawMark(Ads, listOfMarks);

createCard(Ads[0]);
