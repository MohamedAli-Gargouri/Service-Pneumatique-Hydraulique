import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import React from 'react';

export default function CustomCard(props) {
  return (
    <Card
      className="hover:scale-105"
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className=""
        children={''}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      ></CardHeader>
      <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {props.children}
      </CardBody>
      <CardFooter
        className="pt-0"
        children={''}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      ></CardFooter>
    </Card>
  );
}
