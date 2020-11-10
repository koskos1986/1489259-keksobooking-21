'use strict';

(() => {
  const MAIN_PIN_DEFAULT_POSITION = {
    'top': `375px`,
    'left': `570px`,
  };
  const mapElement = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapFiltersContainerElements = mapFiltersContainer.querySelector(`.map__filters`).children;

  const deactivatePage = () => {
    if (!mapElement.classList.contains(`map--faded`)) {
      mapElement.classList.add(`map--faded`);
    }

    if (!adForm.classList.contains(`ad-form--disabled`)) {
      adForm.classList.add(`ad-form--disabled`);
    }

    if (mapElement.querySelector(`.map__pin:not(.map__pin--main)`)) {
      const mapPins = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let pin of mapPins) {
        pin.remove();
      }
    }

    adForm.reset();

    mainPin.style.top = MAIN_PIN_DEFAULT_POSITION.top;
    mainPin.style.left = MAIN_PIN_DEFAULT_POSITION.left;

    window.utils.toggleFormElements(adFormFieldset, true);
    window.utils.toggleFormElements(mapFiltersContainerElements, true);

    mainPin.addEventListener(`mousedown`, window.map.onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, window.map.onMainPinKeydown);
  };

  const onSuccess = (serverResponse) => {
    window.data.saveAds(serverResponse);
    window.pins.renderPins(window.data.getAds());
  };

  const activatePage = () => {
    adForm.classList.remove(`ad-form--disabled`);
    mapElement.classList.remove(`map--faded`);
    window.utils.toggleFormElements(adFormFieldset, false);
    window.utils.toggleFormElements(mapFiltersContainerElements, false);
    window.utils.setupAddress();
    mainPin.removeEventListener(`mousedown`, window.map.onMainPinMouseDown);
    mainPin.removeEventListener(`keydown`, window.map.onMainPinKeydown);
    window.backend.load(onSuccess, window.message.onError);
  };

  window.main = {
    'activatePage': activatePage,
    'deactivatePage': deactivatePage
  };
})();

