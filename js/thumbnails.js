import { getPhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const pictures = getPhotos();
const picturesListFragment = document.createDocumentFragment();

const getThumbnails = () => {
  pictures.forEach((picture) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = picture.url;
    thumbnail.querySelector('.picture__img').alt = picture.description;
    thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__comments').textContent = picture.comments;
    //console.log(picture.querySelector('.picture__img').src);
    //console.log(ob);
    picturesList.appendChild(thumbnail);
  });
};

picturesList.appendChild(picturesListFragment);
export {getThumbnails};
