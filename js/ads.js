'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var successHandler = function (pins) {
    var localAds = [];
    for (var indexAd = 0; indexAd < pins.length; indexAd++) {
      localAds[indexAd] = window.renderAd(pins[indexAd]);
    }
    window.ads = localAds;

    filterByQuantity(window.ads);

    window.vrAds = [];

    // фильтр по типу жилья
    var selectedHousingType = document.getElementById('housing-type');
    selectedHousingType.addEventListener('change', function () {
      var housingType = document.getElementById('housing-type').value;
      if (housingType === 'any') {
        hidePin();
        for (var i = 1; i < window.pins.length; i++) {
          window.pins[i].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(window.ads);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else {
        var adsWithType = window.ads.filter(function (ad) {
          return ad.offer.type === housingType;
        });
        hidePin();
        for (var j = 1; j < window.pins.length; j++) {
          window.pins[j].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithType);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      }
    });

    // фильтр по цене
    var selectedHousingPrice = document.getElementById('housing-price');
    selectedHousingPrice.addEventListener('change', function () {
      var housingPrice = document.getElementById('housing-price').value;
      if (housingPrice === 'any') {
        hidePin();
        for (var i = 1; i < window.pins.length; i++) {
          window.pins[i].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(window.ads);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else if (housingPrice === 'middle') {
        var adsWithPriceMiddle = window.ads.filter(function (ad) {
          return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        });
        hidePin();
        for (var j = 1; j < window.pins.length; j++) {
          window.pins[j].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithPriceMiddle);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else if (housingPrice === 'low') {
        var adsWithPriceLow = window.ads.filter(function (ad) {
          return ad.offer.price < 10000;
        });
        hidePin();
        for (var k = 1; k < window.pins.length; k++) {
          window.pins[k].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithPriceLow);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else if (housingPrice === 'high') {
        var adsWithPriceHigh = window.ads.filter(function (ad) {
          return ad.offer.price > 50000;
        });
        hidePin();
        for (var l = 1; l < window.pins.length; l++) {
          window.pins[l].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithPriceHigh);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      }
    });

    // фильтр по количеству комнат
    var selectedHousingRooms = document.getElementById('housing-rooms');
    selectedHousingRooms.addEventListener('change', function () {
      var housingRooms = document.getElementById('housing-rooms').value;
      // console.log(housingRooms);
      if (housingRooms === 'any') {
        hidePin();
        for (var i = 1; i < window.pins.length; i++) {
          window.pins[i].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(window.ads);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else {
        var adsWithRooms = window.ads.filter(function (ad) {
          var vr = ad.offer.rooms + '';
          return vr === housingRooms;
        });
        // console.log(adsWithRooms);
        hidePin();
        for (var j = 1; j < window.pins.length; j++) {
          window.pins[j].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithRooms);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      }
    });

    // фильтр по количеству гостей
    var selectedHousingGuests = document.getElementById('housing-guests');
    selectedHousingGuests.addEventListener('change', function () {
      var housingGuests = document.getElementById('housing-guests').value;
      // console.log(housingGuests);
      if (housingGuests === 'any') {
        hidePin();
        for (var i = 1; i < window.pins.length; i++) {
          window.pins[i].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(window.ads);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      } else {
        var adsWithGuests = window.ads.filter(function (ad) {
          var vr = ad.offer.guests + '';
          return vr === housingGuests;
        });
        // console.log(adsWithGuests);
        hidePin();
        for (var j = 1; j < window.pins.length; j++) {
          window.pins[j].classList.remove('map__pin');
        }
        window.pins = [];
        filterByQuantity(adsWithGuests);
        window.show(window.newAds);
        window.mark.marks = [];
        showPin();
      }
    });

    // фильтр по удобствам
    // var selectedHousingFeatures = document.getElementById('housing-features');
  };

  var errorHandler = function (errorMessage) {
    var node = document.getElementById('error').content.querySelector('.error');
    var newElement = node.cloneNode(true);
    newElement.querySelector('p').textContent = errorMessage;

    document.querySelector('main').insertAdjacentElement('afterbegin', newElement);
    closeErrorMessageEsc(newElement);
    closeErrorMessage(newElement);
  };

  var closeErrorMessageEsc = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        element.classList.add('hidden');
      }
    });
  };

  var closeErrorMessage = function (element) {
    document.addEventListener('click', function () {
      element.classList.add('hidden');
    });
  };

  var getRandomElement = function (array, newArray) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomElementIndex];
    var flagAd = findDuplicateValue(newArray, randomElement);
    while (flagAd) {
      randomElementIndex = Math.floor(Math.random() * array.length);
      randomElement = array[randomElementIndex];
      flagAd = findDuplicateValue(newArray, randomElement);
    }
    return array[randomElementIndex];
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

  var filterByQuantity = function (array) {
    window.newAds = [];
    var numberOfAds;
    if (array.length > 5) {
      numberOfAds = 5;
    } else {
      numberOfAds = array.length;
    }
    for (var i = 0; i < numberOfAds; i++) {
      window.newAds[i] = getRandomElement(array, window.newAds);
    }
  };

  var hidePin = function () {
    for (var i = 1; i < window.pins.length; i++) {
      if (!window.pins[i].classList.contains('hidden')) {
        window.pins[i].classList.add('hidden');
      }
    }
  };

  var showPin = function () {
    for (var i = 1; i < window.pins.length; i++) {
      if (window.pins[i].classList.contains('hidden')) {
        window.pins[i].classList.remove('hidden');
      }
    }
  };

  window.load(successHandler, errorHandler);
})();

