const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const getCommentTemplate = (comment) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;

const renderComments = (picture) => {
  commentsList.innerHTML = '';
  commentsList.insertAdjacentHTML('afterbegin', picture.comments.map((comment) => getCommentTemplate(comment)).join(''));
};

const renderPictureData = ({url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const hideFullsizePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
};

const showFullsizePicture = (picture) => {
  renderPictureData(picture);
  renderComments(picture);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

function onDocumentKeyDown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideFullsizePicture();
  }
}

function onCancelButtonClick(){
  hideFullsizePicture();
}

export { showFullsizePicture };
