import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._buttonSave = this._popupElement.querySelector('.popup__submit');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSave.textContent = 'Удаление...';
    } else {
      this._buttonSave.textContent = 'Да';
    }
  }

  setSubmit(callback) {
    this._deleteCard = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard();
    });
  }
  
}