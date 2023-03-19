import './index.css'
import Card from '../scripts/components/Card.js'
import {
  buttonEdit, buttonAdd, buttonEditAvatar, nameInput, jobInput, profileName,
  profileJob, profileAvatar, formElementProfile,
  formElementCard, formElementAvatar, configValid} from '../scripts/utils/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js'
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Api from '../scripts/components/Api.js';
import { data } from 'autoprefixer';

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-61",
  token: "0164aac4-3c8a-4bb3-9f33-aaf495de1575",
});

let myInfo;

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([me, cards]) => {
  console.log(me);
  console.log(cards);
  myInfo = me;
  userInfo.setUserInfo(me.name, me.about);
  userInfo.setUserAvatar(me);
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
    editProfilePopup.renderLoading(true);

    api.editUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    })
  }
});
editProfilePopup.setEventListeners();

//Кнопка открытия попапа профиля
buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.setInputValues(userData);
  editProfilePopup.open();
  formElementProfileValidator.cleanErrors();
});

//функция создания карточки
const createCard = (item) => {
  const card = new Card(item, myInfo, '.item-template', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleCardDelete: () => {
      popupDeleteCard.setSubmit(() => {
        popupDeleteCard.renderLoading(true);

        api.deleteCard(card.getId()._id)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeleteCard.renderLoading(false);
        })
      });
      popupDeleteCard.open();
    },
    handleCardLike: () => {
      if (!card.myLikeCard()) {
        api.addLike(card.getId()._id)
        .then((data) => {
          card.updateLike(data);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.deleteLike(card.getId()._id)
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
    cardList.addItemAppend(createCard(item));
  }
},
'.cards');

//Попап добавления карточки
const editCardPopup = new PopupWithForm( { popupSelector: '.popup_name_cards', 
  handleFormSubmit: (item) => {
    editCardPopup.renderLoading(true)

    api.addNewCard(item)
    .then((item) => {
      createCard(item);
      cardList.addItemPrepend(createCard(item));
      editCardPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editCardPopup.renderLoading(false);
    })
  }
});
editCardPopup.setEventListeners();

//Кнопка открытия попапа создания карточек
buttonAdd.addEventListener('click', () => {
  editCardPopup.open();
  formElementCardValidator.cleanErrors();
});

//Попап с аватаром
const editAvatarPopup = new PopupWithForm( { popupSelector: '.popup_name_avatar',
  handleFormSubmit: (data) => {
    console.log(data);
    editAvatarPopup.renderLoading(true);

    api.editAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data);
      editAvatarPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
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

//Кнопка открытия попапа удаления карточки
//buttonDeleteCard.addEventListener('click', () => {
  //popupDeleteCard.open();
//});