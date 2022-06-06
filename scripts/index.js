//введение карточек
const originalCards = [
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
    name: 'Нижний Новгород',
    link: 'https://img.geliophoto.com/nnw/00_nnw.jpg'
    //name: 'Холмогорский район',
    //link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Адыгея',
    link: 'https://club-miry.ru/wp-content/uploads/Hlinovsky_Kovalenko/2020/Adygeya/glav_2.jpg'
  //   name: 'Байкал',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//введение карточек

//введение переменных
//переменные для функционала popup: редактирования(вызова), закрытия, добавления карт и другое
const popup = document.querySelectorAll('.popup');
const popupToAddCard = document.querySelector('.popup_to_create-card');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
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
const formImage = document.querySelector('.form__image');
const formImageTitle = document.querySelector('.form__image-title')
//form

//ввод данных
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const nameInput = document.querySelector('.form__input_info_name');
const jobInput = document.querySelector('.form__input_info_job');
//ввод данных

//хранение шаблона
const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements')
//хранение шаблона

//введение переменных

//объявление функций

//функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_open');
};
//функция открытия popup

//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_open');
};
//функция закрытия popup

//функция открытия popup для редакции автора
function openProfilePopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupToEditName);
};
//функция открытия popup для редакции автора

//функция like
function cardLike(evt) {
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
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupToEditName);
 };
//размещение


//функция добавления заголовка, картинки карточки
function addCard(image, title) {
  const wholeCard = cardTemplate.querySelector('.element').cloneNode(true);
  const imageOfCard = wholeCard.querySelector('.element__image')
  imageOfCard.src = image;
  imageOfCard.alt = title;
  wholeCard.querySelector('.element__title').textContent = title;
  wholeCard.querySelector('.element__like-button').addEventListener('click', cardLike);
  wholeCard.querySelector('.element__remove').addEventListener('click', removeCard);
  imageOfCard.addEventListener('click', () => strechImage(imageOfCard));
  return wholeCard;
};
//функция добавления заголовка, картинки для карточки

//функция масшатабирования картинки при клике (открытие)
function strechImage(element) {
  openPopup(popupToScrechImage);
  formImage.src = element.src;
  formImage.alt = element.alt;
  formImageTitle.textContent = element.alt
};
//функция масшатабирования картинки при клике (открытие)

function performCard (elementPlace, element) {
  elementPlace.prepend(element);
};

//стрелочная функция добавление массива карточек
originalCards.forEach((item) => {
  const element = addCard(item.link, item.name);
  performCard (cardElements, element);
});
//стрелочная функция добавление массива карточек
//объявление функций

//функция подтверждения
function submitAddCard(evt) {
  evt.preventDefault();
  const element = addCard(formInputImg.value, formInputTitle.value)
  performCard(cardElements, element);
  formToAddCard.reset();
  closePopup(popupToAddCard);
};
//функция подтверждения

//слушатели событий
profileEditOpenButton.addEventListener('click', openProfilePopup);
cardAddOpenButton.addEventListener('click', () =>  openPopup(popupToAddCard));
popupCloseButton.forEach((item) => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});
formToEditName.addEventListener('submit', submitProfile);
formToAddCard.addEventListener('submit', submitAddCard);
//слушатели событий
