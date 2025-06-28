import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background texture */}
      <div className="hero-background"></div>

      <div className="hero-container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="hero-text">
            <div className="hero-tag">
              <p className="text-amber-800 font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                HandCrafted With Love💗
              </p>
            </div>

            <h1 className="hero-title">
              <span className="hero-title span">Discover Timeless</span>
              <span className="text-amber-600">Artisan Creations</span>
            </h1>

            <p className="hero-description">
              Each piece tells a story of 
              <strong className=" text-amber-300">
                 tradition, passion, and exceptional craftsmanship
              </strong>
              . Your journey to authentic handmade treasures starts here.
            </p>

            <div className="hero-buttons">
              <button className="hero-primary-btn">
                🔎 Explore Collections
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline ml-2"
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

              <button className="hero-secondary-btn">
                Meet The Artisans 🙋🏻‍♀️
              </button>
            </div>
          </div>

          {/* Image content */}
          <div className="hero-image">
            <div className="hero-image-container">
              {/* Main product image */}
              <img
                src="https://images.unsplash.com/photo-1607556671927-78a6605e290b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Handcrafted pottery"
                className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
                loading="lazy"
              />

              {/* Floating badge */}
              <div className="floating-badge">
                <div className="badge-icon-container">
                  <div className="badge-con">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="badge-title">Featured Artisan</p>
                    <p className="badge-subtitle">Peter's Pottery Studio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="hidden lg:block absolute -bottom-10 -left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20"></div>
            <div className="hidden lg:block absolute -top-10 -right-10 w-24 h-24 bg-amber-300 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;