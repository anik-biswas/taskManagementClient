import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url('https://i.ibb.co/KjZP0xL/task-management-concept-banner-header-vector-24529046.jpg')` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Go With Your Task</h1>
            {/* <p className="mb-5">
             {description}
            </p>
            <button className=" text-lg text-violet-100  mx-5">Get <span className='text-red-500 text-xl font-extrabold'>{discount} %</span> with Coupon: <span className='text-red-500 text-lg font-extrabold'>{coupon}</span></button> */}
            
            <motion.div
        whileHover={{ scale: 1.2, rotate: 60 }}
        whileTap={{
            scale: 0.8,
            rotate: -60,
            borderRadius: "100%"
        }}
        >
         <Link to={'/dashboard'}> <button className="btn btn-primary">Let's Explore</button></Link>
         </motion.div>
          </div>
        </div>
      </div>
    );
};

export default Banner;