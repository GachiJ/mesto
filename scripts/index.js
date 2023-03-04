import FormValidator from './Validation.js';
import Card from './Сard.js';
import { initialCards, formValidationConfig } from "./variables.js";

const popupEditProfileOpen = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputInfo = document.querySelector('.popup__input_type_info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formAddCard = document.querySelector('#form-add-card');
const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup__photo');
const popupImageCaption = document.querySelector('.popup__caption');
const popupFullScreenImage = document.querySelector('.popup_type_photo');


function closePopupEsc(evt) {

  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.currentTarget);
    }
  })
});


function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupEsc)
}

function handleOpenPopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupFullScreenImage);
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
  validationProfile();
})

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item, '.template', handleOpenPopup));
})

function createCard(data, templateSelector, handleOpenPopup) {
  const card = new Card(data, templateSelector, handleOpenPopup);
  const cardElement = card.generateCard();

  
  return cardElement
}


const sumbitCardForm = document.querySelector('#form-add-card');
const inputCardTitle = document.querySelector('.popup__input_card_title');
const inputCardUrl = document.querySelector('.popup__input_card_url');

sumbitCardForm.addEventListener('submit', function (evt, toggleButton) {
  evt.preventDefault();

  const data = {};

  data.name = inputCardTitle.value;
  data.link = inputCardUrl.value;


  cardsContainer.prepend(createCard(data, '.template', handleOpenPopup));

  formAddCard.reset();

  validationAddCard();

  closePopup(popupTypeAddPhoto);
})

function validationAddCard() {
  const validationAddCard = new FormValidator(formValidationConfig, formAddCard);
  validationAddCard.enableValidation();
}

function validationProfile() {
  const validationProfile = new FormValidator(formValidationConfig, profileForm);
  validationProfile.enableValidation();
}

validationAddCard();
validationProfile();
