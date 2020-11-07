'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const mapPins = mapElement.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapFiltersContainerElements = mapFiltersContainer.querySelector(`.map__filters`).children;
  const errorPopupTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  window.utils.toggleFormElements(adFormFieldset, true);
  window.utils.toggleFormElements(mapFiltersContainerElements, true);

  const onSuccess = (serverResponse) => {
    window.data = {
      'pinsArray': serverResponse,
    };
    window.pins.renderPins(window.data.pinsArray);
  };

  const onError = (errorMessage) => {
    let errorPopup = errorPopupTemplate.cloneNode(true);
    errorPopup.querySelector(`.error__message`).textContent = errorMessage;

    document.body.appendChild(errorPopup);

    const errorCloseButton = errorPopup.querySelector(`.error__button`);
    const onErrorCloseButtonClick = (evt) => {
      evt.preventDefault();
      errorPopupClose();
    };

    errorCloseButton.addEventListener(`click`, onErrorCloseButtonClick);

    const errorPopupClose = () => {
      document.querySelector(`.error`).remove();
      location.reload();
    };
  };

  const activatePage = () => {
    const mainPin = mapPins.querySelector(`.map__pin--main`);
    adForm.classList.remove(`ad-form--disabled`);
    mapElement.classList.remove(`map--faded`);
    window.utils.toggleFormElements(adFormFieldset, false);
    window.utils.toggleFormElements(mapFiltersContainerElements, false);
    window.utils.setupAddress();
    mainPin.removeEventListener(`mousedown`, window.map.onMainPinMouseDown);
    mainPin.removeEventListener(`keydown`, window.map.onMainPinKeydown);
    window.backend.load(onSuccess, onError);
  };

  window.main = {
    'activatePage': activatePage
  };
})();

