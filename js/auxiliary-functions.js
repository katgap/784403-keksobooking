'use strict';

(function () {
  window.auxiliaryFunctions = {
    getRandom: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    changeOrder: function (array) {
      var j = 0;
      var temp = 0;
      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },
    findDuplicateValue: function (array, value) {
      var flag = false;
      for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
          flag = true;
        }
      }
      return flag;
    }
  };
})();

