export class Widget {
  id;
  caption = 'Button';
  size = 'sm';
  type = 'BUTTON'; // BUTTON, ... MORE TO BE ADDED
  callbackfunction = this.defaultCallbackFunction;
  hasConfirmationPopup = false;
  confirmationPopupMessage = 'Are you sure you want to perform this action ?';
  confirmationPopupColor = 'yellow';
  confirmationPopupTitle = 'Title';
  icon = 'fa-solid fa-question';
  defaultCallbackFunction() {
    // This is just a default callback function.
  }
}
export class WidgetBuilder {
  #widget;
  constructor() {
    this.#widget = new Widget();
  }
  setId(id) {
    this.#widget.id = id;
    return this;
  }
  setIcon(icon) {
    this.#widget.icon = icon;
    return this;
  }
  setConfirmationPopupTitle(ConfirmationPopupTitle) {
    this.#widget.confirmationPopupTitle = ConfirmationPopupTitle;
    return this;
  }
  setConfirmationPopupColor(ConfirmationPopupColor) {
    this.#widget.confirmationPopupColor = ConfirmationPopupColor;
    return this;
  }
  setConfirmationPopupMessage(ConfirmationPopupMessage) {
    this.#widget.confirmationPopupMessage = ConfirmationPopupMessage;
    return this;
  }
  setSIze(size) {
    this.#widget.size = size;
    return this;
  }
  setType(type) {
    this.#widget.type = type;
    return this;
  }
  setCaption(caption) {
    this.#widget.caption = caption;
    return this;
  }
  setCallbackfunction(callbackfunction) {
    this.#widget.callbackfunction = callbackfunction;
    return this;
  }
  setConfirmationPopup(ConfirmationPopup) {
    this.#widget.hasConfirmationPopup = ConfirmationPopup;
    return this;
  }
  build() {
    return this.#widget;
  }
}
