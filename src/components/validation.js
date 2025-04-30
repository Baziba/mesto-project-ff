/**
 * Включение валидации форм
 * @param {object} validationConfig 
 */
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

/**
 * Сброс результатов валидации формы
 * @param {*} formElement 
 * @param {*} validationConfig 
 */
export const clearValidation = (formElement, validationConfig) => {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  setButtonState(buttonElement, true, validationConfig.inactiveButtonClass);
  inputElements.forEach(inputElement => {
    hideInputError(inputElement, validationConfig);
  });
}

/**
 * Устанавливаем слушателей на поля воода
 * @param {Element} formElement 
 * @param {object} validationConfig 
 */
const setEventListeners = (formElement, validationConfig) => {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputElements, buttonElement, validationConfig.inactiveButtonClass);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, validationConfig);
      toggleButtonState(inputElements, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

/**
 * Переключаем состояние кнопки "Сохранить" в зависимости от валидности формы
 * @param {Array} inputElements 
 * @param {Element} buttonElement 
 * @param {string} inactiveButtonClass
 */
const toggleButtonState = (inputElements, buttonElement, inactiveButtonClass) => {
  setButtonState(buttonElement, hasInvalidInput(inputElements), inactiveButtonClass);
};

/**
 * Устанавливаем состояние кнопки
 * @param {Element} buttonElement 
 * @param {boolean} isDisabled 
 * @param {string} inactiveButtonClass 
 */
const setButtonState = (buttonElement, isDisabled, inactiveButtonClass) => {
  buttonElement.disabled = isDisabled;
  isDisabled ? buttonElement.classList.add(inactiveButtonClass) : buttonElement.classList.remove(inactiveButtonClass);
}

/**
 * Форма содержит поля с ошибками?
 * @param {Array} inputList 
 * @returns {bool}
 */
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

/**
 * Показываем сообщение об ошибке в поле
 * @param {Element} inputElement 
 * @param {object} validationConfig 
 */
const showInputError = (inputElement, validationConfig) => {
  const errorElement = document.getElementById(`${inputElement.name}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

/**
 * Скрываем сообщение об ошибке
 * @param {Element} inputElement 
 * @param {object} validationConfig 
 */
const hideInputError = (inputElement, validationConfig) => {
  const errorElement = document.getElementById(`${inputElement.name}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

/**
 * Проверка корректности формы
 * @param {Element} inputElement 
 * @param {object} validationConfig 
 */
const isValid = (inputElement, validationConfig) => {
  inputElement.setCustomValidity(inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : "");
  !inputElement.validity.valid ? showInputError(inputElement, validationConfig) : hideInputError(inputElement, validationConfig);
};
