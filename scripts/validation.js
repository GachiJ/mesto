const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button-submit',
  buttonDisabledClass: 'popup__button-submit_disabled',
};


function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach(function (form) {

    addFunctionLisiners(form, config);
    toggleButton(config, form);

    form.addEventListener('input', function () {
      toggleButton(config, form);
    });
  });
};


function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);


  if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}


function toggleButton(config, form) {
  const buttonSubmit = form.querySelector(config.buttonSelector);



  const isFormvalid = form.checkValidity();



  buttonSubmit.disabled = !isFormvalid;
  buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormvalid);
}


function addFunctionLisiners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);


  inputList.forEach(function (item) {
    item.addEventListener('input', function (evt) {
      handleFormInput(evt, config)
    });
  });
}


enableValidation(formValidationConfig);