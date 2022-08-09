export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems(array) {
   return array.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}