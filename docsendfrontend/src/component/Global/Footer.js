import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/now.png';
import { ReactComponent as TwitterIcon } from '../../assets/images/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../assets/images/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/images/linkedin.svg';
import { ReactComponent as InstagramIcon } from '../../assets/images/instagram.svg';

const Footer = () => {
  return (
    <footer className="bg-yellow-800 shadow-xl text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="font-bold text-lg mb-5">LogaXP</h2>
            <p className="mb-4">Empowering your business with innovative solutions and dedicated service.</p>
            <img src={logo} alt="LogaXP Logo" className="w-20 h-20 mb-4 rounded-full" />
            <p className="">Follow us on social media:</p>
            <div className="flex space-x-4 mt-2">
              <Link to="/"><TwitterIcon className="text-gray-700 hover:text-gray-900" /></Link>
              <Link to="/"><FacebookIcon className="text-gray-700 hover:text-gray-900" /></Link>
              <Link to="/"><LinkedInIcon className="text-gray-700 hover:text-gray-900" /></Link>
              <Link to="/"><InstagramIcon className="text-gray-700 hover:text-gray-900" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg mb-5">Quick Links</h2>
            <ul className="list-none mb-6">
              <li className="mb-2">
                <Link to="/login" className="hover:underline">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className=" hover:underline">Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/portfolio" className=" hover:underline">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className=" hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="font-bold text-lg mb-5">Stay Updated</h2>
            <p className="mb-4 ">Subscribe to our newsletter for the latest news and updates.</p>
            <form>
              <input type="email" className="p-2 border border-gray-300 rounded-md mr-2" placeholder="Your Email" />
              <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Subscribe</button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="font-bold text-lg mb-5">Contact Information</h2>
            <address className="not-italic mb-4 ">
              1234 1108 Berry Street, Old Hickory, TN, United State
            </address>
            <p className="">Phone: 5-554-3592</p>
            <p className="">Email: support@logaxp.com</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-10 border-t  pt-3">
          <p className="">© {new Date().getFullYear()} LogaXP. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className=" hover:underline">Privacy Policy</Link>
            <Link to="/terms" className=" hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
