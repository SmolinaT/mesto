const editButton = document.querySelector('.profile__edit-button');
const aboutPopup = document.querySelector('.popup');
const closeButton= aboutPopup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__text');
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