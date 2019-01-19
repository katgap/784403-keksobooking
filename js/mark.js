'use strict';

(function () {
  var localMap = document.querySelector('.map');
  var localListOfMarks = document.querySelector('.map__pins');
  // var localMark = document.querySelector('.map__pin');
  // var positionInfoMap = localMap.getBoundingClientRect();
  // var positionInfoMark = localMark.getBoundingClientRect();
  var fragment = document.createDocumentFragment();

  window.mark = {
    map: localMap,
    listOfMarks: localListOfMarks,
    // WIDTH_MAP: positionInfoMap.width,
    // HEIGHT_MAP: positionInfoMap.width,
    // WIDTH_MARK: positionInfoMark.width,
    // HEIGHT_MARK: positionInfoMark.height,
    WIDTH_MAP: 1200,
    HEIGHT_MAP: 750,
    WIDTH_MARK: 65,
    HEIGHT_MARK: 87,
    createMark: function (ad) {
      var userAvatar = ad.author.avatar;
      var xMark = ad.location.x + window.mark.WIDTH_MARK / 2;
      var yMark = ad.location.y + window.mark.HEIGHT_MARK;
      var newMark = document.getElementById('pin').content.querySelector('.map__pin');
      var element = newMark.cloneNode(true);
      element.querySelector('img').setAttribute('src', userAvatar);
      element.setAttribute('style', 'left: ' + xMark + 'px; top: ' + yMark + 'px;');

      return element;
    },
    drawMark: function (array, list) {
      for (var i = 0; i < array.length; i++) {
        var newElement = window.mark.createMark(array[i]);
        fragment.appendChild(newElement);
      }
      list.appendChild(fragment);
    }
  };
})();

