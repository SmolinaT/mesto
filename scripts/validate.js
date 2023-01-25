 const configValid = {
  formSelector: '.popup__content',
  inputListelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__text_visible',
  errorClass: 'popup__input-error_visible'
};

enableValidation(configValid);


function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (form) {
    form.addEventListener('submit', (evt) => evt.preventDefault());

    const inputList = Array.from(form.querySelectorAll(config.inputListelector));
    inputList.forEach(function (input) {
      input.addEventListener('input', (evt) => {
        if(input.validity.valid) {
          resetError(input, config);
          toggleButtonState(form, inputList, config);
        } else {
          activateError(input, config);
          toggleButtonState(form, inputList, config);
        }
      })
      toggleButtonState(form, inputList, config);
    })
  })
}

function cleanErrors(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputListelector));
  inputList.forEach(function (input) {
    resetError(input, config);
  })
  toggleButtonState(form, inputList, config);
}

function inputValidity(inputList) {
  return inputList.some(input => !input.checkValidity());
}

function toggleButtonState(form, inputList, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if(inputValidity(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
  }
}

function activateError(input, config) {
  input.classList.add(config.inputErrorClass);
  const error = document.querySelector(`#${input.name}-error`);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
}

function resetError(input, config) {
  input.classList.remove(config.inputErrorClass);
  const error = document.querySelector(`#${input.name}-error`);
  error.classList.remove(config.errorClass);
}