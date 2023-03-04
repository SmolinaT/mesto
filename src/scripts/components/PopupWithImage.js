import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._text = this._popupElement.querySelector('.popup__caption');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
    super.open();
  }
}