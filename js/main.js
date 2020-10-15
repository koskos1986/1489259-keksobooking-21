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
// m3-t2
const generateAdCard = (ad) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(`.popup__title`);
  if (ad.offer.title) {
    cardTitle.textContent = ad.offer.title;
  } else {
    cardTitle.remove();
  }

  const cardAdress = cardElement.querySelector(`.popup__text--address`);
  if (ad.offer.address) {
    cardAdress.textContent = ad.offer.address;
  } else {
    cardAdress.remove();
  }

  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  if (ad.offer.price) {
    cardPrice.textContent = ad.offer.price + `₽/ночь`;
  } else {
    cardPrice.remove();
  }

  const cardType = cardElement.querySelector(`.popup__type`);
  if (ad.offer.type) {
    switch (ad.offer.type) {
      case `flat`:
        cardType.textContent = `Квартира`;
        break;
      case `bungalow`:
        cardType.textContent = `Бунгало`;
        break;
      case `house`:
        cardType.textContent = `Дом`;
        break;
      case `palace`:
        cardType.textContent = `Дворец`;
        break;
      default:
        cardType.textContent = `Неверный тип размещения`;
        break;
    }
  } else {
    cardType.remove();
  }

  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  if (ad.offer.rooms && ad.offer.guests) {
    cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    cardCapacity.remove();
  }

  const cardCheckInOut = cardElement.querySelector(`.popup__text--time`);
  if (ad.offer.checkin && ad.offer.checkout) {
    cardCheckInOut.textContent = `Заезд после ${ad.offer.checkin}, выезд\u00A0до ${ad.offer.checkout}`;
  } else {
    cardCheckInOut.remove();
  }

  const cardFeatures = cardElement.querySelector(`.popup__features`);
  if (ad.offer.features) {
    cardFeatures.innerHTML = ``;
    ad.offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      cardFeatures.append(featureElement);
    });
  } else {
    cardFeatures.remove();
  }

  const cardDescription = cardElement.querySelector(`.popup__description`);
  if (ad.offer.description) {
    cardDescription.textContent = ad.offer.description;
  } else {
    cardDescription.remove();
  }

  const cardPhotos = cardElement.querySelector(`.popup__photos`);
  const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
  if (ad.offer.photos) {
    cardPhotos.innerHTML = ``;
    ad.offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      cardPhotos.append(photoElement);
    });
  } else {
    cardPhotos.remove();
  }

  const cardAvatar = cardElement.querySelector(`.popup__avatar`);
  if (ad.author.avatar) {
    cardAvatar.src = ad.author.avatar;
  } else {
    cardAvatar.remove();
  }

  return cardElement;
};

const mapFilterContainer = document.querySelector(`.map__filters-container`);
mapElement.classList.remove(`map--faded`);
mapElement.insertBefore(generateAdCard(pinsArray[0]), mapFilterContainer);
renderPins();
