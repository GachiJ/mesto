
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('#popup-edit-button-close');
const popup = document.querySelector('.popup');

popupOpen.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  document.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
  document.querySelector('.popup__input_type_info').value = document.querySelector('.profile__subtitle').textContent;
})

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

let sumbitForm = document.querySelector('#profile-form');

sumbitForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value;
  document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__input_type_info').value;
  popup.classList.remove('popup_opened');
})


const popupTypePhotoOpen = document.querySelector('.profile__add-button');
const popupTypePhotoClose = document.querySelector('#popup-type-photo-button-close');
const popupTypePhoto = document.querySelector('.popup_type_add-photo');

popupTypePhotoOpen.addEventListener('click', function () {
  popupTypePhoto.classList.add('popup_opened');
})

popupTypePhotoClose.addEventListener('click', function () {
  popupTypePhoto.classList.remove('popup_opened');
})

const initialCards = [
  {
    name: 'Альпы',
    link: 'https://images.unsplash.com/photo-1673055022236-0bce66b62569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Афганистан',
    link: 'https://images.unsplash.com/photo-1673860503924-e8085c807ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Норвегия',
    link: 'https://images.unsplash.com/photo-1672506107198-865adfdf6db6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector('.cards')
const cardTemplate = document.querySelector('.template').content

initialCards.forEach(function (ele) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = ele.name;
  cardElement.querySelector('.card__photo').src = ele.link;


  cardList.append(cardElement)
})


const sumbitCardForm = document.querySelector('#form-add-card');


sumbitCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = document.querySelector('.popup__input_card_title').value;
  cardElement.querySelector('.card__photo').src = document.querySelector('.popup__input_card_url').value;

  popupTypePhoto.classList.remove('popup_opened');


  let cardLikeButton = cardElement.querySelector('.card__like-button');

  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_type_active');
  })

  let deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })



  cardList.prepend(cardElement);

  const popupCardPhotoClose = document.querySelector('#popup-photo-button-close');
  const popupPhoto = document.querySelector('.popup_type_photo');

  let fullScreenPhoto = document.querySelector('.popup__photo');
  let caption = document.querySelector('.popup__caption');

  let popupCardPhoto = document.querySelector('.card__photo');

  popupCardPhoto.addEventListener('click', function () {
    popupPhoto.classList.add('popup_opened')

    fullScreenPhoto.src = document.querySelector('.card__photo').src;
    caption.textContent = document.querySelector('.card__title').textContent;
  })

  popupCardPhotoClose.addEventListener('click', function () {
    popupPhoto.classList.remove('popup_opened');
  })

})

let cardLikeButton = document.querySelectorAll('.card__like-button');

cardLikeButton.forEach(function (ele) {

  ele.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_type_active');
  })
});


let deleteButton = document.querySelectorAll('.card__delete-button');

deleteButton.forEach(function (ele) {
  ele.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })
})

const popupCardPhotoOpen = document.querySelectorAll('.card');

const popupCardPhotoClose = document.querySelector('#popup-photo-button-close');
const popupPhoto = document.querySelector('.popup_type_photo');

let fullScreenPhoto = document.querySelector('.popup__photo');
let caption = document.querySelector('.popup__caption');

popupCardPhotoOpen.forEach(function (ele) {
  let popupCardPhoto = ele.querySelector('.card__photo');

  popupCardPhoto.addEventListener('click', function () {
    popupPhoto.classList.add('popup_opened')

    fullScreenPhoto.src = ele.querySelector('.card__photo').src;
    caption.textContent = ele.querySelector('.card__title').textContent;
  })

  popupCardPhotoClose.addEventListener('click', function () {
    popupPhoto.classList.remove('popup_opened');
  })
})