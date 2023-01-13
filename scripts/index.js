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


//функция открытия попапа
function popupOpen (popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапа
function popupClose (popup) {
  popup.classList.remove('popup_opened');
}

//функция отправки формы профиля
function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popupClose (popupProfile);
}

//слушатели попапа профиля
formElementProfile.addEventListener('submit', handleFormProfileSubmit);

buttonEdit.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupProfile);
});

buttonProfileClose.addEventListener('click', function() {
  popupClose(popupProfile);
});

//добавление карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document
	.querySelector('.item-template')
	.content
	.querySelector('.cards__item');

//функции удаления карточек
function deleteCard(event) {
	event.target.closest('.cards__item').remove();
}

function addCardEventListeners (card) {
  const buttonDelete = card.querySelector('.cards__delete');
  buttonDelete.addEventListener('click', deleteCard);
}

//функция создания карточки
function createCard ({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardPhoto = card.querySelector('.cards__image');
  cardPhoto.src = link;
  cardPhoto.alt = name;

  const cardText = card.querySelector('.cards__title');
  cardText.textContent = name;

  //функция лайка карточки
  card.querySelector('.cards__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__button_active');
  });

  addCardEventListeners(card);

  //функция попапа фото
  function openPhoto() {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    popupOpen(popupPhoto);
  }

  cardPhoto.addEventListener('click', openPhoto);

  return card;
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
  popupClose (popupCard);
}

//слушатели попапа карточек
formElementCard.addEventListener('submit', handleAddCardsSubmit);

buttonAdd.addEventListener('click', function() {
  popupOpen(popupCard);
});

buttonCardClose.addEventListener('click', function() {
  popupClose(popupCard);
});

//слушатель попапа фото
buttonPhotoClose.addEventListener('click', function() {
  popupClose(popupPhoto);
})

renderCards();