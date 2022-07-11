import Card from "./Card.js";
import FormValidator from "./FormValidator.js"
import {originalCards} from "./originalCards.js"
const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_off',
  inputErrorClass: 'form__input_ineffective',
  errorClass: 'form__invalid-message_active'
};
const popups = document.querySelectorAll('.popup');
const popupToAddCard = document.querySelector('.popup_to_create-card');
const popupToEditName = document.querySelector('.popup_to_edit-name');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenButton = document.querySelector('.profile__add-button');
const formToAddCard = popupToAddCard.querySelector('.form');
const formToEditName = popupToEditName.querySelector('.form');
const formInputImg = formToAddCard.querySelector('.form__input_info_image-link');
const formInputTitle = formToAddCard.querySelector('.form__input_info_card-name');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileNameInput = document.querySelector('.form__input_info_name');
const profileJobInput = document.querySelector('.form__input_info_job');
const cardElements = document.querySelector('.elements');
export const popupToScrechImage = document.querySelector('.popup_to_image-strech');
export const formImage = document.querySelector('.show__image');
export const formImageTitle = document.querySelector('.show__image-title');
const validatorFormToEditAuthor = new FormValidator (
  selectors,
  formToEditName
);
const validatorFromToAddCard = new FormValidator (
  selectors,
  formToAddCard
);
export const openPopup = (item) => {
  item.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
};
const closePopup = (item) => {
  item.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
};
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenedState = document.querySelector('.popup_open');
    closePopup(popupOpenedState);
  };
};
function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  validatorFormToEditAuthor.resetValidation();
  openPopup(popupToEditName);
};
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupToEditName);
};
function performCard (elementPlace, element) {
  elementPlace.prepend(element);
};
function handleNewCard(card) {
  const newCard = new Card(card, "#card").generateCard();
  return newCard;
};
function submitAddCard(evt) {
  evt.preventDefault();
  const cardContainer = [];
  cardContainer.link = formInputImg.value;
  cardContainer.name = formInputTitle.value;
  performCard(cardElements, handleNewCard(cardContainer));
  closePopup(popupToAddCard);
  formToAddCard.reset();
};
validatorFormToEditAuthor.enableValidation();
validatorFromToAddCard.enableValidation();
profileEditOpenButton.addEventListener('click', openProfilePopup);
cardAddOpenButton.addEventListener('click', () =>  {
  formToAddCard.reset();
  validatorFromToAddCard.resetValidation();
  openPopup(popupToAddCard);
});
formToEditName.addEventListener('submit', submitProfile);
formToAddCard.addEventListener('submit', submitAddCard);
popups.forEach((item) => {
  item.addEventListener("mousedown", function (evt) {
    if (
      evt.target.classList.contains("popup_open") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(item);
    }
  });
});
originalCards.forEach((item) => {
  performCard (cardElements, handleNewCard(item));
});
