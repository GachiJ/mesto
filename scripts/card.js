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

/* const cardList = document.querySelector('.cards') */
const templateSelector = document.querySelector('.template');

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    return cardElement;
  }

  generatedCard (){
    this._element = this._getTemplate();

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.template');
  const cardElement = card.generatedCard();

  // Добавляем в DOM
  document.querySelector('.cards').append(cardElement);
})