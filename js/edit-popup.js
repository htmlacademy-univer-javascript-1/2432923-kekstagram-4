const VALID_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const PERCENT_DIVIDER = 100;

const errorText = {
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Неуникальный хэштег',
  INVALID_PATTERN_HASHTAG: 'Неправильный хэштег',
  INVALID_DESCRIPTION: 'Слишком длинный комментарий',
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelButtonElement = overlayElement.querySelector('.img-upload__cancel');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const formElement = bodyElement.querySelector('.img-upload__form');
const commentElement = overlayElement.querySelector('.text__description');
const hashtagsElement = formElement.querySelector('.text__hashtags');
const descriptionElement = formElement.querySelector('.text__description');

const zoomOutElement = overlayElement.querySelector('.scale__control--smaller');
const zoomInElement = overlayElement.querySelector('.scale__control--bigger');
const scaleValueElement = overlayElement.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');

const scalePicture = (value) => {
  preview.style.transform = `scale(${value / PERCENT_DIVIDER})`;
  scaleValueElement.value = `${value}%`;
};

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaleValueElement.value, 10);
  if (currentValue > MIN_SCALE) {
    scalePicture(currentValue - SCALE_STEP);
  }
};

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaleValueElement.value, 10);
  if (currentValue < MAX_SCALE) {
    scalePicture(currentValue + SCALE_STEP);
  }
};

const initScale = () => {
  scalePicture(MAX_SCALE);
  zoomOutElement.addEventListener('click', onZoomOutButtonClick);
  zoomInElement.addEventListener('click', onZoomInButtonClick);
};

const isValidFileType = () => {
  const file = inputUploadElement.files[0];
  const isValid = FILE_TYPES.some((type) => file.name.endsWith(type));
  if (isValid) {
    return true;
  }
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagsElement ||
  document.activeElement === commentElement;

const normilizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag.length > 0);

const validateDescription = (value) => value.length <= 140;

const validateHashtagCount = (value) => normilizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagSymbols = (value) => normilizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateUniqueHashtag = (value) => {
  const lowerCaseHashtags = normilizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const initHashtagValidation = () => {
  pristine.addValidator(hashtagsElement, validateUniqueHashtag, errorText.NOT_UNIQUE_HASHTAG);
  pristine.addValidator(hashtagsElement, validateHashtagCount, errorText.INVALID_HASHTAGS_COUNT);
  pristine.addValidator(hashtagsElement, validateHashtagSymbols, errorText.INVALID_PATTERN_HASHTAG);
};

const initDescriptionValidation = () => {
  pristine.addValidator(descriptionElement, validateDescription, errorText.INVALID_DESCRIPTION);
};

const initValidation = () => {
  initHashtagValidation();
  initDescriptionValidation();
};

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const openEditPopup = () => {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormElementSubmit);
};

const closeEditPopup = () => {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormElementSubmit);

  formElement.reset();
  pristine.reset();
  resetScale();
};

const onInputUploadElementChange = () => {
  if (isValidFileType()){
    openEditPopup();
    initValidation();
    initScale();
  }
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeEditPopup();
  }
}

function onCancelButtonClick() {
  closeEditPopup();
}

const initEditPopup = () => {
  inputUploadElement.addEventListener('change', onInputUploadElementChange);
};

export { initEditPopup };
