import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './response.js';
import { Effect, PERCENT_DIVIDER, MIN_SCALE, MAX_SCALE, SCALE_STEP,
  SubmitButtonText, bodyElement, inputUploadElement, formElement } from './consts.js';
import { isEscapeKey } from './utils.js';
import { pristine, isValidFileType, isTextFieldFocused } from './validator.js';

const DEFAULT_EFFECT = Effect['NONE'];

const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelButtonElement = overlayElement.querySelector('.img-upload__cancel');

const zoomOutElement = overlayElement.querySelector('.scale__control--smaller');
const zoomInElement = overlayElement.querySelector('.scale__control--bigger');
const scaleValueElement = overlayElement.querySelector('.scale__control--value');
const previewElement = document.querySelector('.img-upload__preview img');

const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

let chosenEffect = DEFAULT_EFFECT;

const loadPicture = () => {
  previewElement.src = URL.createObjectURL(inputUploadElement.files[0]);
};

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => sliderContainerElement.classList.remove('hidden');

const closeSlider = () => sliderContainerElement.classList.add('hidden');

const removeSlider = () => {
  chosenEffect = DEFAULT_EFFECT;
  closeSlider();
  sliderElement.noUiSlider.destroy();
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  previewElement.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.measure})`;
  effectLevelElement.value = sliderValue;
};

const createSlider = () => {
  closeSlider();
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const onEffectsElementChange = (evt) => {
  chosenEffect = Effect[evt.target.value.toUpperCase()];
  updateSlider();
};

const resetEffectsSlider = () => {
  removeSlider();
  effectsElement.removeEventListener('change', onEffectsElementChange);
};

const initEffectsSlider = () => {
  createSlider();
  effectsElement.addEventListener('change', onEffectsElementChange);
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

const resetScale = () => {
  zoomInElement.removeEventListener('click', onZoomInButtonClick);
  zoomOutElement.removeEventListener('click', onZoomOutButtonClick);
};

const openEditPopup = () => {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormElementSubmit);
};

const closeEditPopup = () => {
  formElement.reset();
  pristine.reset();
  resetEffectsSlider();
  resetScale();

  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormElementSubmit);
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
      .finally(() => {
        closeEditPopup();
        toggleSubmitButton();
      });
  }
}

const onInputUploadElementChange = () => {
  if (isValidFileType()){
    openEditPopup();
    loadPicture();
    initScale();
    initEffectsSlider();
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

export const initEditPopup = () => {
  inputUploadElement.addEventListener('change', onInputUploadElementChange);
};
