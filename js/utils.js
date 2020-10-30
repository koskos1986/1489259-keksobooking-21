'use strict';

(() => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getSeveralItemsFromArray = (array) => array.slice(0, window.utils.getRandomNumber(0, array.length - 1));

  const toggleFormElements = (elements, isDisabled) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  window.utils = {
    'getRandomNumber': getRandomNumber,
    'getRandomItemFromArray': getRandomItemFromArray,
    'getSeveralItemsFromArray': getSeveralItemsFromArray,
    'toggleFormElements': toggleFormElements
  };
})();
