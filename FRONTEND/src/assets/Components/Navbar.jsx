import React, { useState } from 'react';
//import Logo from '../images/Logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img
                src='https://images.unsplash.com/photo-1746469535771-71a672e8719f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                className="h-20 w-20 rounded-full border-2 border-amber-100 shadow-sm"
                alt="Artisan Hub Logo"
              />
              <span className="self-center text-2xl font-bold whitespace-nowrap text-amber-800">
                Artisan Hub
              </span>
            </a>
          </div>

          {/* large screen Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a
              href="#"
              className="text-amber-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-amber-400"
            >
              Home
            </a>
            <a
              href="#about-us"
              className="text-amber-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-amber-400"
            >
              About Us
            </a>
            <a
              href="#why-choose-us"
              className="text-amber-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-amber-400"
            >
              Why Choose Us
            </a>
            <a
              href="#contacts"
              className="text-amber-900 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-amber-400"
            >
              Contact Us
            </a>
            <a href="https://weatherandqoutes.netlify.app/">
              <button className="ml-4 px-6 py-2 bg-amber-600 text-white font-medium rounded-full shadow-sm hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:text-amber-600 hover:bg-amber-50"
          >
            Home
          </a>
          <a
            href="#about-us"
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:text-amber-600 hover:bg-amber-50"
          >
            About Us
          </a>
          <a
            href="#why-choose-us"
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:text-amber-600 hover:bg-amber-50"
          >
            Why Choose Us
          </a>
          <a
            href="#contacts"
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:text-amber-600 hover:bg-amber-50"
          >
            Contact Us
          </a>
          <a href="https://weatherandqoutes.netlify.app/">
            <button className="w-full mt-2 px-4 py-2 bg-amber-600 text-white font-medium rounded-md shadow-sm hover:bg-amber-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
              Get Started🤩
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;