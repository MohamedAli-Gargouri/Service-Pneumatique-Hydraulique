import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../Card/ProductCarouselCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductImage1 from '../../assets/images/products/product_1.webp';
import ProductImage2 from '../../assets/images/products/product_2.webp';
import ProductImage3 from '../../assets/images/products/product_3.webp';
import PropTypes from 'prop-types';
import './ProductCarousel.css';
SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
function SampleNextArrow({ className, style, onClick }) {
  return <div className={className} style={{ ...style, display: 'inline-block' }} onClick={onClick} />;
}

function SamplePrevArrow({ className, style, onClick }) {
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
const Carousel = () => {
  const AllData = [
    {
      ProductID: 1,
      ProductShortDesc: 'Best compressor with 200ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Compressors',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,200ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,10CV', ParentCategory: 1 },
      ],
      ProductBrand: 'Hertz',
      ProductName: 'X1564',
      ProductPrice: 1500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 2,
      ProductShortDesc: 'Shit compressor with 500ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Compressors',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,200ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,15CV', ParentCategory: 1 },
      ],
      ProductBrand: 'Maxo',
      ProductName: 'B9',
      ProductPrice: 2500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 3,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 4,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 5,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 6,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 7,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
    {
      ProductID: 8,
      ProductShortDesc: 'Shit compressor with 600ML Capacity',
      ProductImages: [ProductImage1, ProductImage2, ProductImage3],
      ProductCategory: 'Tubes',
      ProductSubCategory: [
        { id: 51, SubCategoryName: 'Size,600ML', ParentCategory: 2 },
        { id: 52, SubCategoryName: 'Power,50CV', ParentCategory: 1 },
      ],
      ProductBrand: 'MM',
      ProductName: 'Caddy',
      ProductPrice: 3500,
      ProductLongDesc:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductInformation:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
      ProductShipping:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio. Quisque volutpat mattis eros. Nullam malesuadaerat ut turpis. Suspendisse urna viverra non, semper suscipit',
    },
  ];

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 5, // Number of divs per slide
    slidesToScroll: 5,
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
    <Slider arrows={true} autoplay={true} autoplaySpeed={1000} swipeToSlide={true} className=" pb-6" {...settings}>
      {AllData.map((ProductData, index) => {
        return (
          <ProductCard
            key={'ListProduct' + index}
            ProductImages={ProductData.ProductImages}
            ProductBrand={ProductData.ProductBrand}
            ProductName={ProductData.ProductName}
            ProductPrice={ProductData.ProductPrice}
            ProductID={ProductData.ProductID}
            ProductCategory={ProductData.ProductCategory}
            ProductInformation={ProductData.ProductInformation}
            ProductLongDesc={ProductData.ProductLongDesc}
            ProductShipping={ProductData.ProductShipping}
            ProductShortDescription={ProductData.ProductShortDesc}
            ProductSubCategory={ProductData.ProductSubCategory}
          />
        );
      })}

      {/* Add more divs as needed */}
    </Slider>
  );
};

export default Carousel;
