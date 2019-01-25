'use strict';

(function () {

  var successHandler = function (pins) {
    var localAds = [];
    for (var indexAd = 0; indexAd < pins.length; indexAd++) {
      localAds[indexAd] = window.renderAd(pins[indexAd]);
    }
    window.ads = localAds;

    filterByQuantity(window.ads);

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

    /* var selectedHousingPrice = document.getElementById('housing-price');
    selectedHousingPrice.addEventListener('change', function () {
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
    }); */
  };

  var errorHandler = function (errorMessage) {
    var node = document.getElementById('error').content.querySelector('.error');
    var newElement = node.cloneNode(true);
    newElement.querySelector('p').textContent = errorMessage;

    document.querySelector('main').insertAdjacentElement('afterbegin', newElement);
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

