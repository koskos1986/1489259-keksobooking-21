'use strict';
// константы главного пина
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const PIN_TIP_HEIGHT = 22;

const MOUSE_MAIN_BUTTON = 0;
const ENTER_KEY = 13;

// переключает карту в активное состояние
const mapElement = document.querySelector(`.map`);

// подготовка разметки для создания метки
const mapPins = mapElement.querySelector(`.map__pins`);
// const mainPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


// m4-t1
const mainPin = mapPins.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`); // удалить
const adFormFieldset = adForm.querySelectorAll(`fieldset`); // удалить
const mainPinLocation = adForm.querySelector(`#address`);

const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mapFiltersContainerElements = mapFiltersContainer.querySelector(`.map__filters`).children;
const mainPinPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);

window.utils.toggleFormElements(adFormFieldset, true);
window.utils.toggleFormElements(mapFiltersContainerElements, true);

const setupAddress = () => {
  const newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TIP_HEIGHT);
  mainPinLocation.value = `${mainPinPositionX}, ${newPinPositionY}`;
};

// События для активации
mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === MOUSE_MAIN_BUTTON) {
    activatePage();
  }
});

const onMainPinKeydown = (evt) => {
  if (evt.keyCode === ENTER_KEY) {
    activatePage();
  }
};

mainPin.addEventListener(`keydown`, onMainPinKeydown);

const activatePage = () => {
  adForm.classList.remove(`ad-form--disabled`);
  mapElement.classList.remove(`map--faded`);
  window.utils.toggleFormElements(adFormFieldset, false);
  window.utils.toggleFormElements(mapFiltersContainerElements, false);
  setupAddress();
  window.pins.renderPins();
};

mainPin.removeEventListener(`mousedown`, onMainPinKeydown);
mainPin.removeEventListener(`keydown`, onMainPinKeydown);
