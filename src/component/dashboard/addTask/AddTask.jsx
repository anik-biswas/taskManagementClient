import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";

const AddTask = () => {
    const location= useLocation();
    const navigate= useNavigate();
  
    const [error,setError] = useState("");
    const [testDate, setTestDate] = useState(null);
    const [priority, setPriority] = useState("");
    // const handleTask=async(e)=>{
    //     e.preventDefault();
    
    //     const form = new FormData(e.currentTarget);
    //     const name = form.get('name');
    //     const description = form.get('description');
        
    //     const price = form.get('price');
    //     const slot = form.get('slot');
    //     const testDate = form.get('testDate');
    //     const imageFile = form.get('testImg');
    //     const imgbbFormData = new FormData();
    //      imgbbFormData.append('image', imageFile);
        
    //         const imgbbRes = await fetch(image_hosting_api, {
    //         method: 'POST',
    //         body: imgbbFormData,
    //         });
        
    //         const imgbbData = await imgbbRes.json();
    //         const imageUrl = imgbbData.data.url;
    //         const test = { name,description,testDate,price,slot,testImg:imageUrl};
    //         console.log(test)
    //         fetch('https://diagnostic-server-site.vercel.app/dashboard/addTest', {
    //             method: 'POST',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(test)
    //         })
    //         .then(res => res.json())
    //             .then(data => {
    //                 if(data.insertedId){
    //                     Swal.fire({
    //                         title: 'Success!',
    //                         text: 'Test added Successfully',
    //                         icon: 'success',
    //                         confirmButtonText: 'Ok',
    //                     });
    //                   //  toast.success('Register & Database saved successful!'); 
    //                   navigate(location?.state?.from || '/dashboard/manageTest');
    //                 }
    //                 console.log(data)
    //             })
    // }
    return (
        <div>
        <div className="bg-[#CBE4E9] p-4 md:p-4 lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-extrabold">
              Add Task
            </h2>
            
          </div>
          <form  >
         
            <div className="md:flex  mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Task Title"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">description</span>
                </label>
                <label className="input-group">
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="md:flex mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <label className="input-group">
                <select
                        id="priority"
                        name="priority"
                        value={priority}
                        className="w-full h-11 rounded-md"
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                    </select>

                    {priority && (
                        <p>
                        Selected Priority: <strong>{priority}</strong>
                        </p>
                    )}
                </label>
                
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <label className="input-group">
                <DatePicker
                selected={testDate} 
                onChange={(date) => setTestDate(date)} 
                placeholderText="Select a date"
                name="testDate"
                className="input input-bordered w-full"
                required
                />
                </label>
              </div>
            </div>
            
            <input type="submit" value="Add Task" className="btn btn-block" />
            {/* <button onSubmit={handleBanner} className="btn btn-block" >Add Banner</button> */}
          </form>
        </div>
      </div>
    );
};

export default AddTask;