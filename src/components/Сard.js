class Card {
  constructor(data, templateSelector, handleCardClick) {

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


    this._element.addEventListener('click', () => {
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
    this._setEventListener();

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__photo').alt = this._name;


    return this._element;
  }
}


export default Card
