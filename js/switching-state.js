'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var inputsOfForm = adForm.querySelectorAll('input');
  var textareasOfForm = adForm.querySelectorAll('textarea');
  var buttonsOfForm = adForm.querySelectorAll('button');
  var selectsOfForm = adForm.querySelectorAll('select');
  var inputsOfMapForm = mapForm.querySelectorAll('input');
  var selectsOfMapForm = mapForm.querySelectorAll('select');
  // var mapPinMain = document.querySelector('.map__pin--main');

  // заблокировать поле
  var lockField = function (field) {
    field.setAttribute('disabled', true);
  };

  // разблокировать поле
  var unlockField = function (field) {
    field.removeAttribute('disabled');
  };

  window.switchingState = {
    // вычисление начальных значений метки
    initialX: window.mark.WIDTH_MAP / 2,
    initialY: 130 + window.mark.HEIGHT_MAP / 2 + window.mark.HEIGHT_MARK / 2,

    // показать адрес в поле
    showAddress: function (X, Y) {
      document.getElementById('address').value = X + ', ' + Y;
    },

    // неактивное состояние
    switchToInactiveState: function () {
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
    },

    // активное состояние
    switchToActiveState: function () {
      window.mark.map.classList.remove('map--faded');
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
    }
  };

  window.switchingState.showAddress(window.switchingState.initialX, window.switchingState.initialY);
  window.switchingState.switchToInactiveState();
})();

