const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

const renderThumbnails = (photos) => {
  photos.forEach(({url, description, likes, comments}) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(thumbnail);
  });
  picturesList.appendChild(picturesListFragment);
};

export {renderThumbnails};
