import { COMMENTS_STEP, bodyElement } from './consts.js';

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = bigPictureElement.querySelector('.comments-shown');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const loadButtonElement = bigPictureElement.querySelector('.social__comments-loader');

let commentsShownCount = 0;
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
  commentsShownCount += COMMENTS_STEP;

  if(commentsShownCount >= comments.length) {
    loadButtonElement.classList.add('hidden');
    commentsShownCount = comments.length;
  } else {
    loadButtonElement.classList.remove('hidden');
  }

  const commentsSet = comments.slice(0, commentsShownCount);
  commentsListElement.innerHTML = '';
  commentsListElement.insertAdjacentHTML('afterbegin', commentsSet.map((comment) => getCommentTemplate(comment)).join(''));
  commentsShownCountElement.textContent = commentsShownCount;
};

const onLoadButtonClick = () => {
  renderComments();
};

const initComments = () => {
  renderComments();
  loadButtonElement.addEventListener('click', onLoadButtonClick);
};

const destroyComments = () => {
  loadButtonElement.removeEventListener('click', onLoadButtonClick);
  commentsShownCount = 0;
};

const renderPictureData = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
};

const closeViewPopup = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  destroyComments();
};

export const openViewPopup = (picture) => {
  comments = picture.comments.slice();
  renderPictureData(picture);
  initComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPopup();
  }
}

function onCancelButtonClick() {
  closeViewPopup();
}
