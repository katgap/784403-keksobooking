'use strict';

(function () {
  var localMap = document.querySelector('.map');
  var localListOfMarks = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();


  window.mark = {
    map: localMap,
    listOfMarks: localListOfMarks,
    WIDTH_MAP: 1200,
    HEIGHT_MAP: 750,
    WIDTH_MARK: 65,
    HEIGHT_MARK: 87,
    listCards: [],
    listCardsTwo: [],
    marks: [],
    createMark: function (ad) {
      var userAvatar = ad.author.avatar;
      var xMark = ad.location.x - window.mark.WIDTH_MARK / 2;
      var yMark = ad.location.y - window.mark.HEIGHT_MARK;
      var newMark = document.getElementById('pin').content.querySelector('.map__pin');
      var element = newMark.cloneNode(true);
      element.querySelector('img').setAttribute('src', userAvatar);
      element.setAttribute('style', 'left: ' + xMark + 'px; top: ' + yMark + 'px;');

      return element;
    },
    createArrayOfMark: function (ads) {
      var arrayNewMarks = [];
      for (var j = 0; j < ads.length; j++) {
        arrayNewMarks[j] = window.mark.createMark(ads[j]);
      }
      return arrayNewMarks;
    },
    drawMark: function (array, list) {
      for (var i = 0; i < array.length; i++) {
        var newElement = array[i];
        newElement.classList.add('hidden');
        fragment.appendChild(newElement);
      }
      list.appendChild(fragment);
    },
    // showInfo: function (ad) {
    //  window.mark.listOfMarks.insertAdjacentElement('afterend', ad);
    // },
    showCard: function (pin, listCards, listCardsTwo, pins) {
      pin.addEventListener('click', function () {
        for (var i = 0; i < listCards.length; i++) {
          if (!listCards[i].classList.contains('hidden')) {
            listCards[i].classList.add('hidden');
          }
        }
        for (var j = 0; j < listCardsTwo.length; j++) {
          if (!listCardsTwo[j].classList.contains('hidden')) {
            listCardsTwo[j].classList.add('hidden');
          }
        }
        for (var k = 1; k < pins.length; k++) {
          if (pins[k].classList.contains('map__pin--active')) {
            pins[k].classList.remove('map__pin--active');
          }
        }
        var element = pin.cloneNode(true);
        var currentElementX = element.style.left;
        var currentElementY = element.style.top;
        for (var l = 0; l < listCards.length; l++) {
          var currentX = window.ads[l].location.x - window.mark.WIDTH_MARK / 2 + 'px';
          var currentY = window.ads[l].location.y - window.mark.HEIGHT_MARK + 'px';
          if (currentX === currentElementX && currentY === currentElementY) {
            listCards[l].classList.remove('hidden');
            pin.classList.add('map__pin--active');
          }
        }
      });
    }
  };
})();

