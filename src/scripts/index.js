import '../pages/index.css'
import Card from './components/Card.js';
import initialCards from './utils/cards.js';
import {
  buttonEdit, buttonAdd, aboutPopup, nameInput, jobInput, profileName,
  profileJob, formElementProfile, popupProfile, buttonProfileClose, popupCard,
  buttonCardClose, formElementCard, titleInput, linkInput, popupPhoto, buttonPhotoClose,
  popupImage, popupText, cardsContainer, configValid
} from './utils/constants.js';
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js'
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';

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