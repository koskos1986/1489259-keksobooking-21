'use strict';

(() => {
  const MOUSE_MAIN_BUTTON = 0;
  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const MIN_PIN_X = 0;
  const MAX_PIN_X = 1200;
  const MIN_PIN_Y = 130;
  const MAX_PIN_Y = 630;
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);

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

  const onMousemoveMainPin = (evt) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const axisShift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let mainPinX = mainPin.offsetLeft - axisShift.x;
      let mainPinY = mainPin.offsetTop - axisShift.y;

      const pinMovingBorders = {
        'minBorderX': MIN_PIN_X - (MAIN_PIN_WIDTH / 2),
        'maxBorderX': MAX_PIN_X - (MAIN_PIN_WIDTH / 2),
        'minBorderY': MIN_PIN_Y - MAIN_PIN_HEIGHT,
        'maxBorderY': MAX_PIN_Y - MAIN_PIN_HEIGHT,
      };

      if (mainPinX < pinMovingBorders.minBorderX) {
        mainPinX = pinMovingBorders.minBorderX + `px`;
      }

      if (mainPinX > pinMovingBorders.maxBorderX) {
        mainPinX = pinMovingBorders.maxBorderX + `px`;
      }

      if (mainPinY < pinMovingBorders.minBorderY) {
        mainPinY = pinMovingBorders.minBorderY + `px`;
      }

      if (mainPinY > pinMovingBorders.maxBorderY) {
        mainPinY = pinMovingBorders.maxBorderY + `px`;
      }

      mainPin.style.top = mainPinY + `px`;
      mainPin.style.left = mainPinX + `px`;
      window.utils.setupAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }

      window.utils.setupAddress();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  mainPin.addEventListener(`mousedown`, onMousemoveMainPin);

  window.map = {
    onMainPinMouseDown,
    onMainPinKeydown,
    removeAdCard
  };
})();
