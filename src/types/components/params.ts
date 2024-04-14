import { ClickEvent } from 'devextreme/ui/button';
import { FormButtonStylingMode, FormButtonType } from './general';
import { ValueChangedEvent } from 'devextreme/ui/check_box';
import { ValueChangedEvent as ValueChangedEventTextBox } from 'devextreme/ui/text_box';
import { Dispatch, SetStateAction } from 'react';

/**
 *
 *
 * @export
 * @interface PaginationParam
 */
export interface PaginationParam {
  AllData: Array<any>;
  VisibleData: Array<any>;
  SetVisibleData: Function;
  currentPage: number;
  setCurrentPage: Function;
}

/**
 * @export
 * @class FormButtonParam
 */
export class FormButtonParam {
  Text: string = '';
  type?: FormButtonType = 'default';
  stylingMode?: FormButtonStylingMode = 'contained';
  OnClickCallBackFn?: Function = (e: ClickEvent) => {};
  width?: string | number = '';
  fullWidth?: Boolean = false;
}
export class FormButtonParamBuilder {
  private formButtonParam: FormButtonParam;
  constructor() {
    this.formButtonParam = new FormButtonParam();
  }
  /**
   * @param {string} text
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setText(text: string): FormButtonParamBuilder {
    this.formButtonParam.Text = text;
    return this;
  }
  /**
   * @param {FormButtonType} type
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setType(type: FormButtonType): FormButtonParamBuilder {
    this.formButtonParam.type = type;
    return this;
  }
  /**
   * @param {FormButtonStylingMode} stylingMode
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setStylingMode(stylingMode: FormButtonStylingMode): FormButtonParamBuilder {
    this.formButtonParam.stylingMode = stylingMode;
    return this;
  }
  /**
   * @param {Function} fun
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setClickCallBackFunction(fun: Function): FormButtonParamBuilder {
    this.formButtonParam.OnClickCallBackFn = fun;
    return this;
  }
  /**
   * @param {(string | number)} width
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setWidth(width: string | number): FormButtonParamBuilder {
    this.formButtonParam.width = width;
    return this;
  }
  /**

   * @param {boolean} isFullWidth
   * @return {*}  {FormButtonParamBuilder}
   * @memberof FormButtonParamBuilder
   */
  setFullWidth(isFullWidth: boolean): FormButtonParamBuilder {
    this.formButtonParam.fullWidth = isFullWidth;
    return this;
  }

  build(): FormButtonParam {
    return this.formButtonParam;
  }
}

/**
 *
 *
 * @export
 * @class FormCheckBoxParam
 */
export class FormCheckBoxParam {
  public _state: [boolean, Dispatch<SetStateAction<boolean>>];
  set state(state: [boolean, Dispatch<SetStateAction<boolean>>]) {
    this._state = state;
    this.value = state[0];
  }
  get state() {
    return this._state;
  }
  public ThreeStateBehavior: boolean = false;
  public elementAttr: { 'aria-label': 'Checked' } | { 'aria-label': 'Unchecked' } = { 'aria-label': 'Unchecked' };
  public onValueChanged: Function = (e: ValueChangedEvent) => {
    if (this.state != undefined) {
      this.state[1](e.value);
    }
    this.value = e.value;
  };
  public iconSize: number = 15;
  private _value: boolean;
  set value(value: boolean) {
    this._value = value;
    if (value === true) {
      this.elementAttr = { 'aria-label': 'Checked' };
    } else {
      this.elementAttr = { 'aria-label': 'Unchecked' };
    }
  }
  get value() {
    return this._value;
  }
  public text: string = '';
}
/**
 * @export
 * @class FormCheckBoxParamBuilder
 */
export class FormCheckBoxParamBuilder {
  private formCheckBoxParam: FormCheckBoxParam;
  constructor() {
    this.formCheckBoxParam = new FormCheckBoxParam();
  }
  /**
   * @param {boolean} enableThreeStateBehavior
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   */
  setThreeStateBehavior(enableThreeStateBehavior: boolean): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.ThreeStateBehavior = enableThreeStateBehavior;
    return this;
  }

  /**
   * @param {({ 'aria-label': 'Checked' } | { 'aria-label': 'Unchecked' })} elementAttr
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   */
  private setElementAttr(
    elementAttr: { 'aria-label': 'Checked' } | { 'aria-label': 'Unchecked' },
  ): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.elementAttr = elementAttr;
    return this;
  }
  /**
   * @param {Function} fun
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   */
  setOnValueChanged(fun: Function): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.onValueChanged = fun;
    return this;
  }
  /**
   * @param {number} iconSize
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   */
  setIconSize(iconSize: number): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.iconSize = iconSize;
    return this;
  }
  /**
   * @param {boolean} value
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   *
   */
  private setValue(value: boolean): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.value = value;
    return this;
  }
  /**
   * @param {string} text
   * @return {*}  {FormCheckBoxParamBuilder}
   * @memberof FormCheckBoxParamBuilder
   */
  setText(text: string): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.text = text;
    return this;
  }

  setState(state: [boolean, Dispatch<SetStateAction<boolean>>]): FormCheckBoxParamBuilder {
    this.formCheckBoxParam.state = state;
    return this;
  }
  /**
   * @return {*}  {FormCheckBoxParam}
   * @memberof FormCheckBoxParamBuilder
   */
  build(): FormCheckBoxParam {
    return this.formCheckBoxParam;
  }
}

/**
 *
 *
 * @export
 * @class FormTextBoxParam
 */
export class FormTextBoxParam {
  private _state: [string, Dispatch<SetStateAction<string>>];
  set state(state: [string, Dispatch<SetStateAction<string>>]) {
    this._state = state;
    this.value = state[0];
  }
  get state() {
    return this._state;
  }
  public placeholder: string = '';
  public value: string = '';
  public inputAttr: { 'aria-label': string } = { 'aria-label': 'TextBox' };
  public onValueChanged: Function = (e: ValueChangedEventTextBox) => {
    this.value = e.value;
    this._state[1](e.value);
  };
  public showClearButton: boolean = true;
  private _label: string = '';
  set label(label: string) {
    this._label = label;
    this.inputAttr = { 'aria-label': label };
  }
  get label() {
    return this._label;
  }
  public labelMode: 'floating' | 'hidden' | 'outside' | 'static' = 'floating';
  public mode: 'url' | 'email' | 'password' | 'search' | 'tel' | 'text' = 'text';
  public readonly: boolean = false;
  public enableValidation: boolean = false;
  public isRequired: boolean = false;
}

export class FormTextBoxParamBuilder {
  private formTextBoxParam: FormTextBoxParam;
  constructor() {
    this.formTextBoxParam = new FormTextBoxParam();
  }

  public setState(state: [string, Dispatch<SetStateAction<string>>]): FormTextBoxParamBuilder {
    this.formTextBoxParam.state = state;
    return this;
  }
  public setPlaceHolder(placeHolder: string): FormTextBoxParamBuilder {
    this.formTextBoxParam.placeholder = placeHolder;
    return this;
  }
  private setValue(value: string): FormTextBoxParamBuilder {
    this.formTextBoxParam.value = value;
    return this;
  }
  public setInputAttr(inputAttr: { 'aria-label': string }): FormTextBoxParamBuilder {
    this.formTextBoxParam.inputAttr = inputAttr;
    return this;
  }
  public setOnValueChangeCallBackFunction(fun: Function): FormTextBoxParamBuilder {
    this.formTextBoxParam.onValueChanged = fun;
    return this;
  }
  setShowClearButton(showCleanButton: boolean): FormTextBoxParamBuilder {
    this.formTextBoxParam.showClearButton = showCleanButton;
    return this;
  }
  public setLabel(label: string): FormTextBoxParamBuilder {
    this.formTextBoxParam.label = label;
    return this;
  }
  public setLabelMode(labelMode: 'floating' | 'hidden' | 'outside' | 'static' = 'outside'): FormTextBoxParamBuilder {
    this.formTextBoxParam.labelMode = labelMode;
    return this;
  }
  public setMode(mode: 'url' | 'email' | 'password' | 'search' | 'tel' | 'text') {
    this.formTextBoxParam.mode = mode;
    return this;
  }
  public setReadOnly(isReadOnly: boolean) {
    this.formTextBoxParam.readonly = isReadOnly;
    return this;
  }
  public setValidation(isValidationEnabled: boolean) {
    this.formTextBoxParam.enableValidation = isValidationEnabled;
    return this;
  }
  public setRequired(isRequired: boolean) {
    this.formTextBoxParam.isRequired = isRequired;
    return this;
  }
  public build() {
    return this.formTextBoxParam;
  }
}
