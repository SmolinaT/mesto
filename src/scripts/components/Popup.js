export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    //слушатель закрытия попапа на оверлей
    document.addEventListener('mousedown', this._handleOverlayClose);
    //слушатель закрытия попапа на esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    //слушатель закрытия попапа на оверлей
    document.removeEventListener('mousedown', this._handleOverlayClose);
    //слушатель закрытия попапа на esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('click', this._handleOverlayClose);
  }
}