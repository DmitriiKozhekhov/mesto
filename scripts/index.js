// введение переменных(конст) popup, close-button, edit-button
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.form__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');
// введение popup, close-button, edit-button

//test
// console.log(popup);
// console.log(popupCloseButton);
// console.log(popupOpenButton);

//введение переменных текстовых полей
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__input_info_name');
let jobInput = document.querySelector('.form__input_info_job');
//введение переменных текстовых полей

// test
// console.log(name1);
// console.log(job);
// console.log(nameInput);
// console.log(jobInput);

//функция открытия popup//
function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
};
//функция открытия popup

//функция закрытия popup
function closePopup() {
  popup.classList.remove('popup_open');
};
//функция закрытия popup

//функция сохранения popup
let formElement = document.querySelector('.form');
  function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
 };
//функция сохранения popup

//соотвествующие сулшатели событий
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
//соотвествующие сулшатели событий
