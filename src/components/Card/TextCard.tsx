import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import React from 'react';
BackgroundBlogCard.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};
export default function BackgroundBlogCard({ text, backgroundImage }) {
  return (
    <Card
      shadow={true}
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)' }}
      className="rounded-none mt-4 relative grid h-[15rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center hover:opacity-90"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/40" />
      </CardHeader>
      <CardBody
        className="relative py-14 px-6 md:px-12"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography variant="h5" color="white" className="mb-6 font-medium leading-[1.5]">
          {text}
        </Typography>
        <Button
          variant="outlined"
          color="white"
          className="flex items-center gap-3 m-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Check out
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
        </Button>
      </CardBody>
    </Card>
  );
}
