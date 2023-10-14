/* eslint-disable no-console */
const NAMES = [
  'Александр',
  'Михаил',
  'Виктор',
  'Алексей',
  'Савелий',
  'Рашид',
  'Дмитрий',
  'Полина',
  'Станислава',
  'Елена',
  'Анна',
  'Лиза'
];

const MESSAGE_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Скучаю',
  'Summertime',
  'Soon',
  'На даче',
  'Work hard - party harder',
  'Личное - не публичное',
  'Ведь, если звезды зажигают — значит — это кому-нибудь нужно?',
  'Значит — кто-то называет эти плево́чки жемчужиной?',
  'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
  'Перед великим умом я склоняю голову, перед великим сердцем — преклоняю колени.',
  'Избыток вкуса убивает вкус',
  'Будь загадкою для кого-то. О побочках всё равно прочитаю на обороте',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const sentenceNumber = getRandomInteger(1, 2);
  const message = [];
  for (let i = 0; i < sentenceNumber; i++){
    message.push(getRandomArrayElement(MESSAGE_SENTENCES));
  }

  return message.join(' ');
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateUrlId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, Number.MAX_SAFE_INTEGER);

const createComment = () => (
  {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6).toString()}.svg`,
    message: createMessage(),
    name : getRandomArrayElement(NAMES),
  }
);

const createPost = () => (
  {
    id: generatePhotoId(),
    url: `photos/${generateUrlId().toString()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  }
);

for (let i = 0; i < 7; i++){
  console.log(createPost()/*generatePhotoId, generateUrlId, generateCommentId*/);
  //console.log(createComment(generateCommentId));
}

