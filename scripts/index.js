// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesListEl = document.querySelector('.places__list');

// @todo: Функция создания карточки

/**
 * 
 * @param {string} link Ссылка на изображение
 * @param {string} name Наименование
 * @param {function} removeCard Функция удаления карточки
 * @returns {Node}
 */
const createCard = (link, name, removeCard) => {
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardEl.querySelector('.card__title');
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');

  cardTitleEl.innerText = name;
  cardImageEl.src = link;
  cardImageEl.alt = `Фотография места: ${name}`;

  cardDeleteButton.addEventListener('click', () => { removeCard(cardEl); });

  return cardEl;
}


// @todo: Функция удаления карточки
const removeCard = card => {
  card.remove();
}

// @todo: Вывести карточки на страницу
const initCards = initialCards => {
  initialCards.forEach(card => {
    placesListEl.append(createCard(card.link, card.name, removeCard));
  });
}

initCards(initialCards);