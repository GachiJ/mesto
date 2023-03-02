import { openPopup } from "./index.js";

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

const cardList = document.querySelector('.cards');

class Card {
  constructor(data, templateSelector) {

    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }


  _setEventListener() {
    const cardLikeButton = this._element
      .querySelector('.card__like-button');

    cardLikeButton.addEventListener('click', () => {
      this._getLikeButton()
    })


    const deleteButton = this._element
      .querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => {
      this._getDeleteButton()
    });


    const cardPhoto = this._element.querySelector('.card__photo');

    cardPhoto.addEventListener('click', () => {
      this._getFullScreenPhoto()
    })
  }



  _getLikeButton() {
    this._element
      .querySelector('.card__like-button').classList.toggle('card__like-button_type_active');
  }



  _getDeleteButton() {
    this._element.remove();
  }



  _getFullScreenPhoto() {
    const fullScreenPhoto = document.querySelector('.popup__photo');
    const caption = document.querySelector('.popup__caption');
    const popupTypePhoto = document.querySelector('.popup_type_photo');


    openPopup(popupTypePhoto);

    fullScreenPhoto.src = this._link;
    caption.textContent = this._name;
    fullScreenPhoto.setAttribute('alt', 'Фотография ' + this._name);
  }


  generateCard() {
    this._element = this._getTemplate();

    this._setEventListener();

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;


    return this._element;
  }
}


initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();


  cardList.append(cardElement);
})

export default Card