import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: arrowsScroll,
    adaptiveHeight: true,
  };

  return (
    <div className='flex justify-center px-20 py-2'>
      <div className='w-[1400px]'>
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Slide;