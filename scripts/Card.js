import { openPopup, popupToScrechImage, formImage, formImageTitle } from "./index.js";
export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
}
_getTemplate() {
  return document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);
}
_handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}
_removeCard(){
  this._element.remove();
}
_strechImage(evt) {
  formImage.src = evt.target.src;;
  formImage.alt = evt.target.alt;
  formImageTitle.textContent = evt.target.alt;
  openPopup(popupToScrechImage);
}
_setEventListener() {
  this._image = this._element.querySelector(".element__image");
  this._element
    .querySelector(".element__like-button")
    .addEventListener("click", this._handleLikeClick);
  this._element
    .querySelector(".element__remove")
    .addEventListener("click", () => this._removeCard());
  this._image.addEventListener("click", this._strechImage);
}
generateCard() {
  this._element = this._getTemplate();
  this._setEventListener();
  this._image.src = this._imageLink;
  this._image.alt = this._title;
  this._element.querySelector(".element__title").textContent = this._title;
  return this._element;
}
}
