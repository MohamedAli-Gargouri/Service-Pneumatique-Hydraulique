import { CheckBox } from 'devextreme-react';
import { ValueChangedEvent } from 'devextreme/ui/check_box';
import React from 'react';
import { FormCheckBoxParam } from 'types/components/params';

export default function FormCheckBox(props: { parameter: FormCheckBoxParam }) {
  return (
    <CheckBox
      enableThreeStateBehavior={props.parameter.ThreeStateBehavior}
      //defaultValue={}
      elementAttr={props.parameter.elementAttr}
      value={props.parameter.value}
      onValueChanged={(e: ValueChangedEvent) => {
        props.parameter.onValueChanged(e);
      }}
      iconSize={props.parameter.iconSize}
      text={props.parameter.text}
    />
  );
}
