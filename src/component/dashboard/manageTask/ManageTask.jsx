import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../firebase/AuthProvider';

const ManageTask = () => {
    const{user}= useContext(AuthContext);
    const email = user?.email;
    const location = useLocation();
    const navigate = useNavigate();
    const [tasks,setTasks]= useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/task')
          .then(res => res.json())
          .then(data => {
            setTasks(data);
          });
      }, []);
      const userTasks = tasks.filter((task) => task.email === email );
      console.log(userTasks)
    return (
        <div>
            
        </div>
    );
};

export default ManageTask;