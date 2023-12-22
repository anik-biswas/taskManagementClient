import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className=" bg-gray-900">
            <div className="max-w-2xl mx-auto text-white py-10">
                <div className="text-center">
                    <h3 className="text-3xl mb-3"> TaskPhile </h3>
                    <p> Update your work. All day, every day. </p>
                    <div className="flex justify-center my-10">
                       
                    </div>
                </div>
                <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                    <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; Anik Biswas, 2023. </p>
                    <div className="order-1 md:order-2">
                        <span className="px-2">About us</span>
                        <span className="px-2 border-l">Contact us</span>
                        <span className="px-2 border-l">Privacy Policy</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Footer;