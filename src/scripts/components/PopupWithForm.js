import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__content');
    this._inputs = this._form.querySelectorAll('.popup__text');
    this._buttonSave = this._form.querySelector('.popup__submit');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSave.textContent = 'Сохранение...';
    } else {
      this._buttonSave.textContent = 'Сохранить';
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}