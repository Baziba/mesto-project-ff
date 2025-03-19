// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesListEl = document.querySelector('.places__list');

// @todo: Функция создания карточки
/**
 * 
 * @param {string} link Ссылка на изображение
 * @param {string} name Название
 */
function addCard(link, name) {
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardEl.querySelector('.card__title');
  const cardImageEl = cardEl.querySelector('.card__image');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');

  cardTitleEl.innerText = name;
  cardImageEl.setAttribute('src', link);

  cardDeleteButton.addEventListener('click', () => {
    removeCard(cardEl);
  });

  placesListEl.append(cardEl);
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function initCards(initialCards) {
  initialCards.forEach(card => {
    addCard(card.link, card.name)
  });
}

initCards(initialCards);