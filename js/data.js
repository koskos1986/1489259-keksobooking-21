'use strict';

(() => {
  let content = [];

  const saveAds = (data) => {
    content = data;
  };

  const getAds = () => content;

  window.data = {
    'saveAds': saveAds,
    'getAds': getAds
  };
})();
