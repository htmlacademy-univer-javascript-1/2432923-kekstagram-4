const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
//const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShownCountElement = bigPicture.querySelector('.comments-shown');
//const maxCommentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');

//let picture;

let commentsShown = COMMENTS_STEP;
let comments = [];

const getCommentTemplate = (comment) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;

const renderComments = () => {
  if(commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  }
  const commentsSet = comments.slice(0, commentsShown);
  commentsList.innerHTML = '';
  commentsList.insertAdjacentHTML('afterbegin', commentsSet.map((comment) => getCommentTemplate(comment)).join(''));
  commentsShownCountElement.textContent = commentsShown;
};

// const displayCommentsCounter = () => `
//   <div class="social__comment-count">
//     ${commentsShown} из <span class="comments-count">125</span> комментариев
//   </div>`;

const onLoadButtonClick = () => {
  commentsShown += COMMENTS_STEP;
  if(commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  //bigPicture.querySelector('.social__comment-count').textContent = commentsCounter;
  //displayCommentsCounter();


  renderComments();
};

const initComments = () => {
  commentsLoader.classList.remove('hidden');
  renderComments();

  commentsLoader.addEventListener('click', onLoadButtonClick);
};

// const destroyComments = () => {

// };

const renderPictureData = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const hideFullsizePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsLoader.removeEventListener('click', onLoadButtonClick);
  commentsShown = COMMENTS_STEP;
};

const showFullsizePicture = (picture) => {
  //picture = data;
  comments = picture.comments.slice();
  renderPictureData(picture);
  //renderComments();
  initComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  //commentsCount.classList.add('hidden');
  //commentsLoader.classList.add('hidden');

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
