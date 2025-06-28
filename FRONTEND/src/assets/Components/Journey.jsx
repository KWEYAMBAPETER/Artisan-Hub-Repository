import React from 'react';
//import Logo from '../assets/Logo.jpg';

const Journey = () => {
  return (
    <section className="journey-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="journey-title">
              Start Your Journey Today
            </h2>
            <p className="journey-subtitle">
              Join thousands of people who have already taken their first step
              into the Artisan Hub.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <a href="https://weatherandqoutes.netlify.app/">
              <button className="journey-button-primary">
                Get Started Now
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
            </a>
            <a href="https://weatherandqoutes.netlify.app/">
              <button className="journey-button-secondary">
                Learn More
              </button>
            </a>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-4 animate-fade-in delay-300">
            <div className="flex -space-x-2 p-6">
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/12.jpg"
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1550051414-003c9007794c?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://media.istockphoto.com/id/1299273200/photo/young-man-in-modern-art-exhibition-gallery-hall.jpg?s=612x612&w=is&k=20&c=8TdYkNZzdpJUrb2NnC7zrIX-WzHnpZnSvskYJRss75w="
                alt="User"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1743535370909-adb4090385a0?q=80&w=390&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User"
              />
              
              
            </div>
            <span className="text-sm md:text-base font-medium">
              Join our community of 10,000+ Happy Members
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;