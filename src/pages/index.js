import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import { popupEditProfileOpen, formAddCard, popupTypeAddPhotoOpen, profileForm, avatarForm, profileAvatar } from "../utils/constants.js";
import { formValidationConfig } from '../utils/variables.js'

import './index.css';



export function handleCardClick(name, link) {
  popupFullScreenPhoto.open(name, link)
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '1e912130-5c1b-460f-93df-a70f02284c65',
    'Content-Type': 'application/json'
  }
})


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    cardsSection.render(cards);
  })
  .catch((err) => console.log(err))

let userId;


const userInfo = new UserInfo({ profileTitle: '.profile__title', profileSubtitle: '.profile__subtitle', avatarSelector: '.profile__avatar' });



const popupConfirmation = new PopupConfirmation('.popup_confirm_delete')
popupConfirmation.setEventListeners();



const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (formData) => {
    popupEditAvatar.renderLoading(true)
    api.changeAvatar(formData)
      .then((data) => {
        userInfo.setUserInfo(data)
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditAvatar.renderLoading(false))
  }
}, '.popup_edit_avatar')
popupEditAvatar.setEventListeners();



const popupFullScreenPhoto = new PopupWithImage('.popup_type_photo')
popupFullScreenPhoto.setEventListeners();


const profileFormSubmit = new PopupWithForm({
  handleFormSubmit: (formData) => {
    profileFormSubmit.renderLoading(true)
    api.setUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => profileFormSubmit.renderLoading(false));
  }
}, '.popup_type_edit-profile')
profileFormSubmit.setEventListeners();


const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(createCard(item, '.template', handleCardClick, userId));
  }
}, '.cards');

api.getInitialCards()
  .then((res) => {
    cardsSection.render(res);
  });



const addCardFormSubmit = new PopupWithForm({
  handleFormSubmit: (item) => {
    addCardFormSubmit.renderLoading(true)
    api.addNewCard(item)
      .then((item) => {
        cardsSection.prependItem((createCard(item, '.template', handleCardClick, userId)));
      })
      .catch((err) => console.log(err))
      .finally(() => addCardFormSubmit.renderLoading(false));
  }
}, '.popup_type_add-photo')
addCardFormSubmit.setEventListeners();


const validationAddCard = new FormValidator(formValidationConfig, formAddCard);
validationAddCard.enableValidation();


const validationProfile = new FormValidator(formValidationConfig, profileForm);
validationProfile.enableValidation();


const validationAvatar = new FormValidator(formValidationConfig, avatarForm);
validationAvatar.enableValidation();


profileAvatar.addEventListener('click', () => {
  validationAvatar.resetValidation();
  popupEditAvatar.open();
})

popupEditProfileOpen.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  profileFormSubmit.open();
  profileFormSubmit.setInputValues(profileInfo);
  validationProfile.resetValidation();
})

popupTypeAddPhotoOpen.addEventListener('click', () => {
  validationAddCard.resetValidation();
  addCardFormSubmit.open();
})



function createCard(data, templateSelector, handleOpenPopup, userId) {
  const card = new Card(data, templateSelector, handleOpenPopup,
    () => {
      popupConfirmation.setConfirm(() => {
        popupConfirmation.renderLoading(true);
        api.deleteCard(data._id)
          .then(() => {
            card.deleteCard()
            popupConfirmation.close()
          })
          .catch((err) => console.log(err))
          .finally(() => popupConfirmation.renderLoading(false))
      }),
        popupConfirmation.open()
    },
    () => {
      if (!card.isLiked()) {
        api.cardLike(data._id)
          .then((data) => {
            card.updateData(data)
            card.updateLikesLength()
          })
          .catch((err) => console.log(err))
      } else {
        api.deleteCardLike(data._id)
          .then((data) => {
            card.updateData(data)
            card.updateLikesLength()
          })
          .catch((err) => console.log(err))
      }
    },
    userId);
  const cardElement = card.generateCard();


  return cardElement
}



