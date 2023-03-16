import '../pages/index.css'
import Card from './components/Card.js';
import initialCards from './utils/cards.js';
import {
  buttonEdit, buttonAdd, buttonEditAvatar, aboutPopup, nameInput, jobInput, profileName,
  profileJob, profileAvatar, formElementProfile, popupProfile, buttonProfileClose, popupCard,
  buttonCardClose, formElementCard, formElementAvatar, titleInput, linkInput, popupPhoto, buttonPhotoClose,
  popupImage, popupText, cardsContainer, configValid} from './utils/constants.js';
import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js'
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithConfirmation from './components/PopupWithConfirmation.js'
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Api from './components/Api.js';
import { data } from 'autoprefixer';

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-61",
  token: "0164aac4-3c8a-4bb3-9f33-aaf495de1575",
});

let myInfo;

Promise.all([api.getUserData(), api.getInitialCards()])
.then((me, cards) => {
  myInfo = me;
  userInfo.setUserInfo(me);
  cardList.renderItems(cards);
})
.catch((err) => {
  console.log(err);
});

//Валидация форм
const formElementProfileValidator = new FormValidator(configValid, formElementProfile);
formElementProfileValidator.enableValidation();

const formElementCardValidator = new FormValidator(configValid, formElementCard);
formElementCardValidator.enableValidation();

const formElementAvatarValidator = new FormValidator(configValid, formElementAvatar);
formElementAvatarValidator.enableValidation();

//Данные пользователя
const userInfo = new UserInfo (profileName, profileJob, profileAvatar);

//Попап с картинкой
const popupWithImage = new PopupWithImage('.popup_name_photo');
popupWithImage.setEventListeners();

//Попап с данными профиля
const editProfilePopup = new PopupWithForm( { popupSelector: '.popup_name_profile',
  handleFormSubmit: (data) => {
    editProfilePopup.formUX(true);

    api.editUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.job);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.formUX(false);
    })
  }
});
editProfilePopup.setEventListeners();

//Кнопка открытия попапа профиля
buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  editProfilePopup.open();
  formElementProfileValidator.cleanErrors();
});

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item, myInfo, '.item-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleCardDelete: (item) => {
      popupDeleteCard.setSubmit(() => {
        popupDeleteCard.formUX(true);

        api.deleteCard(item._id)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeleteCard.formUX(false);
        })
      })
      popupDeleteCard.open;
    },
    handleCardLike: (item) => {
      if (!card.myLikeCard()) {
        api.addLike(item._id)
        .then((data) => {
          card.updateLike(data);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.deleteLike(item._id)
        .then((data) => {
          card.updateLike(data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  });
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
'.cards');

//Попап добавления карточки
const editCardPopup = new PopupWithForm( { popupSelector: '.popup_name_cards', 
  handleFormSubmit: (item) => {
    editCardPopup.formUX(true)

    api.addNewCard(item)
    .then((item) => {
      createCard(item);
      cardList.addItem(createCard(item));
      editCardPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editCardPopup.formUX(false);
    })
  }
});
editCardPopup.setEventListeners();

//Кнопка открытия попапа создания карточек
buttonAdd.addEventListener('click', () => {
  editCardPopup.open();
  formElementCard.reset();
  formElementCardValidator.cleanErrors();
});

//Попап с аватаром
const editAvatarPopup = new PopupWithForm( { popupSelector: '.popup_name_avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.formUX(true)

    api.editAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data.avatar);
      editAvatarPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.formUX(false);
    })
  }
});
editAvatarPopup.setEventListeners();

//Кнопка открытия попапа с аватаром
buttonEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  formElementAvatarValidator.cleanErrors();
});

//Попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation({ popupSelector: '.popup_name_delete' });
popupDeleteCard.setEventListeners();