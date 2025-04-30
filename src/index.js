import './pages/index.css';
import { createCard, handleRemoveCard, handleLike } from './components/card';
import { openModal, closeModal, handleCloseButton, handleOverlayClick } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import { getInitialCards, getUser, updateUser, uploadAvatar, uploadCard } from './components/api';

let userId;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
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

const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const editAvatarUrl = editAvatarModal.querySelector('.popup__input_type_url');
const editAvatarForm = document.querySelector('form[name="new-avatar"]');

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

profileEditButton.addEventListener('click', () => {
  fillUserData();
  clearValidation(editProfileModal, validationConfig);
  openModal(editProfileModal);
});

editProfileForm.addEventListener('submit', handleEditFormSubmit);

newCardAddButton.addEventListener('click', () => {
  openModal(newCardModal);
});

newCardForm.addEventListener('submit', handleNewCardSubmit);

profileImage.addEventListener('click', () => {
  openModal(editAvatarModal);
});

editAvatarForm.addEventListener('submit', handleNewAvatarSubmit);

popupList.forEach(popup => {
  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    handleCloseButton(popup);
  });

  popup.addEventListener('click', handleOverlayClick);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = editProfileModalNameEl.value;
  const about = editProfileModalDescriptionEl.value;

  renderLoading(editProfileForm);
  updateUser({ name, about })
    .then(result => {
      console.log(result);

      profileTitle.textContent = editProfileModalNameEl.value;
      profileDescription.textContent = editProfileModalDescriptionEl.value;
      closeModal(editProfileModal)
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(editProfileForm, false);
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = newCardModalName.value;
  const link = newCardModalUrl.value;

  renderLoading(newCardForm);

  uploadCard({ name, link })
    .then(result => {
      const card = createCard(result, handleRemoveCard, handleLike, handleZoomImage, userId);
      placesList.prepend(card);
      clearValidation(newCardModal, validationConfig);
      closeModal(newCardModal);
      newCardForm.reset();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(newCardForm, false);
    });

}

function handleNewAvatarSubmit(evt) {
  evt.preventDefault();
  const link = editAvatarUrl.value;

  renderLoading(editAvatarForm);
  uploadAvatar(link)
    .then(result => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      closeModal(editAvatarModal);
      editAvatarForm.reset();

    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(editAvatarForm, false);
    });
}

const fillUserData = () => {
  editProfileModalNameEl.value = profileTitle.innerText;
  editProfileModalDescriptionEl.value = profileDescription.innerText;
};

const renderLoading = (popupElement, isLoading = true) => {
  const buttomElement = popupElement.querySelector('.popup__button');
  buttomElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

const handleZoomImage = (title, link) => {
  popupImageModalImage.src = link;
  popupImageModalImage.alt = title;
  popupImageModalCaption.textContent = title;
  openModal(popupImageModal);
};

const setUserData = user => {
  userId = user._id;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

const initCards = initialCards => {
  initialCards.forEach(card => {
    placesList.append(createCard(card, handleRemoveCard, handleLike, handleZoomImage, userId));
  });
}

enableValidation(validationConfig);

Promise.all([getInitialCards(), getUser()])
  .then(([initialCards, user]) => {
    setUserData(user);
    console.log(initialCards);
    initCards(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });
