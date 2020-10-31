'use strict';

(() => {
  const MOUSE_MAIN_BUTTON = 0;
  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);

  // События для активации страницы
  const onMainPinMouseDown = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      window.main.activatePage();
    }
  };

  const onMainPinKeydown = (evt) => {
    if (evt.keyCode === ENTER_KEY) {
      window.main.activatePage();
    }
  };

  mainPin.addEventListener(`keydown`, onMainPinKeydown);
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);

  const onClickMapPin = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      window.card.renderAdCard();
    }
  };

  const onPressEnterMapPin = (evt) => {
    if (evt.button === ENTER_KEY && evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      window.card.renderAdCard();
    }
  };

  mapPins.addEventListener(`click`, onClickMapPin);
  mapPins.addEventListener(`keydown`, onPressEnterMapPin);

  const onClickCloseButton = (evt) => {
    if (evt.button === MOUSE_MAIN_BUTTON) {
      removeAdCard();
    }
  };

  const onPressEscButton = (evt) => {
    if (evt.button === ESCAPE_KEY) {
      removeAdCard();
    }
  };

  const removeAdCard = () => {
    const currentCard = mapElement.querySelector(`.map__card`);
    if (currentCard) {
      currentCard.remove();
    }
    document.removeEventListener(`mousedown`, onClickCloseButton);
    document.removeEventListener(`keydown`, onPressEscButton);
  };

  window.map = {
    'onMainPinMouseDown': onMainPinMouseDown,
    'onMainPinKeydown': onMainPinKeydown,
    'removeAdCard': removeAdCard
  };

})();
