'use strict';

(function () {
  var numberOfAds = 8;
  var localAds = [];
  for (var indexAd = 0; indexAd < numberOfAds; indexAd++) {
    localAds[indexAd] = window.renderAd();
  }
  window.ads = localAds;
})();

