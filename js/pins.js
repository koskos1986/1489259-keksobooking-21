'use strict';

(() => {
  const INDENT_FOR_PIN_EDGE_X = 25;
  const INDENT_FOR_PIN_EDGE_Y = 35;
  const MOUSE_MAIN_BUTTON = 0;
  const ENTER_KEY = 13;

  // подготовка разметки для создания метки// переключает карту в активное состояние
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const mainPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  // создание метки
  const getPin = (ad) => {
    const pinElement = mainPinTemplate.cloneNode(true);
    pinElement.querySelector(`img`).src = ad.author.avatar;
    pinElement.querySelector(`img`).alt = ad.offer.title;
    pinElement.style.left = `${ad.location.x - INDENT_FOR_PIN_EDGE_X}px`;
    pinElement.style.top = `${ad.location.y - INDENT_FOR_PIN_EDGE_Y}px`;
    const onClickMapPin = (evt) => {
      if (evt.button === MOUSE_MAIN_BUTTON && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        window.card.renderAdCard(ad);
      }
    };
    const onPressEnterMapPin = (evt) => {
      if (evt.button === ENTER_KEY && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        window.card.renderAdCard(ad);
      }
    };
    pinElement.addEventListener(`click`, onClickMapPin);
    mapPins.addEventListener(`keydown`, onPressEnterMapPin);
    return pinElement;
  };

  // добавление фрагмента
  const createFragmentWithPins = (ads) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(getPin(ads[i]));
    }
    return fragment;
  };

  const addFragment = (element) => mapPins.appendChild(element);
  const renderPins = () => {
    const pinsNodeFragment = createFragmentWithPins(window.data.getData());
    addFragment(pinsNodeFragment);
  };

  window.pins = {
    'renderPins': renderPins
  };
})();
