const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderThumbnails = (photos) => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListFragment.appendChild(createThumbnail(photo));
  });
  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails};
