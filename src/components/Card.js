export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
  }
_getTemplate() {
  const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  return cardElement;
}
_handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}
_removeCard(){
  this._element.remove();
  this._element = null;
}
_setEventListener() {
  this._image = this._element.querySelector(".element__image");
  this._element
    .querySelector(".element__like-button")
    .addEventListener("click", this._handleLikeClick);
  this._element
    .querySelector(".element__remove")
    .addEventListener("click", () => this._removeCard());
  this._image.addEventListener("click", this._handleCardClick);
}
generateCard() {
  //this._element = this._getTemplate();
  this._setEventListener();
  this._image.src = this._imageLink;
  this._image.alt = this._title;
  this._element.querySelector(".element__title").textContent = this._title;
  return this._element;
}
}
