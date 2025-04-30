/**
 * Открываем попап
 * @param {Element} el Попап, который нужно открыть
 */
const openModal = (el) => {
  document.addEventListener('keyup', handleEscKey);
  el.classList.add('popup_is-opened');
}

/**
 * Обработчик клика на оверлей
 * @param {Event} evt 
 */
const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target)
  };
}

/**
 * Обработчик нажатия на Escape
 * @param {Event} evt 
 */
const handleEscKey = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (null !== activePopup) {
      closeModal(activePopup)
    };
  }
}

/**
 * Обработчик клика по кнопке закрытия
 * @param {Element} popup 
 */
const handleCloseButton = (popup) => {
  closeModal(popup);
}

/**
 * Закрываем попап
 * @param {Element} el 
 */
const closeModal = (el) => {
  document.removeEventListener('keyup', handleEscKey);
  el.classList.remove('popup_is-opened');
}

export { openModal, closeModal, handleCloseButton, handleOverlayClick }
