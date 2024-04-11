import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import React from 'react';
ProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
export default function ProfileCard({ image, name, position }) {
  return (
    <Card
      className="w-full h-[30rem]"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        className="h-auto"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img loading="lazy" src={image} alt="profile-picture" />
      </CardHeader>
      <CardBody
        className="text-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {position}
        </Typography>
      </CardBody>
      <CardFooter
        className="flex justify-center gap-7 pt-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Tooltip content="Like">
          <Typography as="a" href="#facebook" variant="lead" color="blue" textGradient>
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#twitter" variant="lead" color="light-blue" textGradient>
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#instagram" variant="lead" color="purple" textGradient>
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
