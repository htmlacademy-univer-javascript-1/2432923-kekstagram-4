import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { initEditPopup } from './edit-popup.js';
const photos = getPhotos();
renderThumbnails(photos);

initEditPopup();
