import React from 'react';

const Contact = () => {
    return (
        <div  className='w-full  py-10'>
        
        <div className="w-full md:w-96 md:max-w-full mx-auto bg-slate-950  bg-transparent rounded-lg">
          <div className="p-6 my-10 border border-gray-300 sm:rounded-md">
            <form action="https://formspree.io/f/mrgwnjqe" method="POST"  >
              <label className="block mb-6">
                <span className="text-slate-50">Your name</span>
                <input
                  type="text"
                  name="name"
                  className="
                          block
                          w-full
                          mt-1
                          border-gray-300
                          rounded-md
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                  placeholder="Anik Biswas"
                />
              </label>
              <label className="block mb-6">
                <span className="text-slate-50">Email address</span>
                <input
                  name="email"
                  type="email"
                  className="
                          block
                          w-full
                          mt-1
                          border-gray-300
                          rounded-md
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                  placeholder="xyz@example.com"
                  required
                />
              </label>
              <label className="block mb-6">
                <span className="text-slate-50">Message</span>
                <textarea
                  name="message"
                  className="
                          block
                          w-full
                          mt-1
                          border-gray-300
                          rounded-md
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                  rows="3"
                  placeholder="Tell Me what you're thinking about..."
                ></textarea>
              </label>
              <div className="mb-6">
                <button
                  type="submit"
                  className="
                          h-10
                          px-5
                          text-indigo-100
                          bg-indigo-700
                          rounded-lg
                          transition-colors
                          duration-150
                          focus:shadow-outline
                          hover:bg-indigo-800
                        "
                >
                  Contact Me
                </button>
              </div>
              <div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Contact;