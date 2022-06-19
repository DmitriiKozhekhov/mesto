//введение переменных

// массив попапов
const popups = document.querySelectorAll('.popup');
// массив попапов


//переменные для функционала popup: редактирования(вызова), закрытия, добавления карт и другое

const popupToAddCard = document.querySelector('.popup_to_create-card');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupToEditName = document.querySelector('.popup_to_edit-name');
const popupToScrechImage = document.querySelector('.popup_to_image-strech');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenButton = document.querySelector('.profile__add-button');
//переменные для функционала popup: редактирования(вызова), закрытия, добавления карт и другое
//form
const formToAddCard = popupToAddCard.querySelector('.form');
const formToEditName = popupToEditName.querySelector('.form');
const formInputImg = formToAddCard.querySelector('.form__input_info_image-link');
const formInputTitle = formToAddCard.querySelector('.form__input_info_card-name');
const formImage = document.querySelector('.show__image');
const formImageTitle = document.querySelector('.show__image-title');
//form
//ввод данных
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileNameInput = document.querySelector('.form__input_info_name');
const profileJobInput = document.querySelector('.form__input_info_job');
//ввод данны
//хранение шаблона
const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements')
//хранение шаблона
//введение переменных

//объявление функций
// функция заркрытия popup по esc
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenedState = document.querySelector('.popup_open');
    closePopup(popupOpenedState);
  };
};
const closePopup = (item) => {
  item.classList.remove('popup_open');
  // document.removeEventListener('keydown', closeByEsc);
};
// функция заркрытия popup по esc

//открытие popup
const openPopup = (item) => {
  item.classList.add('popup_open');
  item.querySelector('.form__save-button').classList.add('form__save-button_off');
};
//открытие popup


//слушатель на закртыие попапов по нажатию esc и  клику на оверлей
popups.forEach(function(item) {
  item.querySelector('.popup__overlay').addEventListener('click', () => closePopup(item));
  document.addEventListener('keydown', closeByEsc);
});
//слушатель на закртыие попапов по нажатию esc и  клику на оверлей


//функция открытия popup для редакции автора
function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupToEditName);
};
//функция открытия popup для редакции автора

//функция like
//handleLikeClick.
function handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
};
//функция like

//функция удаления карточки
function removeCard(evt) {
  evt.target.closest('.element').remove();
};
//функция удаления карточки

//размещение
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupToEditName);
};
//размещение


//функция добавления заголовка, картинки карточки
function getCardElement(image, title) {
  const wholeCard = cardTemplate.querySelector('.element').cloneNode(true);
  const imageOfCard = wholeCard.querySelector('.element__image')
  imageOfCard.src = image;
  imageOfCard.alt = title;
  wholeCard.querySelector('.element__title').textContent = title;
  wholeCard.querySelector('.element__like-button').addEventListener('click', handleLikeClick);
  wholeCard.querySelector('.element__remove').addEventListener('click', removeCard);
  imageOfCard.addEventListener('click', () => strechImage(imageOfCard));
  return wholeCard;
};
//функция добавления заголовка, картинки для карточки

//функция масшатабирования картинки при клике (открытие)
function strechImage(element) {
  formImage.src = element.src;
  formImage.alt = element.alt;
  formImageTitle.textContent = element.alt;
  openPopup(popupToScrechImage);
};
//функция масшатабирования картинки при клике (открытие)
function performCard (elementPlace, element) {
  elementPlace.prepend(element);
};
//стрелочная функция добавление массива карточек
originalCards.forEach((item) => {
  const element = getCardElement(item.link, item.name);
  performCard (cardElements, element);
});
//стрелочная функция добавление массива карточек


//функция подтверждения
function submitGetCardElement(evt) {
  evt.preventDefault();
  const element = getCardElement(formInputImg.value, formInputTitle.value);
  performCard(cardElements, element);
  formToAddCard.reset();
  //evt.target.classList.add('form__save-button_off');
  // evt.target.disabled = true;
  closePopup(popupToAddCard);


};
//функция подтверждения

//слушатели событий
profileEditOpenButton.addEventListener('click', openProfilePopup);
cardAddOpenButton.addEventListener('click', () =>  openPopup(popupToAddCard));
popupCloseButtons.forEach((item) => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});
formToEditName.addEventListener('submit', submitProfile);
formToAddCard.addEventListener('submit', submitGetCardElement);
//слушатели событий
