import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._buttonSave = this._popup.querySelector('.popup__button-submit')
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = 'Удаление...';
    } else {
      this._buttonSave.textContent = 'Да';
    }
  }

  setConfirm(callback) {
    this._handleConfirmationCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSave.addEventListener('click', () => {
      this._handleConfirmationCallback();
    });
  }
}