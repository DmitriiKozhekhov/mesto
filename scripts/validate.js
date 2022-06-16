const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_off',
  inputErrorClass: 'form__input_ineffective',
  errorClass: 'form__invalid-message_active'
};
const hasInvalidInputs = (inputList) => inputList.some((input) =>  !input.validity.valid);
const disableButton = (button, selectors) => {
  button.classList.add(selectors.inactiveButtonClass);
  button.disabled = true;
};
const enableButton = (button, selectors) => {
  button.classList.remove(selectors.inactiveButtonClass);
  button.disabled = false;
};
const toggleButtonState = (button, inputList, selectors) => {
  if(hasInvalidInputs(inputList) === true) {
    disableButton(button, selectors);
  } else {
    enableButton(button, selectors);
  }
};
const showInputError = (form, input, selectors) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(selectors.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(selectors.errorClass);
};
const hideInputError = (form, input, selectors) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(selectors.inputErrorClass);
  error.textContent = '';
  error.classList.remove(selectors.errorClass);
};
const hasInputs = (form, input, selectors) => {
  if (!input.validity.valid) {
    showInputError(form, input, selectors);
  } else {
    hideInputError(form, input, selectors);
  }
};
const setEventListeners = (form, selectors) => {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const button = form.querySelector(selectors.submitButtonSelector);
  toggleButtonState(button, inputList, selectors);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      hasInputs(form, input, selectors);
      toggleButtonState(button, inputList, selectors);
    });
  });
};
const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(form, selectors);
  });
};
const removeErrorOpenPopup = (form) => {
  const inputs = Array.from(form.querySelectorAll(selectors.inputSelector));
  inputs.forEach(input => {
    hideInputError(form, input, selectors);
  });
};
enableValidation(selectors);
