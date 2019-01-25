'use strict';

(function () {
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

  /* var form = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      notice.classList.add('hidden');
    });
    evt.preventDefault();
  });*/
})();

