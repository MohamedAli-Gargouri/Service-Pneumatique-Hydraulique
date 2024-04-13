import { color } from '@material-tailwind/react/types/components/typography';
import { size } from '@material-tailwind/react/types/components/button';
export type WidgetType = 'BUTTON';

/**
 *
 * Generic Class that represents a Widget instance within our Grid Builder Component
 * @export
 * @class Widget
 */
export class Widget {
  id: number;
  caption: string = 'Button';
  size: size = 'sm';
  type: WidgetType = 'BUTTON'; // BUTTON, ... MORE TO BE ADDED
  callbackfunction: Function = this.defaultCallbackFunction;
  hasConfirmationPopup: boolean = false;
  confirmationPopupMessage: string = 'Are you sure you want to perform this action ?';
  confirmationPopupColor: color = 'yellow';
  confirmationPopupTitle: string = 'Title';
  icon: string = 'fa-solid fa-question';
  defaultCallbackFunction() {
    // This is just a default callback function.
  }
}
export class WidgetBuilder {
  private widget: Widget;
  constructor() {
    this.widget = new Widget();
  }
  /**
   *  Sets the Id of the Widget Builder Instance
   * @param {number} id Value of the setted ID
   * @returns WigetBuilder instance with the Id Set
   */
  setId(id: number) {
    this.widget.id = id;
    return this;
  }
  /**
   *  Sets the Icon of the Widget Builder Instance
   * @param {string} icon The string value of the Icon (Font Awsome string, e.g fa-solid fa-question )
   * @returns  WigetBuilder instance with the Icon Set
   */
  setIcon(icon: string) {
    this.widget.icon = icon;
    return this;
  }
  /**
   *  Sets the popup Title of the Widget Builder Instance
   * @param {string} ConfirmationPopupTitle The value of the Title
   * @returns WigetBuilder instance with the Popup Title Set
   */
  setConfirmationPopupTitle(ConfirmationPopupTitle: string) {
    this.widget.confirmationPopupTitle = ConfirmationPopupTitle;
    return this;
  }
  /**
   *  Sets the confirmation poup color of the Widget Builder Instance
   * @param {color} ConfirmationPopupColor The value of the Color
   * @returns WigetBuilder instance with the Color of the Confirmation popup Set
   */
  setConfirmationPopupColor(ConfirmationPopupColor: color) {
    this.widget.confirmationPopupColor = ConfirmationPopupColor;
    return this;
  }
  /**
   *  Sets the confirmation Message of the Widget Builder Instance
   * @param {string} ConfirmationPopupMessage The value of the popup Message
   * @returns WigetBuilder instance with the Color of the ConfirmationPopupMessage Set
   */
  setConfirmationPopupMessage(ConfirmationPopupMessage: string) {
    this.widget.confirmationPopupMessage = ConfirmationPopupMessage;
    return this;
  }
  /**
   *  Sets the size the Widget Builder Instance
   * @param {size} size The value of the popup Message
   * @returns WigetBuilder instance with the Size set
   */
  setSIze(size: size) {
    this.widget.size = size;
    return this;
  }
  /**
   *  Sets the type the Widget Builder Instance
   * @param {WidgetType} type The value of the popup Message
   * @returns WigetBuilder instance with the Type set
   */
  setType(type: WidgetType) {
    this.widget.type = type;
    return this;
  }

  /**
   * @param {string} caption
   * @return {WidgetBuilder}
   * @memberof WidgetBuilder
   */
  /**
   *
   * Sets the Caption the Widget Builder Instance
   * @param {string} caption
   * @return {*}
   * @memberof WidgetBuilder
   */
  setCaption(caption: string) {
    this.widget.caption = caption;
    return this;
  }
  /**
   *
   *
   * @param {Function} callbackfunction
   * @return {*}
   * @memberof WidgetBuilder
   */
  setCallbackfunction(callbackfunction: Function) {
    this.widget.callbackfunction = callbackfunction;
    return this;
  }
  /**
   *
   *
   * @param {boolean} ConfirmationPopup
   * @return {*}
   * @memberof WidgetBuilder
   */
  setConfirmationPopup(ConfirmationPopup: boolean) {
    this.widget.hasConfirmationPopup = ConfirmationPopup;
    return this;
  }
  /**
   *
   *
   * @return {*}
   * @memberof WidgetBuilder
   */
  build() {
    return this.widget;
  }
}
