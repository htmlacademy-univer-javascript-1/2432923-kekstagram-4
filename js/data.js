import { PHOTOS_COUNT } from './consts.js';
import { getRandomArrayElement, getRandomInteger } from './utils.js';

const LikesCount = {
  MIN: 15,
  MAX: 200
};
const CommentsCount = {
  MIN: 0,
  MAX: 30
};
const AvatarID = {
  MIN: 1,
  MAX: 6
};
const MessagesCount = {
  MIN: 1,
  MAX: 2
};

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

const createMessage = () => {
  const sentenceNumber = getRandomInteger(MessagesCount.MIN, MessagesCount.MAX);
  const message = [];
  for (let i = 0; i < sentenceNumber; i++){
    message.push(getRandomArrayElement(MESSAGE_SENTENCES));
  }

  return message.join(' ');
};

const getComment = (_, id) => (
  {
    id,
    avatar: `img/avatar-${getRandomInteger(AvatarID.MIN, AvatarID.MAX).toString()}.svg`,
    message: createMessage(),
    name : getRandomArrayElement(NAMES),
  }
);

const getPhotoData = (_, id) => (
  {
    id: id++,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
    comments: Array.from({length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, getComment),
  }
);

const getPhotos = () => Array.from({length: PHOTOS_COUNT}, getPhotoData);
export {getPhotos};
