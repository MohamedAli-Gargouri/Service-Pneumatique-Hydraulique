import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../Card/ProductCarouselCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import productimg1 from '../../assets/images/productNavMenu/compressors.png';
import productimg2 from '../../assets/images/productNavMenu/Dryer_tank_and_drain.png';
import productimg3 from '../../assets/images/productNavMenu/valves.png';
import productimg4 from '../../assets/images/productNavMenu/Filters_and_accessories.png';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'inline-block', background: 'red' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black' }}
      onClick={onClick}
    />
  );
}
const Carousel = () => {
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3, // Number of divs per slide
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 963,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider
      arrows={false}
      autoplay={true}
      autoplaySpeed={1000}
      swipeToSlide={true}
      className="mb-7"
      {...settings}
    >
      <div className="px-4">
        <div className="p-8 ">
          <ProductCard
            text="Razer BlackWidow V4 Pro Wired Mechanical Gaming Keyboard: Yellow Mechanical Switches - Linear & Silent - Doubleshot ABS Keycaps - Command Dial - Programmable Macros - Chroma RGB - Magnetic Wrist Rest"
            ProductImage={productimg1}
            ProductName="Product 1"
            ProductPrice="1000"
          />
        </div>
      </div>
      <div className="px-4">
        <div className="p-8 ">
          <ProductCard
            text="Keeper - 2 x 2' Heavy Duty Ratchet Tie-Down with Chain End and Grab Hook - 3,333 lbs. Working Load Limit and 10,000 lbs. Break Strength"
            ProductImage={productimg2}
            ProductName="Product 2"
            ProductPrice="2000"
          />
        </div>
      </div>
      <div className="px-4">
        <div className="p-8">
          <ProductCard
            text="Amazon Basics 24 Inch Monitor Powered with AOC Technology, FHD 1080P, 75hz, VESA Compatible, Built-in Speakers, Black"
            ProductImage={productimg3}
            ProductName="Product 3"
            ProductPrice="3000"
          />
        </div>
      </div>
      <div className="px-4">
        <div className="p-8 ">
          <ProductCard
            text="Intelex Warmies Microwavable French Lavender Scented Plush, Manatee Warmies, Gray, 1 X 8 X 4"
            ProductImage={productimg4}
            ProductName="Product 4"
            ProductPrice="4000"
          />
        </div>
      </div>

      {/* Add more divs as needed */}
    </Slider>
  );
};

export default Carousel;
