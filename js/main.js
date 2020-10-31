'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapFiltersContainerElements = mapFiltersContainer.querySelector(`.map__filters`).children;

  window.utils.toggleFormElements(adFormFieldset, true);
  window.utils.toggleFormElements(mapFiltersContainerElements, true);

  const activatePage = () => {
    const mainPin = mapPins.querySelector(`.map__pin--main`);
    adForm.classList.remove(`ad-form--disabled`);
    mapElement.classList.remove(`map--faded`);
    window.utils.toggleFormElements(adFormFieldset, false);
    window.utils.toggleFormElements(mapFiltersContainerElements, false);
    window.utils.setupAddress();
    mainPin.removeEventListener(`mousedown`, window.map.onMainPinMouseDown);
    mainPin.removeEventListener(`keydown`, window.map.onMainPinKeydown);
    window.pins.renderPins();
  };

  window.main = {
    'activatePage': activatePage
  };
})();

