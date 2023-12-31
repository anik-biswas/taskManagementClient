import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";
//import Swal from "sweetalert2";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=83a471512dcffa8098e5f1e4afd247df`;

const Registration = () => {
    const {signUp} = useContext(AuthContext);
    const location= useLocation();
    const navigate= useNavigate();
  
    const [error,setError] = useState("");
   
    const handleRegister =async(e)=>{
        e.preventDefault();
    
        const form = new FormData(e.currentTarget);
        
        const name = form.get('name');
        const email = form.get('email');
        
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        const imageFile = form.get('image');
    
        if(password===confirmPassword)
        {
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
             setError("Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character");
            
         }
         else {
            setError("");
       
        const imgbbFormData = new FormData();
        imgbbFormData.append('image', imageFile);
      
        const imgbbRes = await fetch(image_hosting_api, {
          method: 'POST',
          body: imgbbFormData,
        });
      
        const imgbbData = await imgbbRes.json();
        const imageUrl = imgbbData.data.url;
      
                signUp(email,password)
                .then(result=>{
                    console.log(result.user);
                    
                    const createdAt = result.user?.metadata?.creationTime;
                    const user = { name,email,password, image:imageUrl,createdAt: createdAt};
                   
                    fetch('https://taskmanagement-server-eta.vercel.app/user', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.insertedId){
                             console.log("register")
                             navigate(location?.state?.from || '/dashboard');
                            //   Swal.fire('your Are successfully register')
                            }
                            console.log(data)
                        })
    
                       // navigate(location?.state?.from || '/');
       
                })
        
          }
        }
        else
        {
            setError("password does not match")
        }
    
    }
    return (
        <div>
            <div className="hero min-h-screen bg-[#e3f9f6]">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0  w-64 md:w-full max-w-lg shadow-2xl bg-[#e9edc9]">
                        <form onSubmit={handleRegister} className="card-body">
                        <div>
                                <p>{error}</p>
                        </div>
                        <div className="md:flex mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
                            
            <div className="form-control w-full   mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">image</span>
              </label>
              <label className="input-group">
                <input
                  type="file"
                  name="image"
                  className="input input-bordered w-full "
                  required
                />
              </label>
            </div>
          
          <div className="md:flex mb-4 lg:mb-8">
             <div className="form-control md:w-full lg:w-1/2">
                 <label className="label">
                 <span className="label-text">Password</span>
                  </label>
                  <input type="password"  placeholder="password" className="input input-bordered" name='password' required/>
             </div>
             <div className="form-control md:w-full lg:w-1/2">
                 <label className="label">
                 <span className="label-text">Confirm Password</span>
                  </label>
                  <input type="password"  placeholder="password" className="input input-bordered" name='confirmPassword' required/>
             </div>

            </div>
                            <div className="form-control mt-6 p-0">
                                <button  className="btn btn-neutral" >Register</button>
                            </div>
                            <label className="label">
                                Have an account? <Link to="/login" className="label-text-alt link link-hover underline">Please Login</Link>
                            </label>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;