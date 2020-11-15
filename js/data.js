'use strict';

(() => {
  let values = [];

  const saveAds = (data) => {
    values = data;
  };

  const getAds = () => values;

  window.data = {
    'save': saveAds,
    'get': getAds
  };
})();
