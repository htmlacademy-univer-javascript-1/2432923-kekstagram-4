import { initEditPopup } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    initFilters(pictures);
  })
  .catch((err) => showAlert(err.message));

initEditPopup();
