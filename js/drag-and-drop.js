'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var localMap = window.mark.map;

  var currentInitialX = window.mark.WIDTH_MAP / 2;
  var currentInitialY = 130 + window.mark.HEIGHT_MAP / 2 + window.mark.HEIGHT_MARK / 2;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (moveEvt.clientX >= localMap.offsetLeft && moveEvt.clientX <= (moveEvt.clientX + window.mark.WIDTH_MAP)
      && moveEvt.clientY >= (localMap.offsetTop + 130) && moveEvt.clientY <= (localMap.offsetTop + window.mark.HEIGHT_MAP - 120)
      && (mapPinMain.offsetTop - shift.y + window.mark.HEIGHT_MARK) >= 130 && (mapPinMain.offsetTop - shift.y + window.mark.HEIGHT_MARK) <= 630
      && (mapPinMain.offsetLeft - shift.x) >= 0 && (mapPinMain.offsetLeft - shift.x) <= localMap.offsetWidth - window.mark.WIDTH_MARK) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';

        currentInitialX = (mapPinMain.offsetLeft - shift.x) + window.mark.WIDTH_MARK / 2;
        currentInitialY = (mapPinMain.offsetTop - shift.y) + window.mark.HEIGHT_MARK;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      localMap.removeEventListener('mousemove', onMouseMove);
      localMap.removeEventListener('mouseup', onMouseUp);

      window.switchingState.switchToActiveState();
      window.switchingState.showAddress(currentInitialX, currentInitialY);
      window.mark.drawMark(window.ads, window.mark.listOfMarks);
    };

    localMap.addEventListener('mousemove', onMouseMove);
    localMap.addEventListener('mouseup', onMouseUp);
  });
})();

