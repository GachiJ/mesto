import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {  popupEditProfileOpen, profilePopup, popupInputName, 
  popupInputInfo, formAddCard, cardsContainer, popupFullScreenImage, popupTypeAddPhotoOpen, 
  popupTypeAddPhoto, inputCardTitle, inputCardUrl, profileForm, addCardPopup } from "../utils/constants.js";
import { initialCards, formValidationConfig } from '../utils/variables.js'
import Popup from '../components/Popup.js';
// index.js

import './index.css';

export function handleCardClick(name, link) {
  popupFullScreenPhoto.open(name, link)
}


const popupEditProfile = new Popup(profilePopup);
popupEditProfile.setEventListeners();


const popupAddPhoto = new Popup(popupTypeAddPhoto);
popupAddPhoto.setEventListeners();

const userInfo = new UserInfo({ profileTitle: '.profile__title', profileSubtitle: '.profile__subtitle' });


const popupFullScreenPhoto = new PopupWithImage(popupFullScreenImage)
popupFullScreenPhoto.setEventListeners();


const profileFormSubmit = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.username,
      info: data.userinfo,
    });
  }
}, profilePopup)
profileFormSubmit.setEventListeners();



const addCardFormSubmit = new PopupWithForm({
  handleFormSubmit: () => {
    const data = {};

    data.name = inputCardTitle.value;
    data.link = inputCardUrl.value;


    cardsContainer.prepend(createCard(data, '.template', handleCardClick));
  }
}, addCardPopup)
addCardFormSubmit.setEventListeners();


const initCards = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template', handleCardClick);
    const cardElement = card.generateCard();
    initCards.addItem(cardElement);
  }
}, '.cards')

initCards.addItems();


const validationAddCard = new FormValidator(formValidationConfig, formAddCard);
validationAddCard.enableValidation();


const validationProfile = new FormValidator(formValidationConfig, profileForm);
validationProfile.enableValidation();



popupEditProfileOpen.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  popupInputName.value = profileInfo.name;
  popupInputInfo.value = profileInfo.info;
  popupEditProfile.open();

  validationProfile.resetValidation();
})

popupTypeAddPhotoOpen.addEventListener('click', function openTypeAddPhotoPopup() {

  formAddCard.reset();
  validationAddCard.resetValidation();
  popupAddPhoto.open();
})

function createCard(data, templateSelector, handleOpenPopup) {
  const card = new Card(data, templateSelector, handleOpenPopup);
  const cardElement = card.generateCard();


  return cardElement
}