export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
  }

  close() {
    this._popupSelector.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popupSelector);
    }
  }

  setEventListeners() {
    const bottonClose = this._popupSelector.querySelector(".popup__button-close");

    bottonClose.addEventListener('click', () => {
      this.close();
    })

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    })

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    })
  }
}