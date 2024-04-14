import { CheckBox, TextBox } from 'devextreme-react';
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
  PatternRule,
  StringLengthRule,
  RangeRule,
  AsyncRule,
  CustomRule,
} from 'devextreme-react/validator';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormTextBoxParam } from 'types/components/params';

export default function FormTextBox(props: { parameter: FormTextBoxParam }) {
  const phonePattern = /^[1-9]\d{9}$/;
  const phoneRules = {
    X: /[0-9]/,
  };
  const { t } = useTranslation();
  return (
    <>
      <TextBox
        placeholder={props.parameter.placeholder}
        value={props.parameter.value}
        inputAttr={props.parameter.inputAttr}
        onValueChanged={(e: ValueChangedEvent) => {
          props.parameter.onValueChanged(e);
        }}
        showClearButton={props.parameter.showClearButton}
        label={props.parameter.label}
        labelMode={props.parameter.labelMode}
        mode={props.parameter.mode}
        readOnly={props.parameter.readonly}
        mask={props.parameter.mode === 'tel' ? '+(XXX) 00-000-000' : ''}
        maskRules={props.parameter.mode === 'tel' ? phoneRules : ''}
      >
        {props.parameter.enableValidation == true && (
          <Validator>
            {props.parameter.isRequired && <RequiredRule message={t('UCP.DialogMessages.Validation.textInput')} />}
            {props.parameter.mode === 'email' && <EmailRule message={t('UCP.DialogMessages.Validation.emailInput')} />}
            {props.parameter.mode === 'tel' && (
              <PatternRule message={t('UCP.DialogMessages.Validation.phoneNumberInput')} pattern={phonePattern} />
            )}
            {/* <StringLengthRule message="Name must have at least 2 symbols" min={2} />
            <RangeRule message="You must be at least 21 years old" max={maxDate} /> */}
          </Validator>
        )}
      </TextBox>
    </>
  );
}
