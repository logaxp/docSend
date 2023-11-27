// HomeHeader.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/now1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  let navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleSearchClick = () => {
    navigate('/default_templates');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('User logged out');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="relative top w-full flex justify-between text-2xl items-center p-4 bg-gray-900 bg-opacity-70 text-white">
      <div className="flex items-center">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="LogaXP" className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
        </Link>
        <h1 className="hidden md:block font-bold text-2xl md:text-3xl ml-2">LogaXP</h1>
      </div>
      <div className="md:hidden" onClick={toggleNav}>
        <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} size="lg" />
      </div>
      <div onClick={handleSearchClick} title="Templates" className="cursor-pointer flex items-center lg:w-1/4 md:w-auto bg-gray-300 text-gray-900 rounded-full px-4 py-2 hover:bg-red-100 mt-4 md:mt-0 md:mr-6">
  <FontAwesomeIcon icon={faSearch} />
  <span className="search hidden md:inline">Search Templates</span>
</div>

      <div className={`md:flex md:items-center md:w-auto lg:mr-4 ${isNavOpen ? 'block' : 'hidden'}`}>
      <div className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-xl ">
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hover:text-gray-900 mr-4 rounded-xl hover:bg-gray-200 px-2">Profile</Link>
            <button onClick={handleLogout} className="hover:text-gray-900 mr-4 rounded-xl hover:bg-gray-200 px-2">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-900 rounded-xl hover:bg-gray-200 px-2 ">Login</Link>
        )}

      
          <Link to="/products" className="mt-1 md:mt-0 hover:text-gray-900  rounded-xl hover:bg-gray-200 px-2">Products</Link>
          <Link to="/pricing" className="mt-1 md:mt-0 hover:text-gray-900 rounded-xl hover:bg-gray-200 px-2">Pricing</Link>
          <Link to="/resources" className="mt-1 md:mt-0 hover:text-gray-900 rounded-xl hover:bg-gray-200 px-2">Resources</Link>
          <Link to="/contact" className="mt-1 md:mt-0 hover:text-gray-900 rounded-xl hover:bg-gray-200 px-2 mb-1">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
