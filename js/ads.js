'use strict';

(function () {

  var successHandler = function (pins) {
    //var numberOfAds = 8;
    var localAds = [];
    for (var indexAd = 0; indexAd < pins.length; indexAd++) {
      localAds[indexAd] = window.renderAd(pins[indexAd]);
    }
    window.ads = localAds;
  };

  var errorHandler = function (errorMessage) {
    var node = document.getElementById('error').content.querySelector('.error');
    var newElement = node.cloneNode(true);
    newElement.querySelector('p').textContent = errorMessage;

    document.querySelector('main').insertAdjacentElement('afterbegin', newElement);
  };

  window.load(successHandler, errorHandler);
})();

