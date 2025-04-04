import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal, handleCloseButton, handleOverlayClick } from './components/modal';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileModalNameEl = editProfileModal.querySelector('.popup__input_type_name');
const editProfileModalDescriptionEl = editProfileModal.querySelector('.popup__input_type_description');
const editProfileForm = editProfileModal.querySelector('form[name="edit-profile"]');

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalName = newCardModal.querySelector('.popup__input_type_card-name');
const newCardModalUrl = newCardModal.querySelector('.popup__input_type_url');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('form[name="new-place"]');

const popupImageModal = document.querySelector('.popup_type_image');
const popupImageModalImage = document.querySelector('.popup__image');
const popupImageModalCaption = document.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');

profileEditButton.addEventListener('click', () => {
  fillProfileData();
  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', handleEditFormSubmit);

newCardAddButton.addEventListener('click', () => {
  openModal(newCardModal);
});

newCardForm.addEventListener('submit', handleNewCardSubmit);

popupList.forEach(popup => {
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    handleCloseButton(popup);
  });

  popup.addEventListener('click', handleOverlayClick);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileModalNameEl.value;
  profileDescription.textContent = editProfileModalDescriptionEl.value;

  closeModal(editProfileModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardName = newCardModalName.value;
  const cardUrl = newCardModalUrl.value;
  const card = createCard(cardUrl, cardName, removeCard, likeCard, handleZoomImage);
  placesList.prepend(card);

  closeModal(newCardModal);
  newCardForm.reset();
}

const fillProfileData = () => {
  editProfileModalNameEl.value = profileTitle.innerText;
  editProfileModalDescriptionEl.value = profileDescription.innerText;
};

const handleZoomImage = (title, link) => {
  popupImageModalImage.src = link;
  popupImageModalImage.alt = title;
  popupImageModalCaption.textContent = title;
  openModal(popupImageModal);
};

const initCards = initialCards => {
  initialCards.forEach(card => {
    placesList.append(createCard(card.link, card.name, removeCard, likeCard, handleZoomImage));
  });
}

initCards(initialCards);