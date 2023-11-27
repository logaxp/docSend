import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {  useLocation } from 'react-router-dom';
// Import the additional images for the slider
import slideImage1 from '../../assets/images/pod8.png';
import slideImage2 from '../../assets/images/pod5.png';
import slideImage3 from '../../assets/images/pod.png';

import cardImage2 from '../../assets/images/pen2.png';

import { ReactComponent as LeftArrowIcon } from '../../assets/images/left-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/images/right-arrow.svg';
import './Header.css';

const Action = () => {
    const location = useLocation();
// Custom arrow components
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: 'block' }} 
        onClick={onClick}
      >
        <RightArrowIcon />
      </div>
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: 'block' }} 
        onClick={onClick}
      >
        <LeftArrowIcon />
      </div>
    );
  }

    const settings = {
        infinite: true,
        speed: 1900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
        const slides = [
            {
                backgroundImage: slideImage2,
                headText: "",
                headTextStyle: "top-80 center-50",
            },
            {
                backgroundImage: slideImage1,
               
            },
            {
                backgroundImage: slideImage3,
                cardImage: cardImage2,
                headText: "Sign Anywhere with DoSend ",
                headTextStyle: "top-80 center-50",
            },
        ];
        const isHomePage = location.pathname === '/';
        return (
            <header className="">
                {isHomePage && (
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide-container">
                        <div style={{ backgroundImage: `url(${slide.backgroundImage})` }} className="bg-cover bg-center h-3/4">
                            {/* Optional head text */}
                            {slide.headText && (
                            <div className=" header-text transform -translate-x-1/2 -translate-y-1/2  text-5xl font-extrabold mt-20 p-4">
                                {slide.headText}
                            </div>
                        )}
                            {/* Card associated with the slide */}
                            <div className={`card-container card-${index} absolute p-4 md:px-0 my-10`}>
                                {/* Rest of the card code */}
                                <div className="card bg-black bg-opacity-95 max-w-md shadow-xl rounded-lg overflow-hidden mx-auto">
                                    <div className="md:flex">
                                        <div className="p-8">
                                            <h2 className="block mt-1 text-lg leading-tight font-bold text-white">{slide.cardTitle}</h2>
                                            <p className="mt-2 text-gray-300">{slide.cardText}</p>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            )}
          
        </header>
    );
};

export default Action;