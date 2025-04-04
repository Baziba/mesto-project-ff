
const cardTemplate = document.querySelector('#card-template').content;

/**
 * Функция создания карточки
 * @param {string} link Ссылка на изображение
 * @param {string} name Наименование
 * @param {Function} removeCallback Функция удаления карточки
 * @param {Function} likeCallback Функция лайка карточки
 * @param {Function} zoomCallback Функция зума при клике на карточку
 * @returns {Node}
 */
const createCard = (link, name, removeCallback, likeCallback, zoomCallback) => {
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardEl.querySelector('.card__title');
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');
  const cardLikeButton = cardEl.querySelector('.card__like-button');

  cardTitleEl.textContent = name;
  cardImageEl.src = link;
  cardImageEl.alt = `${name}`;

  cardImageEl.addEventListener('click', () => { zoomCallback(name, link); });
  cardDeleteButton.addEventListener('click', () => { removeCallback(cardEl); });
  cardLikeButton.addEventListener('click', () => { likeCallback(cardLikeButton); });

  return cardEl;
}

/**
 * Ставим и снимаем лайк
 * @param {Element} button 
 */
const likeCard = button => {
  button.classList.toggle('card__like-button_is-active');
}

/**
 * Удоли карточку
 * @param {Element} card 
 */
const removeCard = card => {
  card.remove();
}

export { createCard, removeCard, likeCard }