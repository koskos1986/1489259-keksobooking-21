'use strict';

(() => {
  let content = [];

  const saveData = (data) => {
    content = data;
  };

  const getData = () => content;

  window.data = {
    'saveData': saveData,
    'getData': getData
  };
})();
