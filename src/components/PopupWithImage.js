import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupDomObject) {
    super(popupDomObject);
    this._image = this._popup.querySelector('.show__image');
    this._imageTitle = this._popup.querySelector('.show__image-title');
  }
  open(data) {
    super.open();
    this._image.src = data.src;
    this._image.alt = data.alt;
    this._imageTitle.textContent = data.alt;
  }
}