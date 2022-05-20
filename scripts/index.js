// введение popup, close-button, edit-button
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.form__close-button');
let popupOpenButton = document.querySelector('.profile__edit-button');

//test
// console.log(popup);
// console.log(popupCloseButton);
// console.log(popupOpenButton);

// введение popup, close-button, edit-button
//введение переменных текстовых полей
let name1 = document.querySelector('.profile__name');
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
  nameInput.value = name1.textContent;
  jobInput.value = job.textContent;
};
popupOpenButton.addEventListener('click', openPopup);
//функция открытия popup

//функция закрытия popup
function closePopup() {
  popup.classList.remove('popup_open');
};
popupCloseButton.addEventListener('click', closePopup);
//функция закрытия popup

//функция сохранения popup
let formElement = document.querySelector('.form');
 function formSubmitHandler(evt) {
   evt.preventDefault();
 name1.textContent = nameInput.value;
 job.textContent = jobInput.value;
 popup.classList.remove('popup_open');
 };
formElement.addEventListener('submit', formSubmitHandler);
//функция сохранения popup
