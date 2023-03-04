export default class FormValidator {
  constructor( config, form ) {
    this._form = form;
    this._inputListSelector = config.inputListSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputListSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _inputValidity() {
    return this._inputList.some((input) => !input.checkValidity());
  }
  
  _toggleButtonState() {
    if(this._inputValidity()) {
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.removeAttribute('disabled');
    }
  }
  
  _resetError(input) {
    input.classList.remove(this._inputErrorClass);
    const error = this._form.querySelector(`#${input.id}-error`);
    error.classList.remove(this._errorClass);
  }

  _activateError(input) {
    input.classList.add(this._inputErrorClass);
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
  }
  
  _isValid(input) {
    if(input.validity.valid) {
      this._resetError(input);
      this._toggleButtonState();
    } else {
      this._activateError(input);
      this._toggleButtonState();
    }
  }
  
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._isValid(input);
      })
      this._toggleButtonState();
    })
  }

  cleanErrors() {
    this._inputList.forEach((input) => {
      this._resetError(input);
    })
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}