// HomeHeader.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/now1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  let navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/default_templates');
  };

  return (
    <nav className="absolute top-0 w-full flex h-20 justify-between items-center p-4 bg-gray-900 bg-opacity-70 text-white">
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="LogaXP" className="w-20 h-20 rounded-full" />
        </Link>
        <h1 className="font-bold text-3xl ml-2">LogaXP</h1>
      </div>
      <div onClick={handleSearchClick} className="cursor-pointer flex items-center w-80 mr-20 bg-gray-300 text-gray-900 rounded-full px-4 py-2 hover:bg-red-100">
          <FontAwesomeIcon icon={faSearch} />
          <span className="ml-2">Search Templates</span>
        </div>
      <div className="flex space-x-8">
       
        <Link to="/products" className="hover:text-gray-300">Products</Link>
        <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
        <Link to="/resources" className="hover:text-gray-300">Resources</Link>
        <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
};

export default Header;
