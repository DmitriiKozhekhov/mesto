import { myId } from "../utils/constants.js";
export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDelete, {handleLike}) {
    this._data = data;
    this._title = data.name;
    this._imageLink = data.link;
    this._likesCount = data.likes.length;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._elementLike = this._element.querySelector('.element__like-button');
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
_removeActivator() {
  if(this._cardOwnerId !== myId) {
    this._element.querySelector('.element__remove').classList.add('element__remove_inactive');
  }
}
_likeActive() {
    if (this._likes.some((item) => {
      return item._id === myId;
    })) {
      this._elementLike.classList.add('element__like-button_active');
  }
  };
_likeToCard(evt) {
  this._handleLike(evt.target);
}
counterOfLikes(number) {
  this._likeCounterContainer = this._element.querySelector('.element__like-counter');
  this._likeCounterContainer.textContent = number;
}
_setEventListener() {
  this._image = this._element.querySelector(".element__image");
  this._element
    .querySelector(".element__like-button")
    .addEventListener("click", (evt)=>{
      this._likeToCard(evt);
    });
  this._element
    .querySelector(".element__remove")
    .addEventListener("click", () =>{
      this._handleDelete (this._data, this._element);
    } );
  this._image.addEventListener("click", this._handleCardClick);
}
generateCard() {
  this._likeActive();
  this._removeActivator();
  this._setEventListener();
  this._image.src = this._imageLink;
  this._image.alt = this._title;
  this._element.querySelector(".element__title").textContent = this._title;
  this.counterOfLikes(this._likesCount);
  return this._element;
}
}
