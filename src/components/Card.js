export default class Card {
  constructor(data, cardSelector, handleCardClickPopup, handleDeletePopup, handleSetLike, handleRemoveLike, myId) {
    this._data = data;
    this._title = data.name;
    this._imageLink = data.link;
    this._likesCount = data.likes.length;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClickPopup = handleCardClickPopup;
    this._handleDeletePopup = handleDeletePopup;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    //this._handleLike = handleLike;
    this._elementLike = this._element.querySelector('.element__like-button');
    this._myId = myId;
}
_getTemplate() {
  const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  return cardElement;
}
_handleCardClick(data) {
  this._handleCardClickPopup.open(data);
}
_handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}
_handleDelete(data, deletingCard) {
  this._handleDeletePopup.open(data, deletingCard);
}
removeCard(item){
  item.remove();
  item = null;
}
_removeActivator() {
  if(this._cardOwnerId !== this._myId) {
    this._element.querySelector('.element__remove').classList.add('element__remove_inactive');
  }
}
_likeActive() {
    if (this._likes.some((item) => {
      return item._id === this._myId;
    })) {
      this._elementLike.classList.add('element__like-button_active');
  }
  };
  setLike() {
    this._elementLike.classList.add('element__like-button_active');
  }
  removeLike() {
    this._elementLike.classList.remove('element__like-button_active');
  }
// _likeToCard(evt) {
//   this._handleLike(evt.target);
// }
counterOfLikes(number) {
  this._likeCounterContainer = this._element.querySelector('.element__like-counter');
  this._likeCounterContainer.textContent = number;
}
_setEventListener() {
  this._image = this._element.querySelector(".element__image");
  this._element
    .querySelector(".element__like-button")
    .addEventListener("click", () => {
      if(this._elementLike.classList.contains('element__like-button_active')) {
        this._handleRemoveLike(this._data);
      } else {
        this._handleSetLike(this._data);
      }
    });
  this._element
    .querySelector(".element__remove")
    .addEventListener("click", () =>{
      this._handleDelete(this._data, this._element);
    });
  this._image.addEventListener("click", () => {
    this._handleCardClick(this._data);
  });
}
generateCard() {
  this._likeActive();
  this._setEventListener();
  this._removeActivator();
  this._image.src = this._imageLink;
  this._image.alt = this._title;
  this._element.querySelector(".element__title").textContent = this._title;
  this.counterOfLikes(this._likesCount);
  return this._element;
}
}
