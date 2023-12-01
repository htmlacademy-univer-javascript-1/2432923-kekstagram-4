import { showFullsizePicture } from './render-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
let pictures = null;

const onPicturesContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement) {
    const id = targetElement.dataset.pictureId;
    const [thumbnail] = pictures.filter((picture) => picture.id === +id);
    showFullsizePicture(thumbnail);
  }
};

const createThumbnail = ({url, description, likes, comments, id}) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.dataset.pictureId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderThumbnails = (data) => {
  pictures = data.slice();
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    picturesListFragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(picturesListFragment);
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

export {renderThumbnails};
