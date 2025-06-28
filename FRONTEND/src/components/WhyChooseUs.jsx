import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div id="why-choose-us" className="why-choose-us-container">
        <h2 className="section-title">
          Why Choose Artisan Hub?
        </h2>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-card-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="feature-title">
              Authentic Handmade Products🎨
            </h3>
            <p className="text-gray-600">
              Each item is carefully crafted by skilled artisans using
              traditional techniques passed down through generations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="text-green-500 mb-">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              Direct Support to Artisans.
            </h3>
            <p className="text-gray-600">
              95% of profits go directly to the makers, helping sustain
              traditional crafts and communities.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
            <div className="text-purple-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              Unique Collections.
            </h3>
            <p className="text-gray-600">
              Discover one-of-a-kind pieces you won't find in mainstream
              stores, each with its own story.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
            <div className="text-yellow-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-600">
              Fair Trade Practices.
            </h3>
            <p className="text-gray-600">
              We ensure artisans receive fair compensation and work in
              ethical conditions.
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="benefits-container">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-lg text-amber-600">
                Eco-Friendly Materials🌲.
              </h4>
              <p className="text-gray-600 mt-1">
                Sustainable sourcing with minimal environmental impact.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-lg text-amber-600">
                Quality Guarantee👍🏻.
              </h4>
              <p className="text-gray-600 mt-1">
                30-days satisfaction guarantee on all purchases.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-lg text-amber-600">
                Worldwide Shipping 🌏.
              </h4>
              <p className="text-gray-600 mt-1">
                Carefully packaged and insured global delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;