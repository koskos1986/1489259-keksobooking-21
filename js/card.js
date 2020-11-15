'use strict';

(() => {
  const generateAdCard = (ad) => {
    const previousCard = document.querySelector(`.map__card`);
    if (previousCard) {
      previousCard.remove();
    }

    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector(`.popup__title`);
    if (ad.offer.title) {
      cardTitle.textContent = ad.offer.title;
    } else {
      cardTitle.remove();
    }

    const cardAdress = cardElement.querySelector(`.popup__text--address`);
    if (ad.offer.address) {
      cardAdress.textContent = ad.offer.address;
    } else {
      cardAdress.remove();
    }

    const cardPrice = cardElement.querySelector(`.popup__text--price`);
    if (ad.offer.price) {
      cardPrice.textContent = ad.offer.price + `₽/ночь`;
    } else {
      cardPrice.remove();
    }

    const cardType = cardElement.querySelector(`.popup__type`);
    if (ad.offer.type) {
      switch (ad.offer.type) {
        case `flat`:
          cardType.textContent = `Квартира`;
          break;
        case `bungalow`:
          cardType.textContent = `Бунгало`;
          break;
        case `house`:
          cardType.textContent = `Дом`;
          break;
        case `palace`:
          cardType.textContent = `Дворец`;
          break;
        default:
          cardType.textContent = `Неверный тип размещения`;
          break;
      }
    } else {
      cardType.remove();
    }

    const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
    if (ad.offer.rooms && ad.offer.guests) {
      cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    } else {
      cardCapacity.remove();
    }

    const cardCheckInOut = cardElement.querySelector(`.popup__text--time`);
    if (ad.offer.checkin && ad.offer.checkout) {
      cardCheckInOut.textContent = `Заезд после ${ad.offer.checkin}, выезд\u00A0до ${ad.offer.checkout}`;
    } else {
      cardCheckInOut.remove();
    }

    const cardFeatures = cardElement.querySelector(`.popup__features`);
    if (ad.offer.features) {
      cardFeatures.innerHTML = ``;
      ad.offer.features.forEach((feature) => {
        const featureElement = document.createElement(`li`);
        featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
        cardFeatures.append(featureElement);
      });
    } else {
      cardFeatures.remove();
    }

    const cardDescription = cardElement.querySelector(`.popup__description`);
    if (ad.offer.description) {
      cardDescription.textContent = ad.offer.description;
    } else {
      cardDescription.remove();
    }

    const cardPhotos = cardElement.querySelector(`.popup__photos`);
    const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
    if (ad.offer.photos) {
      cardPhotos.innerHTML = ``;
      ad.offer.photos.forEach((photo) => {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.src = photo;
        cardPhotos.append(photoElement);
      });
    } else {
      cardPhotos.remove();
    }

    const cardAvatar = cardElement.querySelector(`.popup__avatar`);
    if (ad.author.avatar) {
      cardAvatar.src = ad.author.avatar;
    } else {
      cardAvatar.remove();
    }
    return cardElement;
  };

  const renderAdCard = (ad) => {
    const mapElement = document.querySelector(`.map`);
    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    mapElement.insertBefore(generateAdCard(ad), mapFilterContainer);
    const currentCard = mapElement.querySelector(`.map__card`);
    const adCardCloseButton = currentCard.querySelector(`.popup__close`);
    adCardCloseButton.addEventListener(`click`, window.map.removeAdCard);
    mapElement.addEventListener(`keydown`, window.map.removeAdCard);
  };

  window.card = {
    'render': renderAdCard
  };
})();
