const editButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup');
const closeButton= aboutPopup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');
const formElement = document.querySelector('.popup__content');

function popupOpen () {
  aboutPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose () {
  aboutPopup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popupClose ();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit); 

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

  function deleteCard(event) {
    event.target.closest('.cards__item').remove();
  }
  
  function cloneCard(event) {
    const clonedCard = event.target.closest('.cards__item').cloneNode(true);
    addCard(clonedCard);
  }

  function createCard ({name, link}) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector('.cards__image');
    cardPhoto.src = link;

    const cardText = card.querySelector('.cards__title');
    cardText.textContent = name;

    return card;
  }

  function renderCards() {
    initialCards.forEach(item => {
      const cardHtml = createCard(item);
      cardsContainer.append(cardHtml);
    })
  }

  renderCards();
