import { debounce, shuffle } from './utils.js';
import { initThumbnails, destroyThumbnails } from './thumbnails.js';
import { MAX_COUNT_RANDOM_PICTURE, Filter } from './consts.js';

const HIDDEN_CONTAINER_CLASS = 'img-filters--inactive';
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = filtersContainerElement.querySelector('.img-filters__form');

let pictures = [];
let activeFilter = Filter.DEFAULT;

const sortByCommentsCount = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getDefaultPictures = () => pictures.slice();
const getRandomPictures = () => shuffle(pictures.slice()).slice(0, MAX_COUNT_RANDOM_PICTURE);
const getDiscussedPictures = () => pictures.slice().sort(sortByCommentsCount);

const filterFunction = {
  [Filter.DEFAULT]: getDefaultPictures,
  [Filter.RANDOM]: getRandomPictures,
  [Filter.DISCUSSED]: getDiscussedPictures,
};

const onFiltersFormClick = (evt) => {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filtersFormElement.querySelector(`#${activeFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    activeFilter = id;
    const filteredPictures = filterFunction[activeFilter]();
    destroyThumbnails();
    initThumbnails(filteredPictures);
  }
};

export const initFilters = (data) => {
  pictures = data.slice();
  filtersContainerElement.classList.remove(HIDDEN_CONTAINER_CLASS);
  filtersFormElement.addEventListener('click', debounce(onFiltersFormClick));

  initThumbnails(pictures);
};
