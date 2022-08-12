import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupDomObject) {
    super(popupDomObject);
    this._image = this._popup.querySelector('.show__image');
    this._imageTitle = this._popup.querySelector('.show__image-title');
  }
  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._imageTitle.textContent = data.name;
    super.open();
  }
}
