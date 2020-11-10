'use strict';

(() => {
  const ESCAPE_KEY = 27;
  const errorPopupTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successPopupTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const onError = (errorMessage) => {
    let errorPopup = errorPopupTemplate.cloneNode(true);
    errorPopup.querySelector(`.error__message`).textContent = errorMessage;

    document.body.appendChild(errorPopup);

    const errorCloseButton = errorPopup.querySelector(`.error__button`);

    const onErrorCloseButtonClick = (evt) => {
      evt.preventDefault();
      errorPopupClose();
    };

    const onErrorPopupEscPress = (evt) => {
      evt.preventDefault();
      if (evt.keyCode === ESCAPE_KEY) {
        errorPopupClose();
      }
    };

    errorCloseButton.addEventListener(`click`, onErrorCloseButtonClick);
    document.addEventListener(`keydown`, onErrorPopupEscPress);

    const errorPopupClose = () => {
      document.querySelector(`.error`).remove();
      location.reload();

      document.removeEventListener(`keydown`, onErrorPopupEscPress);
    };
  };

  const showSuccessMessage = () => {
    let successPopup = successPopupTemplate.cloneNode(true);

    document.body.appendChild(successPopup);

    const closeSuccessPopup = () => {
      document.querySelector(`.success`).remove();

      document.removeEventListener(`click`, onSuccessPopupClick);
      document.removeEventListener(`keydown`, onSuccessPopupEscPress);

      window.main.deactivatePage();
    };

    const onSuccessPopupClick = (evt) => {
      evt.preventDefault();
      closeSuccessPopup();
    };

    const onSuccessPopupEscPress = (evt) => {
      if (evt.keyCode === ESCAPE_KEY) {
        evt.preventDefault();
        closeSuccessPopup();
      }
    };

    document.addEventListener(`click`, onSuccessPopupClick);
    document.addEventListener(`keydown`, onSuccessPopupEscPress);
  };

  window.message = {
    'onError': onError,
    'showSuccessMessage': showSuccessMessage
  };
})();
