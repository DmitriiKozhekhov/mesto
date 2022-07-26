export const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_off',
  inputErrorClass: 'form__input_ineffective',
  errorClass: 'form__invalid-message_active'
};
export const popupToScrechImage = document.querySelector('.popup_to_image-strech');
export const popupToAddCard = document.querySelector('.popup_to_create-card');
export const profileEditOpenButton = document.querySelector('.profile__edit-button');
export const cardAddOpenButton = document.querySelector('.profile__add-button');
export const popupToEditName = document.querySelector('.popup_to_edit-name');

export const formToAddCard = popupToAddCard.querySelector('.form');
export const formToEditName = popupToEditName.querySelector('.form');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileNameInput = document.querySelector('.form__input_info_name');
export const profileJobInput = document.querySelector('.form__input_info_job');

export const cardElements = document.querySelector('.elements');

export const originalCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Адыгея',
    link: 'https://club-miry.ru/wp-content/uploads/Hlinovsky_Kovalenko/2020/Adygeya/glav_2.jpg'
  }
];
