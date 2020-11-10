'use strict';

(() => {
  const formReset = document.querySelector(`.ad-form__reset`);
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

  adForm.addEventListener(`submit`, function (evt) {
    if (adForm.reportValidity()) {
      window.backend.upload(new FormData(adForm), window.message.showSuccessMessage, window.message.onError);
      evt.preventDefault();
    }
  });

  const onFormResetButtonClick = (evt) => {
    evt.preventDefault();
    adForm.reset();
    window.main.deactivatePage();
  };

  formReset.addEventListener(`click`, onFormResetButtonClick);

})();
