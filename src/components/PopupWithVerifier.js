import Popup from './Popup.js';
export default class PopupWithVerifier extends Popup {
  constructor(popupDomObject, submitForm) {
    super(popupDomObject);
    this._formContainer = document.querySelector('.popup_to_verify').querySelector('.form');
    this._submitForm = submitForm;
  }
  // _submitTest(evt) {
  //   evt.preventDefault();
  //   this._submitForm(this._card, this._deletingCard);
  // }
  open(card, deletingCard) {
    super.open();
    this._card = card;
    this._deletingCard = deletingCard;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._card, this._deletingCard);
    });
  }
}
