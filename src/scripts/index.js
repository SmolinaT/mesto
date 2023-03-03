import '../pages/index.css'
import Card from './Card.js';
import initialCards from './cards.js';
import {
  buttonEdit, buttonAdd, aboutPopup, nameInput, jobInput, profileName,
  profileJob, formElementProfile, popupProfile, buttonProfileClose, popupCard,
  buttonCardClose, formElementCard, titleInput, linkInput, popupPhoto, buttonPhotoClose,
  popupImage, popupText, cardsContainer, configValid
} from './constants.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

const formElementProfileValidator = new FormValidator(configValid, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(configValid, formElementCard);
formElementCardValidator.enableValidation();

const userInfo = new UserInfo (profileName, profileJob);

const popupWithImage = new PopupWithImage('.popup_name_photo');
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm( { popupSelector: '.popup_name_profile',
  handleFormSubmit: (data) => {
    console.log(data);
    userInfo.setUserInfo(data.name, data.job);
    editProfilePopup.close()
  }
});
editProfilePopup.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editProfilePopup.open();
  formElementProfileValidator.cleanErrors();
});

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item, '.item-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  });
  return card.createCard();
}

const cardList = new Section({ items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
'.cards');
cardList.renderItems()

const editCardPopup = new PopupWithForm( { popupSelector: '.popup_name_cards', 
  handleFormSubmit: (item) => {
    createCard(item);
    cardList.addItem(createCard(item));
    editCardPopup.close()
  }
});
editCardPopup.setEventListeners();

buttonAdd.addEventListener('click', () => {
  editCardPopup.open();
  formElementCard.reset();
  formElementCardValidator.cleanErrors();
});

//buttonCardClose.addEventListener('click', function() {
  //closePopup(popupCard);
//});

//слушатель попапа фото
//buttonPhotoClose.addEventListener('click', function() {
  //closePopup(popupPhoto);
//})

//функция отправки формы профиля
//function handleFormProfileSubmit (evt) {
  //evt.preventDefault();
  //const name = nameInput.value;
  //const job = jobInput.value;
  //profileName.textContent = name;
  //profileJob.textContent = job;
  //closePopup (popupProfile);
//}

//слушатели попапа профиля
//formElementProfile.addEventListener('submit', handleFormProfileSubmit);


//функция попапа фото
//function openPhoto(name, link) {
  //popupImage.src = link; 
  //popupImage.alt = name; 
  //popupText.textContent = name; 
  //openPopup(popupPhoto); 
//}

//функция создания карточки
//function createCard (item) {
  //const card = new Card(item, '.item-template', openPhoto);
  //return card.createCard();
//}

//function renderCards() {
  //initialCards.reverse().forEach(item => {
    //const cardHtml = createCard(item);
    //addCard(cardHtml);
  //})
//}

//function renderCards() {
  //initialCards.reverse().forEach(item => {
    //const cardHtml = createCard(item);
    //addCard(cardHtml);
  //})
//}

//функция добавления карточки
//function addCard(card) {
  //cardsContainer.prepend(card);
//}

//функция отправки формы карточек
//function handleAddCardsSubmit (evt) {
  //evt.preventDefault();
  
  //const newCard = createCard({
  //  name: titleInput.value, 
    //link: linkInput.value});
    
  //addCard(newCard);
  //closePopup (popupCard);
//}

//слушатели попапа карточек
//formElementCard.addEventListener('submit', handleAddCardsSubmit);







//renderCards();

