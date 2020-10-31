'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormSubmit = adForm.querySelector(`.ad-form__element--submit`);
  const titleInput = document.querySelector(`#title`);
  const checkInSelect = adForm.querySelector(`#timein`);
  const checkOutSelect = adForm.querySelector(`#timeout`);
  const typeRoomSelect = adForm.querySelector(`#type`);

  titleInput.addEventListener(`input`, window.validators.validateTitle);
  checkInSelect.addEventListener(`change`, window.validators.validateCheckIn);
  checkOutSelect.addEventListener(`change`, window.validators.validateCheckOut);
  adForm.rooms.addEventListener(`input`, window.validators.getCapacityChange);
  adForm.capacity.addEventListener(`input`, window.validators.getCapacityChange);
  adFormSubmit.addEventListener(`click`, window.validators.getCapacityChange);
  typeRoomSelect.addEventListener(`change`, window.validators.validateMinPriceForTypeRoom);
})();
