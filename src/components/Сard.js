class Card {
  constructor(data, templateSelector, handleCardClick) {
console.log(data)
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
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

    this._likeButton = this._element
      .querySelector('.card__like-button');

    this._likeButton.addEventListener('click', () => {
      this._handlelikeButton()
    })


    this._deleteButton = this._element
      .querySelector('.card__delete-button');

    this._deleteButton.addEventListener('click', () => {
      this._handledeleteButton()
    });

    

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }



  _handlelikeButton() {
    this._likeButton.classList.toggle('card__like-button_type_active');
  }



  _handledeleteButton() {
    this._element.remove();
    this._element = null;
  }


  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__photo');
    this._cardName = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListener();

    return this._element;
  }
}


export default Card
