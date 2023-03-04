class FormValidator {
  constructor(formValidationConfig, formElement) {
    this._inputSelector = formValidationConfig.inputSelector;
    this._errorClass = formValidationConfig.errorClass;
    this._buttonSelector = formValidationConfig.buttonSelector;
    this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;

    this._formElement = formElement;

    this._buttonSubmit = this._formElement.querySelector(this._buttonSelector);
  }


  _addFunctionLisiners() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);


    this._inputList.forEach((item) => {
      item.addEventListener('input', (item) => {
        this._handleFormInput(item)
        this.toggleButton();
      });
    });
  }

  _handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    this._errorElement = this._formElement.querySelector(`#${inputId}-error`);


    if (input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  toggleButton() {
    const isFormvalid = this._formElement.checkValidity();


    this._buttonSubmit.disabled = !isFormvalid;
    this._buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormvalid);
  }

  _showInputError(input) {
    input.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _hideInputError(input) {
    input.classList.add(this._errorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  enableValidation() {
    this._addFunctionLisiners();
    this.toggleButton();
  }
}

export default FormValidator;
