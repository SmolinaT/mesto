const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__overlay');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const profileAvatar =  document.querySelector('.profile__avatar');
const formElementProfile = document.querySelector('.popup__content_name_profile');
const formElementCard = document.querySelector('.popup__content_name_cards');
const formElementAvatar = document.querySelector('.popup__content_name_avatar');

const configValid = {
  inputListSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_visible',
  errorClass: 'popup__input-error_visible'
};

export { 
  buttonEdit, buttonAdd, buttonEditAvatar, nameInput, jobInput, profileName,profileJob, profileAvatar,
  formElementProfile, formElementCard, formElementAvatar, configValid}
