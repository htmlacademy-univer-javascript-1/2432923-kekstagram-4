import { FILE_TYPES, MAX_HASHTAG_COUNT, ValidationErrorText, VALID_SYMBOLS, inputUploadElement, formElement } from './consts.js';

const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');

export const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

export const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === descriptionFieldElement;

export const isValidFileType = () => {
  const file = inputUploadElement.files[0];
  const isValid = FILE_TYPES.some((type) => file.name.endsWith(type));
  if (isValid) {
    return true;
  }
};

const normilizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag.length > 0);

const validateDescription = (value) => value.length <= 140;
const validateHashtagCount = (value) => normilizeHashtags(value).length <= MAX_HASHTAG_COUNT;
const validateHashtagSymbols = (value) => normilizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));
const validateUniqueHashtag = (value) => {
  const lowerCaseHashtags = normilizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(hashtagFieldElement, validateUniqueHashtag, ValidationErrorText.NOT_UNIQUE_HASHTAG);
pristine.addValidator(hashtagFieldElement, validateHashtagCount, ValidationErrorText.INVALID_HASHTAGS_COUNT);
pristine.addValidator(hashtagFieldElement, validateHashtagSymbols, ValidationErrorText.INVALID_PATTERN_HASHTAG);
pristine.addValidator(descriptionFieldElement, validateDescription, ValidationErrorText.INVALID_DESCRIPTION);
