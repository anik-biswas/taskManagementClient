import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';

const AllTasks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tasks,setTasks]= useState([]);
    useEffect(() => {
        fetch('https://taskmanagement-server-eta.vercel.app/task')
          .then(res => res.json())
          .then(data => {
            setTasks(data);
          });
      }, []);
      
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 justify-items-center  mt-10">
        {
            
            tasks.map(task => <Card task={task} key={task._id}></Card>)
        }
    </div>
    );
};

export default AllTasks;