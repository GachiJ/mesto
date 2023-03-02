export const formValidationConfig = {
  
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button-submit',
  buttonDisabledClass: 'popup__button-submit_disabled',
};

class validation {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._errorClass = config.errorClass;
    this._buttonSelector = config.buttonSelector;
    this._buttonDisabledClass = config.buttonDisabledClass;

    this._formElement = formElement;

    
  }


  _addFunctionLisiners() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);


    this._inputList.forEach((item) => {
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt)
      });
    });
  }

  _handleFormInput(evt) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement =  this._formElement.querySelector(`#${inputId}-error`);


    if (input.validity.valid) {
      input.classList.remove(this._errorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }

  _toggleButton() {
    const buttonSubmit = this._formElement.querySelector(this._buttonSelector);



    const isFormvalid = this._formElement.checkValidity();



    buttonSubmit.disabled = !isFormvalid;
    buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormvalid);
  }

  enableValidation() {

    this._formElement.addEventListener('input', () => {
     this._toggleButton();
    });
    this._addFunctionLisiners();
  }
}

export default validation;
