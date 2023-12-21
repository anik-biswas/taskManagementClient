import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const email = user?.email;
            const response = await fetch(`http://localhost:5000/user/email?email=${email}`);
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
            {user && userData && userData?.length > 0 ? (
                                <p>Hi {userData[0].name} , welcome to your dashboard </p>
                     )
                      :(
                        <p>Hi , welcome to your dashboard </p>
           
    )}
    </div>
)};

export default Cart;