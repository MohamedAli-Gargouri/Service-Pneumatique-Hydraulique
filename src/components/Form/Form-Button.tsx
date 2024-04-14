import { Button } from 'devextreme-react';
import { ClickEvent } from 'devextreme/ui/button';
import React from 'react';
import { FormButtonParam } from 'types/components/params';

export default function FormButton(props: { parameter: FormButtonParam }) {
  return (
    <Button
      width={props.parameter.fullWidth === true ? '100%' : props.parameter.width}
      text={props.parameter.Text}
      type={props.parameter.type}
      stylingMode={props.parameter.stylingMode}
      onClick={(e: ClickEvent) => props.parameter?.OnClickCallBackFn(e)}
    />
  );
}
