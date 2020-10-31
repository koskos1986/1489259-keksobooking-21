'use strict';

(() => {
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
  const MIN_PIN_X = 0;
  const MAX_PIN_X = 1200;
  const MIN_PIN_Y = 130;
  const MAX_PIN_Y = 630;

  const getPinCoordinates = () => {
    let getPinCoordinatesArray = {
      x: window.utils.getRandomNumber(MIN_PIN_X, MAX_PIN_X),
      y: window.utils.getRandomNumber(MIN_PIN_Y, MAX_PIN_Y)
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
              title: window.utils.getRandomItemFromArray(OFFER_TITLE),
              address: pinLocation.x + ` ` + pinLocation.y,
              price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
              type: window.utils.getRandomItemFromArray(TYPE),
              rooms: window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
              guests: window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
              checkin: window.utils.getRandomItemFromArray(CHECK_IN_CHECK_OUT),
              checkout: window.utils.getRandomItemFromArray(CHECK_IN_CHECK_OUT),
              features: window.utils.getSeveralItemsFromArray(FEATURES),
              description: window.utils.getRandomItemFromArray(DESCRIPTION_ROOM),
              photos: window.utils.getSeveralItemsFromArray(PHOTOS)
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

  window.data = {
    'pinsArray': getMockAds(NUMBER_OF_ADS)
  };
})();
