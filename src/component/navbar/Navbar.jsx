import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
//import Swal from "sweetalert2";
//import { toast } from "react-toastify";
// import ToggleTheme from "../../ToogleTheame";

const Navbar = () => {

    const{user,logout}= useContext(AuthContext);
    const navigate =useNavigate();
    const location = useLocation();
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
    
    const handleSignOut =() =>{
          logout()
          .then(result=>{
            
            console.log("logout")
          //  Swal.fire('logout successful')
          // toast.success('Logout successful!'); 
           // navigate(location?.state ? location.state : '/');
            navigate('/')
        })
          .catch()
    }

                const  links = <>
                <li className="mx-3 text-base text-red-600 font-medium hidden md:block lg:block" ><NavLink to="/"  >Home</NavLink></li>
                <li className="mr-3  text-base text-red-600 font-medium hidden md:block lg:block"><NavLink to="/allTest">All Tests</NavLink></li>
                 
                <li className=" mr-3 text-base text-red-600 font-medium hidden md:block lg:block"><NavLink to="/blog">Blogs</NavLink></li>
                <li className=" text-base text-red-600 font-medium hidden md:block lg:block"><NavLink to="/about">About</NavLink></li>
                <li className=" text-base text-red-600 font-medium hidden md:block lg:block"><NavLink to="/dashboard">Dashboard</NavLink></li>
                
            </>
            
         const  linksTab = <>
                <li className="mr-5 " ><NavLink to="/"  >Home</NavLink></li>
                 <li className="mr-5 "><NavLink to="/allTest">All Test</NavLink></li>
                 <li className="mr-5 "><NavLink to="/blog">Blogs</NavLink></li>
                 <li className="mr-5 "><NavLink to="/about">About</NavLink></li>
                 <li className="mr-5 "><NavLink to="/dashboard">Dashboard</NavLink></li>
                
             </>
          
    return (
        <div>
            <div className="navbar bg-[#e9edc9] rounded-lg p-0 md:p-2">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        
                        {linksTab}
                        
                    </ul>
                    </div>
                    <img className=" w-16 md:w-24 h-16 md:h-20" src="https://i.ibb.co/5KtgBGF/22947399-removebg-preview.png" alt="" />
                    <a className="normal-case text-2xl hidden md:block lg:block">TaskPhile</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    {links}
                    
                    </ul>
                </div>
                <div className="navbar-end mx-5 mt-0 md:mt-5">
                
                     <div>
                     
                    {user && userData && userData?.length > 0 ? (
                                 <div className="flex justify-items-center">
                                 
                                 <label tabIndex={0} className="btn btn-ghost btn-circle avatar" title={userData[0]?.name}>
                                 <div className="w-10 rounded-full">
                                 <img src={userData[0]?.image} />
                                 </div>
                                  </label>
                                 <a onClick={handleSignOut} className="btn  w-16 text-xs ">  SignOut</a></div>
                     )
                      :(
                                 <Link to={"/login"}><a className="w-20 p-2   rounded-md bg-white">Login</a></Link>  
                     )} 
                     </div>

                </div>

                </div>
        </div>
    );
};

export default Navbar;