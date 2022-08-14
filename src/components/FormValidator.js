export default class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._selectors = selectors;
    this._buttonElement = this._formElement.querySelector(
      this._selectors.submitButtonSelector
    );
    this._inputList = Array.from(
      formElement.querySelectorAll(this._selectors.inputSelector)
    );
}
_showInputError = (input, validationMessage) => {
  const error = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.add(this._selectors.inputErrorClass);
  error.classList.add(this._selectors.errorClass);
  error.textContent = validationMessage;
};
_hideInputError = (input) => {
  const error = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(this._selectors.inputErrorClass);
  error.textContent = '';
  error.classList.remove(this._selectors.errorClass);
};
_hasInputs = (input) => {
  if (!input.validity.valid) {
    this._showInputError(input, input.validationMessage);
  } else {
    this._hideInputError(input);
  }
};
_hasInvalidInput() {
  return this._inputList.some((item) => {
    return !item.validity.valid;
  });
}
_disabledButton() {
  this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
  this._buttonElement.disabled = true;
}
_activeButton() {
  this._buttonElement.classList.remove(
    this._selectors.inactiveButtonClass
  );
  this._buttonElement.disabled = false;
}
toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._disabledButton();
  } else {
    this._activeButton();
  }
}
resetValidation() {
  this.toggleButtonState();

  this._inputList.forEach((item) => {
    this._hideInputError(item);
  });
}
_setEventListeners() {
  this._inputList.forEach((input) => {
    input.addEventListener("input", () => {
      this._hasInputs(input);
      this.toggleButtonState();
    });
  });
}
enableValidation() {
  this._setEventListeners();
}
}
