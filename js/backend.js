
'use strict';
(() => {
  const URL_TO_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_TO_POST = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;
  const statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    USER_NOT_AUTHORIZED: 401,
    URL_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  const createXHR = (method, URL, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, URL);

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
        case statusCode.INTERNAL_SERVER_ERROR:
          error = `Внутренняя ошибка сервера`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
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

    return xhr;
  };

  const load = (onSuccess, onError) => {
    const xhr = createXHR(`GET`, URL_TO_GET, onSuccess, onError);
    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    const xhr = createXHR(`POST`, URL_TO_POST, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    'load': load,
    'upload': upload,
  };
})();
