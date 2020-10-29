'use strict';

const NUMBER_OF_ADS = 8;
const OFFER_TITLE = [
  `Комната с видом`,
  `Аппартаменты в центре`,
  `Пентхаус`,
  `Уютный чердак`,
  `Двухэтажная квартира`,
  `Номер в семейной гостинице`,
  `Бунгало`,
  `Комната в хостеле`
];
const MIN_PRICE = 500;
const MAX_PRICE = 20000;
const TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 7;
const CHECK_IN_CHECK_OUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const DESCRIPTION_ROOM = [
  `Отличная комната №1`,
  `Отличная комната №2`,
  `Отличная комната №3`,
  `Хорошая комната №1`,
  `Хорошая комната №2`,
  `Хорошая комната №3`,
  `Цена/Качество`,
  `Свежий ремонт`
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
// Положение пина на карте
const MIN_PIN_X = 0;
const MAX_PIN_X = 1200;
const MIN_PIN_Y = 130;
const MAX_PIN_Y = 630;
// Положение центра острия метки
const INDENT_FOR_PIN_EDGE_X = 25;
const INDENT_FOR_PIN_EDGE_Y = 35;
// константы главного пина
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const PIN_TIP_HEIGHT = 22;

const MOUSE_MAIN_BUTTON = 0;
const ENTER_KEY = 13;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const PRICE_PER_TYPE_ROOM = {
  palace: 10000,
  flat: 5000,
  house: 1000,
  bungalow: 0
};
// функции для получения случайных элементов
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getSeveralItemsFromArray = (array) => array.slice(0, getRandomNumber(0, array.length - 1));

// Координаты
const getPinCoordinates = () => {
  let getPinCoordinatesArray = {
    x: getRandomNumber(MIN_PIN_X, MAX_PIN_X),
    y: getRandomNumber(MIN_PIN_Y, MAX_PIN_Y)
  };
  return getPinCoordinatesArray;
};

// получение массива объектов
const getMockAds = (count) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    const pinLocation = getPinCoordinates();
    ads.push(
        {
          author: {
            avatar: `img/avatars/user0${i + 1}.png`
          },
          offer: {
            title: getRandomItemFromArray(OFFER_TITLE),
            address: pinLocation.x + ` ` + pinLocation.y,
            price: getRandomNumber(MIN_PRICE, MAX_PRICE),
            type: getRandomItemFromArray(TYPE),
            rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
            guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomItemFromArray(CHECK_IN_CHECK_OUT),
            checkout: getRandomItemFromArray(CHECK_IN_CHECK_OUT),
            features: getSeveralItemsFromArray(FEATURES),
            description: getRandomItemFromArray(DESCRIPTION_ROOM),
            photos: getSeveralItemsFromArray(PHOTOS)
          },
          location: {
            x: pinLocation.x,
            y: pinLocation.y,
          }
        }
    );
  }
  return ads;
};

// переключает карту в активное состояние
const mapElement = document.querySelector(`.map`);

// подготовка разметки для создания метки
const mapPins = mapElement.querySelector(`.map__pins`);
const mainPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// создание метки
const getPin = (ad) => {
  const pinElement = mainPinTemplate.cloneNode(true);
  pinElement.querySelector(`img`).src = ad.author.avatar;
  pinElement.querySelector(`img`).alt = ad.offer.title;
  pinElement.style.left = `${ad.location.x - INDENT_FOR_PIN_EDGE_X}px`;
  pinElement.style.top = `${ad.location.y - INDENT_FOR_PIN_EDGE_Y}px`;
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
const pinsArray = getMockAds(NUMBER_OF_ADS);
const renderPins = () => {
  const pinsNodeFragment = createFragmentWithPins(pinsArray);
  addFragment(pinsNodeFragment);
};

// m4-t1
const mainPin = mapPins.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = adForm.querySelectorAll(`fieldset`);
const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);
const mainPinLocation = adForm.querySelector(`#address`);
const titleInput = document.querySelector(`#title`);
const checkInSelect = adForm.querySelector(`#timein`);
const checkOutSelect = adForm.querySelector(`#timeout`);
const typeRoomSelect = adForm.querySelector(`#type`);
const selectRoomPrice = adForm.querySelector(`#price`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mapFiltersContainerElements = mapFiltersContainer.querySelector(`.map__filters`).children;
const mainPinPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
const RoomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

// блокировка формы
const toggleFormElements = (elements, isDisabled) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = isDisabled;
  }
};

toggleFormElements(adFormFieldset, true);
toggleFormElements(mapFiltersContainerElements, true);

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
  toggleFormElements(adFormFieldset, false);
  toggleFormElements(mapFiltersContainerElements, false);
  setupAddress();
  renderPins();
};

mainPin.removeEventListener(`mousedown`, onMainPinKeydown);
mainPin.removeEventListener(`keydown`, onMainPinKeydown);

// Валидация гостей и комнат
const getCapacityChange = () => {
  const validationMessage = !RoomsForGuests[adForm.rooms.value].includes(adForm.capacity.value)
    ? `Несоответствие количества комнат количеству гостей`
    : ``;
  adForm.capacity.setCustomValidity(validationMessage);
  adForm.capacity.reportValidity();
};

// Валидация заголовка
const validateTitle = () => {
  const titleLength = titleInput.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Введите ${MIN_TITLE_LENGTH - titleLength} символов`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите ${titleLength - MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity(``);
  }
  titleInput.reportValidity();
};

// Валидация времени заезда
const validateCheckIn = () => {
  checkOutSelect.value = checkInSelect.value;
};

const validateCheckOut = () => {
  checkInSelect.value = checkOutSelect.value;
};

// Валидация типа жилья
const validateMinPriceForTypeRoom = () => {
  const typeRoom = typeRoomSelect.value;
  selectRoomPrice.min = PRICE_PER_TYPE_ROOM[typeRoom];
  selectRoomPrice.placeholder = PRICE_PER_TYPE_ROOM[typeRoom];
};

titleInput.addEventListener(`input`, validateTitle);
checkInSelect.addEventListener(`change`, validateCheckIn);
checkOutSelect.addEventListener(`change`, validateCheckOut);
adForm.rooms.addEventListener(`input`, getCapacityChange);
adForm.capacity.addEventListener(`input`, getCapacityChange);
adFormSubmit.addEventListener(`click`, getCapacityChange);
typeRoomSelect.addEventListener(`change`, validateMinPriceForTypeRoom);
