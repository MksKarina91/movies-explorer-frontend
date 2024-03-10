export const MAIN_API_URL = 'https://api.movies-explorer.nomoredomainswork.ru';
export const MOVIES_API_URL = 'https://api.nomoreparties.co';

export const validationConfig = {
    nameRegEx: /^[а-яА-ЯёЁa-zA-Z\s-]+$/,
    emailRegEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};
export const INITIAL_CARDS_SMALL = 5;
export const ROW_CARDS_MEDIUM = 2;
export const ROW_CARDS_LARGE = 3;
export const ROW_CARDS_EXTRA_LARGE = 4;
// Константы
export const DISPLAY_WIDTH_SMALL = 480; // До этого значения включительно будет 5 карточек по 1 в ряд
export const ADDITIONAL_CARDS_SMALL = 2; // Количество карточек, добавляемых на маленьких экранах

export const DISPLAY_WIDTH_MEDIUM = 768; // До этого значения включительно будет 4 ряда по 2 карточки
export const ADDITIONAL_CARDS_MEDIUM = 2; // Количество карточек, добавляемых на средних экранах

export const DISPLAY_WIDTH_LARGE = 1024; // До этого значения включительно будет 4 ряда по 3 карточки
export const ADDITIONAL_CARDS_LARGE = 3; // Количество карточек, добавляемых на больших экранах

export const DISPLAY_WIDTH_EXTRA_LARGE = 1280; // С этого значения и выше будет 4 ряда по 4 карточки
export const ADDITIONAL_CARDS_EXTRA_LARGE = 4; // Количество карточек, добавляемых на очень больших экранах

export const SHORT_MOVIE_DURATION = 40;
export const HOUR_DURATION_IN_MIN = 60;
