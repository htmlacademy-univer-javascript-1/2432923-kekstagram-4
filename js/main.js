import { renderThumbnails } from './thumbnails.js';
import { initEditPopup } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

getData()
  .then((pictures) => renderThumbnails(pictures))
  .catch((err) => showAlert(err.message));

initEditPopup();
