
'use strict';
(() => {
  const URL_TO_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;
  const statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    USER_NOT_AUTHORIZED: 401,
    URL_NOT_FOUND: 404,
  };
  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case statusCode.OK:
          onSuccess(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case statusCode.USER_NOT_AUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case statusCode.URL_NOT_FOUND:
          error = `Ничего не найдено`;
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL_TO_GET);
    xhr.send();
  };
  window.backend = {
    'load': load
  };
})();
