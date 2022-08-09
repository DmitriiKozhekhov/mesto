import Popup from './Popup.js';
export default class PopupWithVerifier extends Popup {
  constructor(popupDomObject, submitForm) {
    super(popupDomObject);
    this._formContainer = document.querySelector('.popup_to_verify').querySelector('.form');
    this._submitForm = submitForm;
  }
  open(deletingCard) {
    super.open();
    this._deletingCard = deletingCard;
  }
  setEventListeners(elem) {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(elem, this._deletingCard);
      console.log(elem);
    });
  }
}
