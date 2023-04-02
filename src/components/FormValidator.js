export default class FormValidator {
  constructor(formValidationConfig, formElement) {
    this._inputSelector = formValidationConfig.inputSelector;
    this._errorClass = formValidationConfig.errorClass;
    this._buttonSelector = formValidationConfig.buttonSelector;
    this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;

    this._formElement = formElement;

    this._buttonSubmit = this._formElement.querySelector(this._buttonSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
  }


  _addFunctionLisiners() {
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._handleFormInput(item)
        this._toggleButton();
      });
    });
  }

  _handleFormInput(input) {
    const inputId = input.id;
    this._errorElement = this._formElement.querySelector(`#${inputId}-error`);


    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleButton() {
    const isFormvalid = this._formElement.checkValidity();


    this._buttonSubmit.disabled = !isFormvalid;
    this._buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormvalid);
  }

  _showInputError(input) {
    input.classList.add(this._errorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    input.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  resetValidation() {
    this._toggleButton();

    this._inputList.forEach((inputElement) => {
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideInputError(inputElement)
    });
  }

  enableValidation() {
    this._addFunctionLisiners();
    this._toggleButton();
  }
}