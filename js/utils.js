'use strict';

(() => {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const PIN_TIP_HEIGHT = 22;

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getSeveralItemsFromArray = (array) => array.slice(0, getRandomNumber(0, array.length - 1));

  const toggleFormElements = (elements, isDisabled) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };
  const adForm = document.querySelector(`.ad-form`);
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const mainPin = mapPins.querySelector(`.map__pin--main`);
  const mainPinLocation = adForm.querySelector(`#address`);

  const setupAddress = () => {
    const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
    const newPinPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
    mainPinLocation.value = `${newPinPositionX}, ${newPinPositionY}`;
  };

  window.utils = {
    'getRandomNumber': getRandomNumber,
    'getRandomItemFromArray': getRandomItemFromArray,
    'getSeveralItemsFromArray': getSeveralItemsFromArray,
    'toggleFormElements': toggleFormElements,
    'setupAddress': setupAddress
  };
})();
