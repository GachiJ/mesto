
const popupOpen = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const popupInputName = document.querySelector('.popup__input_type_name')
const popupInputInfo = document.querySelector('.popup__input_type_info')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const fullScreenPhoto = document.querySelector('.popup__photo');
const caption = document.querySelector('.popup__caption');
const popupTypePhoto = document.querySelector('.popup_type_photo');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupOpen.addEventListener('click', function openEditPopup() {
  openPopup(profilePopup);
  popupInputName.value = profileTitle.textContent;
  popupInputInfo.value = profileSubtitle.textContent;
})


closeButtons.forEach(function (button) {

  const popup = button.closest('.popup');

  button.addEventListener('click', function () { closePopup(popup) });
});


const sumbitForm = document.querySelector('#profile-form');

sumbitForm.addEventListener('submit', function submit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputInfo.value;

  closePopup(profilePopup)
})


const popupTypeAddPhotoOpen = document.querySelector('.profile__add-button');
const popupTypeAddPhoto = document.querySelector('.popup_type_add-photo');

popupTypeAddPhotoOpen.addEventListener('click', function openTypeAddPhotoPopup() {
  openPopup(popupTypeAddPhoto);
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

function createCard(name, link) {

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').setAttribute('alt', 'Фотография ' + name);


  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_type_active');
  })


  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })


  const cardPhoto = cardElement.querySelector('.card__photo');

  cardPhoto.addEventListener('click', function () {
    openPopup(popupTypePhoto);
    
    fullScreenPhoto.src = link;
    caption.textContent = name;
    fullScreenPhoto.setAttribute('alt', 'Фотография ' + name);
  })

  return cardElement
}

initialCards.forEach(function (ele) {
  cardList.append(createCard(ele.name, ele.link))
})


const sumbitCardForm = document.querySelector('#form-add-card');
const inputCardTitle = document.querySelector('.popup__input_card_title');
const inputCardUrl = document.querySelector('.popup__input_card_url');

sumbitCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  cardList.prepend(createCard(inputCardTitle.value, inputCardUrl.value));

  evt.target.reset();

  closePopup(popupTypeAddPhoto);
})