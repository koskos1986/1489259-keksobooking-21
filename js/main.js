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

// функция для получения случайного элемента из массива
const getRandomElement = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// получение массива объектов
const getRandomAds = () => {
  const randomAdsOptions = [];
  for (let i = 1; i <= NUMBER_OF_ADS; i++) {
    randomAdsOptions.push(
        {
          author: {
            avatar: `img/avatars/user0${i}.png`
          },
          offer: {
            title: getRandomElement(OFFER_TITLE),
            address: `${getRandomElement(MIN_PIN_X, MAX_PIN_X)}, ${getRandomElement(MIN_PIN_Y, MAX_PIN_Y)}`,
            price: getRandomElement(MIN_PRICE, MAX_PRICE),
            type: getRandomElement(TYPE),
            rooms: getRandomElement(MIN_ROOMS, MAX_ROOMS),
            guests: getRandomElement(MIN_GUESTS, MAX_GUESTS),
            checkin: getRandomElement(CHECK_IN_CHECK_OUT),
            checkout: getRandomElement(CHECK_IN_CHECK_OUT),
            features: getRandomElement(FEATURES),
            description: getRandomElement(DESCRIPTION_ROOM),
            photos: getRandomElement(PHOTOS)
          },

          location: {
            'x': `${getRandomElement(MIN_PIN_X, MAX_PIN_X)}`,
            'y': `${getRandomElement(MIN_PIN_Y, MAX_PIN_Y)}`
          }
        }
    );
  }
  return randomAdsOptions;
};

// переключает карту в активное состояние
const activateMap = (switcher) => {
  switcher.classList.remove(`map--faded`);
};

// подготовка разметки для создания метки
const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// создание метки
const getPin = (randomAdsOptions) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.querySelector(`img`).src = randomAdsOptions.author.avatar;
  pinElement.querySelector(`img`).alt = randomAdsOptions.offer.title;
  pinElement.style.left = `${randomAdsOptions.location.x - 25}px`;
  pinElement.style.top = `${randomAdsOptions.location.y - 35}px`;
  return pinElement;
};

// добавление фрагмента
const createNodePin = (pin) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pin.length; i++) {
    fragment.appendChild(getPin(pin[i]));
  }
  return fragment;
};

const addFragment = (element) => {
  mapPinsNode.appendChild(element);
};

// отрисовка меток
const generatePins = () => {
  const pinsArray = getRandomAds(NUMBER_OF_ADS);
  const pinsNodeFragment = createNodePin(pinsArray);

  addFragment(pinsNodeFragment);

  activateMap(mapNode);
};

generatePins();
