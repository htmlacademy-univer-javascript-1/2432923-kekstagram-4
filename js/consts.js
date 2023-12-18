export const COMMENTS_STEP = 5;
export const PHOTOS_COUNT = 25;
export const ALERT_SHOW_TIME = 5000;
export const VALID_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i;
export const FILE_TYPES = ['jpg', 'jpeg', 'png'];
export const MAX_HASHTAG_COUNT = 5;
export const SCALE_STEP = 25;
export const MAX_SCALE = 100;
export const MIN_SCALE = 25;
export const PERCENT_DIVIDER = 100;
export const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Сохраняю...'
};
export const Effect = {
  default: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    measure: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    measure: '',
  },
};
export const ErrorText = {
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Не уникальный хэштег',
  INVALID_PATTERN_HASHTAG: 'Неправильный хэштег',
  INVALID_DESCRIPTION: 'Слишком длинный комментарий',
};

