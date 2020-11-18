'use strict';

(() => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const PRICE_PER_TYPE_ROOM = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0
  };
  const RoomsForGuests = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };
  const adForm = document.querySelector(`.ad-form`);
  const titleInput = document.querySelector(`#title`);
  const checkInSelect = adForm.querySelector(`#timein`);
  const checkOutSelect = adForm.querySelector(`#timeout`);
  const typeRoomSelect = adForm.querySelector(`#type`);
  const selectRoomPrice = adForm.querySelector(`#price`);

  const getCapacityChange = () => {
    const validationMessage = !RoomsForGuests[adForm.rooms.value].includes(adForm.capacity.value)
      ? `Несоответствие количества комнат количеству гостей`
      : ``;
    adForm.capacity.setCustomValidity(validationMessage);
    adForm.capacity.reportValidity();
  };

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

  const validateCheckIn = () => {
    checkOutSelect.value = checkInSelect.value;
  };

  const validateCheckOut = () => {
    checkInSelect.value = checkOutSelect.value;
  };

  const validateMinPriceForTypeRoom = () => {
    const typeRoom = typeRoomSelect.value;
    selectRoomPrice.min = PRICE_PER_TYPE_ROOM[typeRoom];
    selectRoomPrice.placeholder = PRICE_PER_TYPE_ROOM[typeRoom];
  };

  window.validators = {
    getCapacityChange,
    validateTitle,
    validateCheckIn,
    validateCheckOut,
    validateMinPriceForTypeRoom
  };
})();
