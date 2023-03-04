export default class Card {
  constructor(item, templateSelector, {handleCardClick}) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__item').cloneNode(true);
  }

  _addEventListeners() {
    this._card.querySelector('.cards__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard() {
    this._cardButton.classList.toggle('cards__button_active');
  }

  createCard() {
    this._card = this._getTemplate();
    this._cardButton = this._card.querySelector('.cards__button');
    this._cardPhoto = this._card.querySelector('.cards__image');
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
  
    this._cardText = this._card.querySelector('.cards__title');
    this._cardText.textContent = this._name;

    this._addEventListeners();
    return this._card;
  }
}