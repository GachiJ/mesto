/*Открытие попапа*/
var popupOpen = document.querySelector('.profile__edit-button');
var popupClose = document.querySelector('.popup__button-close');
var popup = document.querySelector('.popup');

popupOpen.addEventListener('click', function () {
  popup.classList.add('popup__open');
})

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup__open');
})

/*Кнопка сохранить*/
document.querySelector('.popup__input_type_name').defaultValue = document.querySelector('.profile__title').textContent
document.querySelector('.popup__input_type_info').defaultValue = document.querySelector('.profile__subtitle').textContent

var sumbit = document.querySelector('.popup__button-sumbit')
sumbit.addEventListener('click', function () {
  document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value
  document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__input_type_info').value
  popup.classList.remove('popup__open');
})
