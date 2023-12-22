export const COMMENTS_STEP = 5;
export const MAX_COUNT_RANDOM_PICTURE = 10;
export const PHOTOS_COUNT = 25;
export const ALERT_SHOW_TIME = 5000;
export const VALID_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i;
export const FILE_TYPES = ['jpg', 'jpeg', 'png', 'PNG'];
export const MAX_HASHTAG_COUNT = 5;
export const SCALE_STEP = 25;
export const MAX_SCALE = 100;
export const MIN_SCALE = 25;
export const PERCENT_DIVIDER = 100;

export const bodyElement = document.querySelector('body');
export const inputUploadElement = bodyElement.querySelector('.img-upload__input');
export const formElement = bodyElement.querySelector('.img-upload__form');

export const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};
export const Effect = {
  NONE: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    measure: '',
  },
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  HEAT: {
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
};
export const ValidationErrorText = {
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Не уникальный хэштег',
  INVALID_PATTERN_HASHTAG: 'Неправильный хэштег',
  INVALID_DESCRIPTION: 'Слишком длинный комментарий',
};
export const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
};
export const RequestErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
