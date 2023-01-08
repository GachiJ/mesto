
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');

popupOpen.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  document.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
  document.querySelector('.popup__input_type_info').value = document.querySelector('.profile__subtitle').textContent;
})

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

let sumbitForm = document.querySelector('.popup__form');

sumbitForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value;
  document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__input_type_info').value;
  popup.classList.remove('popup_opened');
})
