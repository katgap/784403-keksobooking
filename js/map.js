'use strict';

var WIDTH_MAP = 1200;
var HEIGHT_MAP = 500;

var WIDTH_MARK = 62;
var HEIGHT_MARK = 84;

// var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

// var types = ['palace', 'flat', 'house', 'bungalo'];

var types = {
  flat: {
    oneOfTypes: 'flat',
    titles: ['Большая уютная квартира', 'Маленькая неуютная квартира']
  },
  palace: {
    oneOfTypes: 'palace',
    titles: ['Огромный прекрасный дворец', 'Маленький ужасный дворец']
  },
  house: {
    oneOfTypes: 'house',
    titles: ['Красивый гостевой домик', 'Некрасивый негостеприимный домик']
  },
  bungalo: {
    oneOfTypes: 'bungalo',
    titles: ['Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
  }
};

var times = ['12:00', '13:00', '14:00'];

var arrayFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var arrayAvatarNumbers = [];
var arrayRandomTitles = [];
var arrayRandomTitlesFlat = [];
var arrayRandomTitlesPalace = [];
var arrayRandomTitlesHouse = [];
var arrayRandomTitlesBungalo = [];

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

  var indexOfTypes;
  var typeOfAccommodation;
  var choiceOfAccommodationType = function () {
    do {
      indexOfTypes = getRandom(0, 3);
      if (indexOfTypes === 0) {
        typeOfAccommodation = types.flat;
        arrayRandomTitles = arrayRandomTitlesFlat;
      } else if (indexOfTypes === 1) {
        typeOfAccommodation = types.palace;
        arrayRandomTitles = arrayRandomTitlesPalace;
      } else if (indexOfTypes === 2) {
        typeOfAccommodation = types.house;
        arrayRandomTitles = arrayRandomTitlesHouse;
      } else if (indexOfTypes === 3) {
        typeOfAccommodation = types.bungalo;
        arrayRandomTitles = arrayRandomTitlesBungalo;
      }
    } while (arrayRandomTitles.length > 2);
  };
  choiceOfAccommodationType();
  var indexTitle = getRandom(0, 1);
  var flagTitle = findDuplicateValue(arrayRandomTitles, typeOfAccommodation.titles[indexTitle]);
  while (flagTitle) {
    choiceOfAccommodationType();
    indexTitle = getRandom(0, 1);
    flagTitle = findDuplicateValue(arrayRandomTitles, typeOfAccommodation.titles[indexTitle]);
  }
  localOffer.title = typeOfAccommodation.titles[indexTitle];
  arrayRandomTitles[arrayRandomTitles.length] = typeOfAccommodation.titles[indexTitle];

  // var indexTitle = getRandom(0, );
  // var flagTitle = findDuplicateValue(arrayRandomTitles, titles[indexTitle]);
  // while (flagTitle) {
  //   indexTitle = getRandom(0, 7);
  //   flagTitle = findDuplicateValue(arrayRandomTitles, titles[indexTitle]);
  // }
  // localOffer.title = titles[indexTitle];
  // arrayRandomTitles[arrayRandomTitles.length] = titles[indexTitle];

  // "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
  localOffer.address = localLocation.x + ', ' + localLocation.y;

  // "price": число, случайная цена от 1000 до 1000000
  localOffer.price = getRandom(1000, 1000000);

  // "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  localOffer.type = typeOfAccommodation.oneOfTypes;

  // var indexType = getRandom(0, 3);
  // localOffer.type = types[indexType];
  // localOffer.type = '';
  // if (localOffer.title === 'Большая уютная квартира' || localOffer.title === 'Маленькая неуютная квартира') {
  //   localOffer.type = types[1];
  // } else if (localOffer.title === 'Огромный прекрасный дворец' || localOffer.title === 'Маленький ужасный дворец') {
  //   localOffer.type = types[0];
  // } else if (localOffer.title === 'Красивый гостевой домик' || localOffer.title === 'Некрасивый негостеприимный домик') {
  //   localOffer.type = types[2];
  // } else if (localOffer.title === 'Уютное бунгало далеко от моря' || localOffer.title === 'Неуютное бунгало по колено в воде') {
  //   localOffer.type = types[3];
  // }

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

// console.log(arrayRandomTitlesFlat);
// console.log(arrayRandomTitlesPalace);
// console.log(arrayRandomTitlesHouse);
// console.log(arrayRandomTitlesBungalo);

// создание меток на карте
var map = document.querySelector('.map');

// map.classList.remove('map--faded');

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

// drawMark(Ads, listOfMarks);

// createCard(Ads[0]);

// _________________________________________
// Задание "Личный проект: подробности"

var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');
var inputsOfForm = adForm.querySelectorAll('input');
var textareasOfForm = adForm.querySelectorAll('textarea');
var buttonsOfForm = adForm.querySelectorAll('button');
var selectsOfForm = adForm.querySelectorAll('select');
var inputsOfMapForm = mapForm.querySelectorAll('input');
var selectsOfMapForm = mapForm.querySelectorAll('select');

// заблокировать поле
var lockField = function (field) {
  field.setAttribute('disabled', true);
};

// разблокировать поле
var unlockField = function (field) {
  field.removeAttribute('disabled');
};

// вычисление начальных значений метки
var initialX = WIDTH_MAP / 2;
var initialY = 130 + HEIGHT_MAP / 2 + HEIGHT_MARK / 2;

// показать адрес в поле
var showAddress = function (X, Y) {
  document.getElementById('address').value = X + ', ' + Y;
};

showAddress(initialX, initialY);

// неактивное состояние
var switchToInactiveState = function () {
  for (var indexInputs = 0; indexInputs < inputsOfForm.length; indexInputs++) {
    lockField(inputsOfForm[indexInputs]);
  }
  for (var indexSelects = 0; indexSelects < selectsOfForm.length; indexSelects++) {
    lockField(selectsOfForm[indexSelects]);
  }
  for (var indexTextareas = 0; indexTextareas < textareasOfForm.length; indexTextareas++) {
    lockField(textareasOfForm[indexTextareas]);
  }
  for (var indexButtons = 0; indexButtons < buttonsOfForm.length; indexButtons++) {
    lockField(buttonsOfForm[indexButtons]);
  }
  for (var indexMapInputs = 0; indexMapInputs < inputsOfMapForm.length; indexMapInputs++) {
    lockField(inputsOfMapForm[indexMapInputs]);
  }
  for (var indexMapSelects = 0; indexMapSelects < selectsOfMapForm.length; indexMapSelects++) {
    lockField(selectsOfMapForm[indexMapSelects]);
  }
};

switchToInactiveState();

// активное состояние
var mapPinMain = document.querySelector('.map__pin--main');

var switchToActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var indexInputs = 0; indexInputs < inputsOfForm.length; indexInputs++) {
    unlockField(inputsOfForm[indexInputs]);
  }
  for (var indexSelects = 0; indexSelects < selectsOfForm.length; indexSelects++) {
    unlockField(selectsOfForm[indexSelects]);
  }
  for (var indexTextareas = 0; indexTextareas < textareasOfForm.length; indexTextareas++) {
    unlockField(textareasOfForm[indexTextareas]);
  }
  for (var indexButtons = 0; indexButtons < buttonsOfForm.length; indexButtons++) {
    unlockField(buttonsOfForm[indexButtons]);
  }
  for (var indexMapInputs = 0; indexMapInputs < inputsOfMapForm.length; indexMapInputs++) {
    unlockField(inputsOfMapForm[indexMapInputs]);
  }
  for (var indexMapSelects = 0; indexMapSelects < selectsOfMapForm.length; indexMapSelects++) {
    unlockField(selectsOfMapForm[indexMapSelects]);
  }
};

// при нажатии на метку переход в активное состояние
var mouseup = mapPinMain.addEventListener('click', function () {
  switchToActiveState();
  showAddress(initialX, initialY);
  drawMark(Ads, listOfMarks);
});

// ___________________________________
// Задание: "Личный проект: доверяй, но проверяй"

//var selectedType = document.getElementById('type');

// установка минимальной цены
/*var chooseMinPrice = function () {
  var selectedPrice = document.getElementById('price'); 
  if (selectedType.value === 'bungalo') {
    selectedPrice.min = 0;
    selectedPrice.placeholder = '1000';
  } else if (selectedType.value === 'flat') {
    selectedPrice.min = 1000;
    selectedPrice.placeholder = '5000';
  } else if (selectedType.value === 'house') {
    selectedPrice.min = 5000;
    selectedPrice.placeholder = '10000';
  } else if (selectedType.value === 'palace') {
    selectedPrice.min = 10000;
    selectedPrice.placeholder = '15000';
  } 
}

chooseMinPrice();
selectedType.addEventListener('change', function () {
  chooseMinPrice();
});

// установка времени въезда и выезда
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

var chooseTimeIn = function () {
  timeOut.value = timeIn.value;
}
var chooseTimeOut = function () {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', function () {
  chooseTimeIn();
});
timeOut.addEventListener('change', function () {
  chooseTimeOut();
});*/
