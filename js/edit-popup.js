import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './response.js';
import { Effect, PERCENT_DIVIDER, MIN_SCALE, MAX_SCALE, MAX_HASHTAG_COUNT, SCALE_STEP,
  FILE_TYPES, VALID_SYMBOLS, ErrorText, SubmitButtonText } from './consts.js';
import { isEscapeKey } from './utils.js';

const DEFAULT_EFFECT = Effect.default;

const bodyElement = document.querySelector('body');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelButtonElement = overlayElement.querySelector('.img-upload__cancel');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const formElement = bodyElement.querySelector('.img-upload__form');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');

const zoomOutElement = overlayElement.querySelector('.scale__control--smaller');
const zoomInElement = overlayElement.querySelector('.scale__control--bigger');
const scaleValueElement = overlayElement.querySelector('.scale__control--value');
const previewElement = document.querySelector('.img-upload__preview img');

const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const levelEffectElement = document.querySelector('.effect-level__value');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => sliderContainerElement.classList.remove('hidden');

const closeSlider = () => sliderContainerElement.classList.add('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start:chosenEffect.max,
  });

  if(isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onChangeEffect = (evt) => {
  chosenEffect = Effect[evt.target.value] ? Effect[evt.target.value] : Effect.default;
  previewElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  previewElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.measure})`;
  levelEffectElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
};

const initEffects = () => {
  createSlider();
  closeSlider();

  effectsElement.addEventListener('change', onChangeEffect);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const scalePicture = (value) => {
  previewElement.style.transform = `scale(${value / PERCENT_DIVIDER})`;
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
  document.activeElement === hashtagFieldElement ||
  document.activeElement === descriptionFieldElement;

const normilizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag.length > 0);

const validateDescription = (value) => value.length <= 140;

const validateHashtagCount = (value) => normilizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagSymbols = (value) => normilizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateUniqueHashtag = (value) => {
  const lowerCaseHashtags = normilizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const initValidation = () => {
  pristine.addValidator(hashtagFieldElement, validateUniqueHashtag, ErrorText.NOT_UNIQUE_HASHTAG);
  pristine.addValidator(hashtagFieldElement, validateHashtagCount, ErrorText.INVALID_HASHTAGS_COUNT);
  pristine.addValidator(hashtagFieldElement, validateHashtagSymbols, ErrorText.INVALID_PATTERN_HASHTAG);
  pristine.addValidator(descriptionFieldElement, validateDescription, ErrorText.INVALID_DESCRIPTION);
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
  resetEffects();
};

const toggleSubmitButton = (isDisabled = false) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.DEFAULT;
};

function onFormElementSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    toggleSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(() => {
        closeEditPopup();
        showSuccessMessage();
      })
      .catch(showErrorMessage)
      .finally(toggleSubmitButton);
  }
}

const onInputUploadElementChange = () => {
  if (isValidFileType()){
    openEditPopup();
    initValidation();
    initScale();
    initEffects();
  } else {
    showErrorMessage();
    formElement.reset();
  }
};

function onDocumentKeyDown(evt) {
  if (isEscapeKey && !isTextFieldFocused()) {
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
