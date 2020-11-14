'use strict';

(() => {
  const MAX_ADS_COUNT = 5;
  const INDENT_FOR_PIN_EDGE_X = 25;
  const INDENT_FOR_PIN_EDGE_Y = 35;
  const MOUSE_MAIN_BUTTON = 0;
  const ENTER_KEY = 13;

  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const mainPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const getPin = (ad) => {
    const pinElement = mainPinTemplate.cloneNode(true);
    pinElement.querySelector(`img`).src = ad.author.avatar;
    pinElement.querySelector(`img`).alt = ad.offer.title;
    pinElement.style.left = `${ad.location.x - INDENT_FOR_PIN_EDGE_X}px`;
    pinElement.style.top = `${ad.location.y - INDENT_FOR_PIN_EDGE_Y}px`;

    const onClickMapPin = (evt) => {
      if (evt.button === MOUSE_MAIN_BUTTON && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        if (mapElement.querySelector(`.map__pin--active`)) {
          mapElement.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
        }
        evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
        window.card.renderAdCard(ad);
      }
    };

    const onPressEnterMapPin = (evt) => {
      if (evt.button === ENTER_KEY && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        if (mapElement.querySelector(`.map__pin--active`)) {
          mapElement.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
        }
        evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
        window.card.renderAdCard(ad);
      }
    };

    pinElement.addEventListener(`click`, onClickMapPin);
    mapPins.addEventListener(`keydown`, onPressEnterMapPin);
    return pinElement;
  };


  const createFragmentWithPins = (ads) => {
    const counter = ads.length <= MAX_ADS_COUNT ? ads.length : MAX_ADS_COUNT;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < counter; i++) {
      fragment.appendChild(getPin(ads[i]));
    }
    return fragment;
  };

  const addFragment = (element) => mapPins.appendChild(element);

  const renderPins = (ads) => {
    removePins();
    const pinsNodeFragment = createFragmentWithPins(ads);
    addFragment(pinsNodeFragment);
  };

  const removePins = () => {
    if (mapElement.querySelector(`.map__pin:not(.map__pin--main)`)) {
      const mapPinAds = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let pin of mapPinAds) {
        pin.remove();
      }
    }
  };

  window.pins = {
    'removePins': removePins,
    'renderPins': renderPins
  };
})();
