'use strict';

(() => {

  const filters = document.querySelector(`.map__filters`);
  const filterType = document.querySelector(`#housing-type`);

  const compareType = (ad) => {
    return filterType.value === `any` || ad.offer.type === filterType.value;
  };

  const filterAds = (ad) => {
    return compareType(ad);
  };

  const onFilterChange = () => {
    window.map.removeAdCard();

    const filteredAds = window.data.getAds().filter(filterAds);
    window.pins.removePins();
    window.pins.renderPins(filteredAds);
  };

  filters.addEventListener(`change`, onFilterChange);
})();
