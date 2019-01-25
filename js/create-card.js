'use strict';

(function () {
  var ESC_KEYCODE = 27;
  // создание модального окна с инфрмацией об объявлении
  window.createCard = function (ad) {
    var card = document.getElementById('card').content.querySelector('.map__card');
    var newCard = card.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = ad.offer.title;
    newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    // тип
    // var popupType = ad.offer.type;
    // if (popupType === 'flat') {
    newCard.querySelector('.popup__type').textContent = ad.offer.type;
    /* } else if (popupType === 'bungalo') {
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (popupType === 'house') {
      newCard.querySelector('.popup__type').textContent = 'Дом';
    } else if (popupType === 'palace') {
      newCard.querySelector('.popup__type').textContent = 'Дворец';
    } */
    newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    // удобства
    var listOfFeatures = newCard.querySelector('ul');
    var featuresElement = newCard.querySelectorAll('li');
    for (var l = 0; l < featuresElement.length; l++) {
      listOfFeatures.removeChild(featuresElement[l]);
    }
    var featuresFragment = document.createDocumentFragment();
    for (var k = 0; k < ad.offer.features.length; k++) {
      featuresFragment.appendChild(featuresElement[k]);
    }
    listOfFeatures.appendChild(featuresFragment);
    newCard.querySelector('.popup__description').textContent = ad.offer.description;
    // фото
    var cardPhotos = newCard.querySelector('.popup__photos');
    var photoElement = cardPhotos.querySelector('.popup__photo');
    cardPhotos.removeChild(photoElement);
    var photoFragment = document.createDocumentFragment();
    var myNewPhoto;
    var newSrc;
    for (var h = 0; h < ad.offer.photos.length; h++) {
      myNewPhoto = photoElement.cloneNode(true);
      newSrc = ad.offer.photos[h];
      myNewPhoto.src = newSrc;
      photoFragment.appendChild(myNewPhoto);
    }
    cardPhotos.appendChild(photoFragment);
    newCard.querySelector('img').setAttribute('src', ad.author.avatar);
    window.mark.listOfMarks.insertAdjacentElement('afterend', newCard);
    newCard.classList.add('hidden');

    var cardClose = newCard.querySelector('.popup__close');
    closePopup(cardClose, newCard);
    closePopupEsc(newCard);
    return newCard;
  };

  var closePopup = function (popupClose, popup) {
    popupClose.addEventListener('click', function () {
      popup.classList.add('hidden');
    });
  };

  var closePopupEsc = function (popup) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        popup.classList.add('hidden');
      }
    });
  };
})();

