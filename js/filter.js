'use strict';

(() => {
  const filters = document.querySelector(`.map__filters`);
  const adTypeRoomSelect = document.querySelector(`#housing-type`);

  const checkType = (ad) => {
    return adTypeRoomSelect.value === `any` || ad.offer.type === adTypeRoomSelect.value;
  };
});
