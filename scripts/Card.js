import { openPopup } from "./index.js";
export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
}
_getTemplate() {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);
  return cardElement;
}
_handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}
_removeCard(evt) {
  evt.target.closest('.element').remove();
}
_strechImage(evt) {
  const popupToScrechImage = document.querySelector('.popup_to_image-strech');
  const formImage = document.querySelector('.show__image');
  const formImageTitle = document.querySelector('.show__image-title');
  formImage.src = evt.target.src;;
  formImage.alt = evt.target.alt;
  formImageTitle.textContent = evt.target.alt;
  return openPopup(popupToScrechImage);
}
_setEventListener() {
  this._image = this._element.querySelector(".element__image");
  this._element
    .querySelector(".element__like-button")
    .addEventListener("click", this._handleLikeClick);
  this._element
    .querySelector(".element__remove")
    .addEventListener("click", this._removeCard);
  this._image.addEventListener("click", this._strechImage);
}
generateCard() {
  this._setEventListener();
  this._image.src = this._imageLink;
  this._image.alt = this._title;
  this._element.querySelector(".element__title").textContent = this._title;
  return this._element;
}
}
