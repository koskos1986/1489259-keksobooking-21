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
      document.removeEventListener(`mousedown`, onClickCloseButton);
      document.removeEventListener(`keydown`, onPressEscButton);
      currentCard.remove();
    }
  };

  window.map = {
    'onMainPinMouseDown': onMainPinMouseDown,
    'onMainPinKeydown': onMainPinKeydown,
    'removeAdCard': removeAdCard
  };

})();
