import { isEscapeKey } from './utils.js';
import { bodyElement } from './consts.js';

const SUCCESS_SELECTOR = '.success';
const ERROR_SELECTOR = '.error';
const SUCCESS_BUTTON_SELECTOR = '.success__button';
const ERROR_BUTTON_SELECTOR = '.error__button';

const successAlertTemplate = bodyElement.querySelector('#success').content.querySelector(SUCCESS_SELECTOR);
const successAlertElement = successAlertTemplate.cloneNode(true);
const errorAlertTemplate = bodyElement.querySelector('#error').content.querySelector(ERROR_SELECTOR);
const errorAlertElement = errorAlertTemplate.cloneNode(true);

const hideMessage = () => {
  const currentAlert = bodyElement.querySelector(SUCCESS_SELECTOR) || bodyElement.querySelector(ERROR_SELECTOR);
  const exitButton = currentAlert.querySelector(SUCCESS_BUTTON_SELECTOR) || currentAlert.querySelector(ERROR_BUTTON_SELECTOR);
  currentAlert.remove();

  exitButton.removeEventListener('click', hideMessage);
  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

const showMessage = (currentAlert, exitButtonClass) => {
  const exitButton = currentAlert.querySelector(exitButtonClass);
  bodyElement.append(currentAlert);

  exitButton.addEventListener('click', hideMessage);
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onOutsideClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showSuccessMessage = () => {
  showMessage(successAlertElement, SUCCESS_BUTTON_SELECTOR);
};

const showErrorMessage = () => {
  showMessage(errorAlertElement, ERROR_BUTTON_SELECTOR);
};

export {showSuccessMessage, showErrorMessage};

