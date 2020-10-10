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

// функции для получения случайных элементов
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItemFromArray = (listOfItems) => {
  return Math.floor(Math.random() * listOfItems.length);
};
// Координаты
const getPinCoordinates = () => {
  let getPinCoordinatesArray = [getRandomNumber(MIN_PIN_X, MAX_PIN_X), getRandomNumber(MIN_PIN_Y, MAX_PIN_Y)];
  return getPinCoordinatesArray;
};

// получение массива объектов
const getMockAds = (count) => {
  const ads = [];

  for (let i = 1; i <= count; i++) {
    const pinLocation = getPinCoordinates(i);
    ads.push(
        {
          author: {
            avatar: `img/avatars/user0${i}.png`
          },
          offer: {
            title: getRandomItemFromArray(OFFER_TITLE),
            address: pinLocation,
            price: getRandomNumber(MIN_PRICE, MAX_PRICE),
            type: getRandomItemFromArray(TYPE),
            rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
            guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomItemFromArray(CHECK_IN_CHECK_OUT),
            checkout: getRandomItemFromArray(CHECK_IN_CHECK_OUT),
            features: getRandomItemFromArray(FEATURES),
            description: getRandomItemFromArray(DESCRIPTION_ROOM),
            photos: getRandomItemFromArray(PHOTOS)
          },

          location: {
            x: pinLocation[0],
            y: pinLocation[1],
          }
        }
    );
  }
  return ads;
};

// переключает карту в активное состояние
const mapElement = document.querySelector(`.map`);
mapElement.classList.remove(`map--faded`);

// подготовка разметки для создания метки
const mapPinElement = mapElement.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// создание метки
const getPin = (ad) => {
  const pinElement = mapPinTemplate.cloneNode(true);
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

const addFragment = (element) => mapPinElement.appendChild(element);

const pinsArray = getMockAds(NUMBER_OF_ADS);

const renderPins = () => {
  const pinsNodeFragment = createFragmentWithPins(pinsArray);

  addFragment(pinsNodeFragment);
};

renderPins();
