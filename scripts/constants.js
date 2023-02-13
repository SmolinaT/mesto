const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const aboutPopup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const formElementProfile = document.querySelector('.popup__content_name_profile');
const popupProfile = document.querySelector('.popup_name_profile');
const buttonProfileClose = popupProfile.querySelector('.popup__close-button');
const popupCard = document.querySelector('.popup_name_cards');
const buttonCardClose = popupCard.querySelector('.popup__close-button');
const formElementCard = document.querySelector('.popup__content_name_cards');
const titleInput = document.querySelector('.popup__text_type_title');
const linkInput = document.querySelector('.popup__text_type_link');
const popupPhoto = document.querySelector('.popup_name_photo');
const buttonPhotoClose = popupPhoto.querySelector('.popup__close-button');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupText = popupPhoto.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.cards');

const configValid = {
  inputListSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_visible',
  errorClass: 'popup__input-error_visible'
};

export { 
  buttonEdit, buttonAdd, aboutPopup, nameInput, jobInput, profileName,profileJob,
  formElementProfile, popupProfile, buttonProfileClose, popupCard, buttonCardClose,
  formElementCard, titleInput, linkInput, popupPhoto, buttonPhotoClose, popupImage,
  popupText, cardsContainer, configValid
}
