'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.upload = function (data, onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();