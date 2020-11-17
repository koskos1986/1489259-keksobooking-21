'use strict';

(() => {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const ANY_VALUE = `any`;

  const priceRange = {
    ANY: `any`,
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };

  const filters = document.querySelector(`.map__filters`);
  const filterType = filters.querySelector(`#housing-type`);
  const filterPrice = filters.querySelector(`#housing-price`);
  const filterRooms = filters.querySelector(`#housing-rooms`);
  const filterGuests = filters.querySelector(`#housing-guests`);
  const filterFeatures = filters.querySelector(`#housing-features`);

  const compareType = (ad) => {
    return filterType.value === `any` || ad.offer.type === filterType.value;
  };

  const comparePrice = (ad) => {
    const adPrice = ad.offer.price;
    switch (filterPrice.value) {
      case priceRange.ANY:
        return true;
      case priceRange.LOW:
        return adPrice < LOW_PRICE;
      case priceRange.MIDDLE:
        return adPrice >= LOW_PRICE && adPrice <= HIGH_PRICE;
      case priceRange.HIGH:
        return adPrice > HIGH_PRICE;
      default:
        return false;
    }
  };

  const compareByRoomsNumber = (ad) => {
    return Number(filterRooms.value) === ad.offer.rooms || filterRooms.value === ANY_VALUE;
  };

  const compareByGuestsNumber = (ad) => {
    return Number(filterGuests.value) === ad.offer.guests || filterGuests.value === ANY_VALUE;
  };

  const compareFeatures = (ad) => {
    const checkedFeatures = filterFeatures.querySelectorAll(`.map__checkbox:checked`);
    return Array.from(checkedFeatures).every((checkedFeature) => ad.offer.features.includes(checkedFeature.value));
  };

  const filterAds = (ad) => {
    return compareType(ad) && comparePrice(ad) && compareByRoomsNumber(ad) && compareByGuestsNumber(ad) && compareFeatures(ad);
  };

  const onFilterChange = window.debounce(() => {
    window.card.remove();

    const filteredAds = window.data.get().filter(filterAds);
    window.pins.remove();
    window.pins.render(filteredAds);
  });

  filters.addEventListener(`change`, onFilterChange);
})();
