'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var selectedType = document.getElementById('type');

  // установка минимальной цены
  var chooseMinPrice = function () {
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
  };

  chooseMinPrice();
  selectedType.addEventListener('change', function () {
    chooseMinPrice();
  });

  // установка времени въезда и выезда
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');

  var chooseTimeIn = function () {
    timeOut.value = timeIn.value;
  };
  var chooseTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', function () {
    chooseTimeIn();
  });
  timeOut.addEventListener('change', function () {
    chooseTimeOut();
  });

  // синхронизация комнат и гостей
  var selectedRooms = document.getElementById('room_number');
  var selectedGuests = document.getElementById('capacity');

  var synchronizeTheNumberOfRoomsAndGuests = function () {
    if (selectedRooms.value !== selectedGuests.value) {
      selectedRooms.setCustomValidity('Количество комнат должно совпадать с количеством гостей');
    } else {
      selectedRooms.setCustomValidity('');
    }
  };

  selectedRooms.addEventListener('change', function () {
    synchronizeTheNumberOfRoomsAndGuests();
  });
  selectedGuests.addEventListener('change', function () {
    synchronizeTheNumberOfRoomsAndGuests();
  });


  var form = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      var node = document.getElementById('success').content.querySelector('.success');
      var newElement = node.cloneNode(true);
      window.switchingState.switchToInactiveState();
      document.querySelector('main').insertAdjacentElement('afterbegin', newElement);
      resetForm();
      deletePins();
      window.switchingState.switchToInactiveState();
      window.switchingState.showAddress(window.switchingState.initialX, window.switchingState.initialY);
      mapPinMain.style.left = 570 + 'px';
      mapPinMain.style.top = 375 + 'px';
      closeMessageEsc(newElement);
      closeMessage(newElement);
    });
    evt.preventDefault();
  });

  var resetForm = function () {
    form.reset();
  };

  var deletePins = function () {
    for (var i = 1; i < window.pins.length; i++) {
      if (!window.pins[i].classList.contains('hidden')) {
        window.pins[i].classList.add('hidden');
      }
    }
  };

  var closeMessageEsc = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        element.classList.add('hidden');
      }
    });
  };

  var closeMessage = function (element) {
    document.addEventListener('click', function () {
      element.classList.add('hidden');
    });
  };
})();

