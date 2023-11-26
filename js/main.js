import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';

renderThumbnails(getPhotos());
