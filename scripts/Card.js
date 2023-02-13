export default class Card {
  constructor(item, templateSelector, openPhoto) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._openPhoto = openPhoto;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }

  _addEventListeners() {
    this._card.querySelector('.cards__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._card.querySelector('.cards__button').addEventListener('click', () => {
      this._likeCard();
    });
    this._cardPhoto.addEventListener('click', () => {
      this._openPhoto(this._name, this._link);
    });
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard() {
    this._card.querySelector('.cards__button').classList.toggle('cards__button_active');
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector('.cards__image');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
  
    this._cardText = this._card.querySelector('.cards__title');
    this._cardText.textContent = this._name;

    this._addEventListeners();
    return this._card;
  }
}