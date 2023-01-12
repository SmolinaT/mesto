const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const aboutPopup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const formElementProfile = document.querySelector('.popup__content_name_profile');
const popupProfile = document.querySelector('.popup_name_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const popupCards = document.querySelector('.popup_name_cards');
const closeButtonCards = popupCards.querySelector('.popup__close-button');
const formElementCards = document.querySelector('.popup__content_name_cards');
const titleInput = document.querySelector('.popup__text_type_title');
const linkInput = document.querySelector('.popup__text_type_link');
const popupPhoto = document.querySelector('.popup_name_photo');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button');


//функция открытия попапа
function popupOpen (popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапа
function popupClose (popup) {
  popup.classList.remove('popup_opened');
}


//функция отправки формы профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popupClose (popupProfile);
}

//слушатели попапа профиля
formElementProfile.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupProfile);
});

closeButtonProfile.addEventListener('click', function() {
  popupClose(popupProfile);
});


//добавление карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  const deleteButton = card.querySelector('.cards__delete');
  deleteButton.addEventListener('click', deleteCard)
}

//функция создания карточки
function createCard ({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardPhoto = card.querySelector('.cards__image');
  cardPhoto.src = link;

  const cardText = card.querySelector('.cards__title');
  cardText.textContent = name;

  //функция лайка карточки
  card.querySelector('.cards__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__button_active');
  });

  addCardEventListeners(card);

  //функция попапа фото
  function openPhoto() {
    const popupImage = popupPhoto.querySelector('.popup__image');
    popupImage.src = link;
    popupText = popupPhoto.querySelector('.popup__caption');
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
function addCardsSubmit (evt) {
  evt.preventDefault();

	const newCard = createCard({
    name: titleInput.value, 
    link: linkInput.value});

	addCard(newCard);
  popupClose (popupCards);
}


//слушатели попапа карточек
formElementCards.addEventListener('submit', addCardsSubmit);

addButton.addEventListener('click', function() {
  popupOpen(popupCards);
});

closeButtonCards.addEventListener('click', function() {
  popupClose(popupCards);
});


//слушатель попапа фото
closeButtonPhoto.addEventListener('click', function() {
  popupClose(popupPhoto);
})

renderCards();