import validation from './validation.js';
import Card from './card.js';
import { formValidationConfig } from './validation.js';

const popupEditProfileOpen = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const popupInputName = document.querySelector('.popup__input_type_name')
const popupInputInfo = document.querySelector('.popup__input_type_info')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const formAddCard = document.querySelector('#form-add-card');
const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.cards')



function closePopupEsc(evt) {

  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.currentTarget);
    }
  })
});


export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupEsc)
}




popupEditProfileOpen.addEventListener('click', function openEditPopup() {
  openPopup(profilePopup);
  popupInputName.value = profileTitle.textContent;
  popupInputInfo.value = profileSubtitle.textContent;
})

closeButtons.forEach(function (button) {

  const popup = button.closest('.popup');

  button.addEventListener('click', function () { closePopup(popup) });
});


const profileForm = document.querySelector('#profile-form');

profileForm.addEventListener('submit', function submit(evt) {
  evt.preventDefault();


  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputInfo.value;

  closePopup(profilePopup)
})


const popupTypeAddPhotoOpen = document.querySelector('.profile__add-button');
const popupTypeAddPhoto = document.querySelector('.popup_type_add-photo');


popupTypeAddPhotoOpen.addEventListener('click', function openTypeAddPhotoPopup() {
  openPopup(popupTypeAddPhoto);
  const popupButtonSubmit = popupTypeAddPhoto.querySelector('.popup__button-submit');

  popupButtonSubmit.setAttribute('disabled', true);
  popupButtonSubmit.classList.add('popup__button-submit_disabled');
})


const sumbitCardForm = document.querySelector('#form-add-card');
const inputCardTitle = document.querySelector('.popup__input_card_title');
const inputCardUrl = document.querySelector('.popup__input_card_url');

sumbitCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const data = {};

  data.name = inputCardTitle.value;
  data.link = inputCardUrl.value;

  const card = new Card(data, '.template');
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);

  evt.target.reset();

  closePopup(popupTypeAddPhoto);
})

const validationProfile = new validation(formValidationConfig, profileForm);
const validationAddCard = new validation(formValidationConfig, formAddCard);
validationProfile.enableValidation();
validationAddCard.enableValidation();