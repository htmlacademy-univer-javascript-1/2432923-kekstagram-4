const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.social__comment-count');
//const commentElement = document.querySelector('#comment').content.querySelector()
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');

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
  // const fragment = document.createDocumentFragment();
  // picture.comments.forEach((item) => {
  //   const comment = getCommentTemplate(item);
  //   fragment.append(comment);
  // });
  // commentsList.append(fragment);
};

const renderPictureData = ({url, likes, description, comments}) => {

  document.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const hideFullsizePicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyDown);
  //cancelButton.removeEventListener('click', onCancelButtonClick);
};

const showFullsizePicture = (picture) => {
  renderPictureData(picture);
  renderComments(picture);
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onKeyDown);
  cancelButton.addEventListener('click', onCancelButtonClick);

};

function onKeyDown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideFullsizePicture();
  }
}

function onCancelButtonClick(){
  hideFullsizePicture();
}
//cancelButton.addEventListener('click', onCancelButtonClick);
export { showFullsizePicture };
