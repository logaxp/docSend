// HomeCard.js
import React, { useState } from 'react';
import {ReactComponent as Client} from '../../assets/images/client.svg';
import { ReactComponent as Product } from '../../assets/images/product.svg';
import { ReactComponent as Resolution } from '../../assets/images/resolution.svg';
import { ReactComponent as Service } from '../../assets/images/quality.svg';
import './HomeCard.css';

const cardData = [
  {
    id: 1,
    frontTitle: "Our Products",
    backContent: "DocSend provides innovative solutions for your business. Discover our services and learn how we can help you achieve your goals.",
    backButtonText: "Learn More",
    svg: 'Product',
  },
  {
    id: 2,
    frontTitle: "Our Clients",
    backContent: "Dedicated to delivering results that exceed your expectations, our client-focused approach puts your needs at the forefront.",
    backButtonText: "Our Commitment",
    svg: 'Client',
  },
  {
    id: 3,
    frontTitle: "Prompt Resolution",
    backContent: "We are committed to providing prompt and efficient service to our customers. Contact us today to get started. This is our commitment to you.",
    backButtonText: "Get Assistance",
    svg: 'Resolution',
  },
    {
        id: 4,
        frontTitle: "Our Services",
        backContent: "We offer a wide range of services to meet your needs. Learn more about our services and how we can help you.",
        backButtonText: "Learn More",
        svg: 'Service',
    },
];
// FlipCard component
const FlipCard = ({ frontTitle, backContent, backButtonText, svg }) => {
    
  
    return (
      <div className="perspective m-4">
        <div className="relative w-80 h-80 border-l-8 border-b-4 border-gray-500 bg-white shadow-md rounded-lg cursor-pointer hover:flipped">
          <div className="flip-card-inner absolute w-full h-full text-center flex items-center justify-center">
            {/* Front content */}
            <div className="flip-card-front w-full h-full rounded-lg flex flex-col justify-start items-center bg-blue-100 p-4">
              <h3 className="text-blue-700 font-bold text-lg mt-4">{frontTitle}</h3>
              <div className="flex-grow flex items-center justify-center">
                {/* Render the appropriate SVG icon */}
                {svg === 'Product' && <Product className="w-20 h-20" />}
                {svg === 'Client' && <Client className="w-20 h-20" />}
                {svg === 'Resolution' && <Resolution className="w-20 h-20" />}
                {svg === 'Service' && <Service className="w-20 h-20" />}
              </div>
            </div>
           {/* Back content */}
          <div className="flip-card-back w-full h-full rounded-lg bg-blue-500 text-white p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-white text-lg font-bold mb-3 uppercase">Details</h4>
              <p className="text-white text-sm">{backContent}</p>
            </div>
            <button className="bg-white hover:bg-black hover:text-white hover:border hover:border-white text-black font-bold py-2 px-4 rounded self-center mt-4">
              {backButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const HomeCard = () => {
    const [flippedCard, setFlippedCard] = useState(null);

    const handleFlip = (id) => {
        setFlippedCard(flippedCard === id ? null : id);
    };

    return (
        <>
         <h1 className="text-4xl mt-40 font-bold text-center mb-10">Who we are</h1>
         <hr className="w-1/4 mx-auto mb-10" />
        <div className="flex  mb-20 border-l-4 justify-center items-center flex-wrap">
            {cardData.map(card => (
                <FlipCard 
                    key={card.id}
                    id={card.id}
                    frontTitle={card.frontTitle}
                    svg={card.svg}
                    backContent={card.backContent}
                    backButtonText={card.backButtonText}
                    isFlipped={flippedCard === card.id}
                    onClick={handleFlip}
                />
            ))}
        </div>
        </>
    );
};

export default HomeCard;