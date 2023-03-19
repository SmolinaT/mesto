export default class Card {
  constructor(item, myInfo, templateSelector, {handleCardClick, handleCardDelete, handleCardLike}) {
    this._name = item.name;
    this._link = item.link;
    this._like = item.likes;
    this._userId = item.owner._id;
    this._myId = myInfo._id;
    this._item = item;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }

  _addEventListeners() {
    this._cardButtonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardButtonLike.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  deleteCard() {
    this._card.remove();
  }

  getId () {
    return this._item
  }

  myLikeCard() {
    return this._like.some((item) => item._id === this._myId)
  }

  updateLike(data) {
    this._like = data.likes;
    this._likeNumber.textContent = this._like.length;
    if (this.myLikeCard()) {
      this._cardButtonLike.classList.add('cards__button_active');
    } else {
      this._cardButtonLike.classList.remove('cards__button_active');
    }
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector('.cards__image');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
  
    this._cardText = this._card.querySelector('.cards__title');
    this._cardText.textContent = this._name;

    this._cardButtonDelete = this._card.querySelector('.cards__delete');
    if (this._userId !== this._myId) {
      this._cardButtonDelete.classList.add('cards__delete_hidden');
    }

    this._cardButtonLike = this._card.querySelector('.cards__button');
    this._likeNumber = this._card.querySelector('.cards__like-number');
    this._likeNumber.textContent = this._like.length;
    if(this.myLikeCard()) {
      this._cardButtonLike.classList.add('cards__button_active');
    }

    this._addEventListeners();
    return this._card;
  }
}