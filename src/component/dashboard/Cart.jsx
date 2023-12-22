import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import { ToastContainer } from 'react-toastify';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const email = user?.email;
            const response = await fetch(`https://taskmanagement-server-eta.vercel.app/user/email?email=${email}`);
            const data = await response.json();
            setUserData(data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (user) {
          fetchUserData();
        }
      }, [user]);
    return (
        <div>
            <ToastContainer></ToastContainer>
            {user && userData && userData?.length > 0 ? (
                <div className='flex justify-items-center '>
                    <div className="w-20  rounded-full">
                                <img className='rounded-full' src={userData[0]?.image} />
                                </div>
                                <p>Hi <span className='text-2xl font-bold'>{userData[0].name} </span>, welcome to your dashboard </p>
                               
                </div>
                                
                     )
                      :(
                        <p>Hi , welcome to your dashboard </p>
           
    )}
    </div>
)};

export default Cart;