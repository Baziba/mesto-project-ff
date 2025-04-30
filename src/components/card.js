import { deleteCard, deleteLike, setLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

/**
 * Функция создания карточки
 * @param {string} link Ссылка на изображение
 * @param {string} name Наименование
 * @param {Function} removeCallback Функция удаления карточки
 * @param {Function} likeCallback Функция лайка карточки
 * @param {Function} zoomCallback Функция зума при клике на карточку
 * @param {Number} userId Идентификатор пользователя
 * @returns {Node}
 */
const createCard = (cardData, removeCallback, likeCallback, zoomCallback, userId) => {
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardEl.querySelector('.card__title');
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');
  const cardLikeContainer = cardEl.querySelector('.card__like-container');
  const cardLikeButton = cardLikeContainer.querySelector('.card__like-button');
  const cardLikeCount = cardEl.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some(like => like._id === userId)

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = `${cardData.name}`;
  cardLikeCount.textContent = cardData.likes.length

  if (userId === cardData.owner._id) {
    cardDeleteButton.addEventListener('click', () => { removeCallback(cardEl, cardData._id); });
  } else {
    cardDeleteButton.remove();
  }

  cardImageEl.addEventListener('click', () => { zoomCallback(cardData.name, cardData.link); });

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', () => { likeCallback(cardLikeContainer, cardData._id); });

  return cardEl;
}

/**
 * Ставим и снимаем лайк
 * @param {Element} button 
 */
const handleLike = (cardLikeContainer, cardId) => {
  const cardLikeButton = cardLikeContainer.querySelector('.card__like-button');
  const cardLikeCounter = cardLikeContainer.querySelector('.card__like-counter');

  if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
    setLike(cardId)
      .then(result => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardLikeCounter.textContent = result.likes.length;
      })
      .catch(error => console.log(error));
  } else {
    deleteLike(cardId)
      .then(result => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardLikeCounter.textContent = result.likes.length; s
      })
      .catch(error => console.log(error));
  }
}

/**
 * Удоли карточку
 * @param {Element} card 
 */
const handleRemoveCard = (card, cardId) => {
  deleteCard(cardId)
    .then(result => {
      card.remove();
    })
    .catch(error => {
      console.log(error);
    })
}



export { createCard, handleRemoveCard, handleLike }