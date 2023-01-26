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
  document.removeEventListener('click', closePopupOnOverlay);
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
  cleanErrors(formElementProfile, configValid);
});

buttonProfileClose.addEventListener('click', function() {
  closePopup(popupProfile);
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
    openPopup(popupPhoto);
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
  closePopup (popupCard);
}

//слушатели попапа карточек
formElementCard.addEventListener('submit', handleAddCardsSubmit);

buttonAdd.addEventListener('click', function() {
  formElementCard.reset();
  cleanErrors(formElementCard, configValid);
  openPopup(popupCard);
});

buttonCardClose.addEventListener('click', function() {
  closePopup(popupCard);
});

//слушатель попапа фото
buttonPhotoClose.addEventListener('click', function() {
  closePopup(popupPhoto);
})

renderCards();