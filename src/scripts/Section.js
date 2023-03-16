export default class Section {
  constructor({ data, renderer }, templateSelector) {
    this._items = data;
    this._renderer = renderer;
    this._templateSelector = document.querySelector(templateSelector);
  }

  addItem(element) {
    this._templateSelector.append(element);
  }

  addItems() {

    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}