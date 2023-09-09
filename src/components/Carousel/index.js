import { Carousel } from '@material-tailwind/react';
import slider1 from '../../assets/images/carousel/slider1.webp';
import slider2 from '../../assets/images/carousel/slider2.webp';
import slider3 from '../../assets/images/carousel/slider3.webp';
import slider4 from '../../assets/images/carousel/slider4.webp';
import slider5 from '../../assets/images/carousel/slider5.webp';
import slider6 from '../../assets/images/carousel/slider6.webp';
import React from 'react';
export default function CarouselCustomNavigation() {
  return (
    <Carousel
      transition={{ duration: 2 }}
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      className=" w-full h-full rounded-md "
    >
      <img
        src={slider1}
        alt="image 1"
        className="h-full w-full aspect-video rounded-md mx-2"
      />
      <img
        src={slider2}
        alt="image 2"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider3}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider4}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider5}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider6}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
    </Carousel>
  );
}
