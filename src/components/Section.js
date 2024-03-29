export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.append(item);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  render(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}