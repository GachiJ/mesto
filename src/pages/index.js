import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupEditProfileOpen, profilePopup, popupInputName,
  popupInputInfo, formAddCard, cardsContainer, popupFullScreenImage, popupTypeAddPhotoOpen,
  popupTypeAddPhoto, inputCardTitle, inputCardUrl, profileForm, addCardPopup
} from "../utils/constants.js";
import { initialCards, formValidationConfig } from '../utils/variables.js'
import Popup from '../components/Popup.js';
// index.js

import './index.css';

export function handleCardClick(name, link) {
  popupFullScreenPhoto.open(name, link)
}


const userInfo = new UserInfo({ profileTitle: '.profile__title', profileSubtitle: '.profile__subtitle' });


const popupFullScreenPhoto = new PopupWithImage('.popup_type_photo')
popupFullScreenPhoto.setEventListeners();


const profileFormSubmit = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.username,
      info: data.userinfo,
    });
  }
}, '.popup_type_edit-profile')
profileFormSubmit.setEventListeners();






const cardsSection = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsSection.addItem(createCard(item, '.template', handleCardClick));
  }
}, '.cards')

cardsSection.addItems();

const addCardFormSubmit = new PopupWithForm({
  handleFormSubmit: (item) => {
    cardsSection.prependItem((createCard(item, '.template', handleCardClick)));
  }
}, '.popup_type_add-photo')
addCardFormSubmit.setEventListeners();


const validationAddCard = new FormValidator(formValidationConfig, formAddCard);
validationAddCard.enableValidation();


const validationProfile = new FormValidator(formValidationConfig, profileForm);
validationProfile.enableValidation();



popupEditProfileOpen.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  profileFormSubmit.open();
  profileFormSubmit.setInputValues(profileInfo);
  validationProfile.resetValidation();
})

popupTypeAddPhotoOpen.addEventListener('click', function openTypeAddPhotoPopup() {


  validationAddCard.resetValidation();
  addCardFormSubmit.open();
})

function createCard(data, templateSelector, handleOpenPopup) {
  const card = new Card(data, templateSelector, handleOpenPopup);
  const cardElement = card.generateCard();


  return cardElement
}