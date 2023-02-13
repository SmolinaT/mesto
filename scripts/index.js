import Card from './Card.js';
import initialCards from './cards.js';
import {
  buttonEdit, buttonAdd, aboutPopup, nameInput, jobInput, profileName,
  profileJob, formElementProfile, popupProfile, buttonProfileClose, popupCard,
  buttonCardClose, formElementCard, titleInput, linkInput, popupPhoto, buttonPhotoClose,
  popupImage, popupText, cardsContainer, configValid
} from './constants.js';
import FormValidator from './FormValidator.js';

const formElementProfileValidator = new FormValidator(configValid, formElementProfile);
const formElementCardValidator = new FormValidator(configValid, formElementCard);

//функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  //слушатель закрытия попапа на оверлей
  document.addEventListener('click', closePopupOnOverlay);
  //слушатель закрытия попапа на esc
  document.addEventListener('keydown', closePopupOnEsc);
}

//функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  //слушатель закрытия попапа на оверлей
  document.removeEventListener('mousedown', closePopupOnOverlay);
  //слушатель закрытия попапа на esc
  document.removeEventListener('keydown', closePopupOnEsc);
}

//функция закрытия попапа на оверлей
function closePopupOnOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

//функция закрытия попапа на esc
function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
 }

//слушатель закрытия попапа на esc
 document.addEventListener('keydown', closePopupOnEsc);

//функция отправки формы профиля
function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup (popupProfile);
}

//слушатели попапа профиля
formElementProfile.addEventListener('submit', handleFormProfileSubmit);

buttonEdit.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  formElementProfileValidator.cleanErrors();
});

buttonProfileClose.addEventListener('click', function() {
  closePopup(popupProfile);
});

//функция попапа фото
function openPhoto(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
  openPopup(popupPhoto);
}

//функция создания карточки
function createCard (item) {
  const card = new Card(item, '.item-template', openPhoto);
  return card.createCard();
}

function renderCards() {
  initialCards.reverse().forEach(item => {
    const cardHtml = createCard(item);
    addCard(cardHtml);
  })
}

//функция добавления карточки
function addCard(card) {
  cardsContainer.prepend(card);
}

//функция отправки формы карточек
function handleAddCardsSubmit (evt) {
  evt.preventDefault();
  
  const newCard = createCard({
    name: titleInput.value, 
    link: linkInput.value});
    
  addCard(newCard);
  closePopup (popupCard);
}

//слушатели попапа карточек
formElementCard.addEventListener('submit', handleAddCardsSubmit);

buttonAdd.addEventListener('click', function() {
  openPopup(popupCard);
  formElementCard.reset();
  formElementCardValidator.cleanErrors();
});

buttonCardClose.addEventListener('click', function() {
  closePopup(popupCard);
});

//слушатель попапа фото
buttonPhotoClose.addEventListener('click', function() {
  closePopup(popupPhoto);
})

renderCards();

formElementProfileValidator.enableValidation();
formElementCardValidator.enableValidation();