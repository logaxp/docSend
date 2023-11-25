// HomeHeader.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/now1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  let navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSearchClick = () => {
    navigate('/default_templates');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="relative top w-full flex justify-between  items-center p-4 bg-gray-900 bg-opacity-70 text-white">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="LogaXP" className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
        </Link>
        <h1 className="hidden md:block font-bold text-2xl md:text-3xl ml-2">LogaXP</h1>
      </div>
      <div className="md:hidden" onClick={toggleNav}>
        <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} size="lg" />
      </div>
      <div onClick={handleSearchClick} title="Templates" className="cursor-pointer flex items-center lg:w-1/4  md:w-auto bg-gray-300 text-gray-900 rounded-full px-4 py-2 hover:bg-red-100 mt-4 md:mt-0 md:mr-6">
          <FontAwesomeIcon icon={faSearch} />
          <span className="search ml-2 hidden md:inline">Search Templates</span>
        </div>
      <div className={`md:flex md:items-center md:w-auto lg:mr-4 ${isNavOpen ? 'block' : 'hidden'}`}>
        
        <div className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
          <Link to="/products" className="mt-1 md:mt-0 hover:text-gray-300">Products</Link>
          <Link to="/pricing" className="mt-1 md:mt-0 hover:text-gray-300">Pricing</Link>
          <Link to="/resources" className="mt-1 md:mt-0 hover:text-gray-300">Resources</Link>
          <Link to="/contact" className="mt-1 md:mt-0 hover:text-gray-300">Contact Us</Link>
          <Link to="/login" className="mt-1 md:mt-0 hover:text-gray-300">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
