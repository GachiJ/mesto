export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {

    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes
    this._ownerId = data.owner._id;

    this._templateSelector = templateSelector;
    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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


    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    })




    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick()
    });



    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }



  updateData(newData) {
    this._likes = newData.likes;
  }


  updateLikesLength() {
    this._likeNumber.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('card__like-button_type_active');
    } else {
      this._likeButton.classList.remove('card__like-button_type_active');
    }
  }


  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }



  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__photo');
    this._cardName = this._element.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;

    this._likeNumber = this._element.querySelector('.card__like-number')

    this._likeButton = this._element
      .querySelector('.card__like-button');

    if (this.isLiked()) {
      this._likeButton.classList.add('card__like-button_type_active');
    }

    this._deleteButton = this._element
      .querySelector('.card__delete-button');

    if (this._ownerId === this._userId) {
      this._deleteButton.classList.add('card__delete-button_active')
    }

    this.updateLikesLength()

    this._setEventListener();



    return this._element;
  }
}