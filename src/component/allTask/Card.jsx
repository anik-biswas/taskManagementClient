import React from 'react';
import { motion } from 'framer-motion';
const Card = ({task}) => {
    const {name,taskDate,priority ,email, status, description} =task;
    return (
       
     <motion.div
     whileHover={{ scale: 1.2, rotate: 20 }}
     whileTap={{
         scale: 0.8,
         rotate: -60,
         borderRadius: "100%"
     }}
     >
       <div className='my-5'>
        
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name} </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"> Deadline: {taskDate}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Status : {status}</p>
        </a>

        </div>
      </motion.div>
    );
};

export default Card;