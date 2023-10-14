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
  ''
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

const createComment = () => {
  const generateCommentId = createRandomIdFromRangeGenerator(1, Number.MAX_SAFE_INTEGER);

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6).toString()}.svg`,
    message: createMessage(),
    name : getRandomArrayElement(NAMES),
  };
};


const createPost = () => {
  const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
  const generateUrlId = createRandomIdFromRangeGenerator(1, 25);

  return {
    id: generatePhotoId(),
    url: `photos/${generateUrlId().toString()}.jpg`,
    description: '',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

//const setOfPosts = Array.from({length: 2}, createPost);
//console.log(setOfPosts);
for (let i = 0; i < 30; i++){

  console.log(createPost());
}

