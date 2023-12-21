import { initThumbnails } from './thumbnails.js';
import { initEditPopup } from './edit-popup.js';
import { getData } from './api.js';
import { debounce, showAlert } from './utils.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    initThumbnails(pictures);
    initFilters(pictures, debounce(initThumbnails));
  })
  .catch((err) => showAlert(err.message));

initEditPopup();
