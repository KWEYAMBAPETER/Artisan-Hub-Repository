import React from 'react';

const Contact = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-amber-600 leading-tight mb-12"
        id="contacts"
      >
        📞 Contact Us
      </h2>

      {/* Contact Us Section with Soft Gate */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">Need Help❓❓</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get personalized assistance from Our Artisan Consultants. Sign in
            to access exclusive contact options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Preview (Visible to All users) */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-2">
                  General Inquiries
                </h3>
                <p className="text-gray-600">
                  <span className="text-xl font-semibold text-amber-500 mb-2">Email:</span> artisanhub.info@chatwaymail.com
                </p>
                <p className="text-gray-600">
                  <span className="text-xl font-semibold text-amber-500 mb-2">Phone:</span> +256 777501149
                </p>
              </div>

              <div className="pt-6 border-t border-amber-50">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">
                  For Members-only Benefits:
                </h3>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
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
                    Direct Artisan Connections
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
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
                    Custom commission requests
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-amber-500 mr-2 mt-0.5"
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
                    Priority support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sign In card (Visual Focus) to all members have access to the main dashboard/site */}
          <div className="bg-amber-50 p-8 rounded-xl border-2 border-amber-200 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-100 rounded-full opacity-40"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                Member-Exclusive Access
              </h3>
              <p className="text-gray-700 mb-6">
                Unlock direct messaging with artisans, custom order requests, exclessive features
                and wholesale pricing by signing into your account.
              </p>

              <div className="space-y-4">
                <a href="https://weatherandqoutes.netlify.app/">
                  <button className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.02]">
                    Sign In to Your Account
                  </button>
                </a>

                <div className="text-center text-sm text-gray-600">or</div>
                <a href="https://weatherandqoutes.netlify.app/">
                  <button className="w-full px-6 py-3 bg-white border-2 border-amber-300 text-amber-700 font-medium rounded-lg hover:bg-amber-50 transition-all">
                    Create Free Account
                  </button>
                </a>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Secure  Authentication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;