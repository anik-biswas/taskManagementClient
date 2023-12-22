import { useContext, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../firebase/AuthProvider";
import Swal from "sweetalert2";
//import Swal from "sweetalert2";

const AddTask = () => {
    const{user}= useContext(AuthContext);
    const location= useLocation();
    const navigate= useNavigate();
    const email = user?.email;
    const [error,setError] = useState("");
    const [taskDate, setTaskDate] = useState(null);
    //const [priority, setPriority] = useState("");
    const priority = ['Low', 'Moderate' , 'High'];
    const handleTask=async(e)=>{
        e.preventDefault();
    
        const form = new FormData(e.currentTarget);
        const selectPriority = document.getElementById("selectPriority");
        const name = form.get('name');
        const description = form.get('description')
        const priority = selectPriority.value;
        const taskDate = form.get('taskDate');
            const task = { name,description,taskDate,priority,email,status:"to-do"};
            console.log(task)
            fetch('https://taskmanagement-server-eta.vercel.app/dashboard/addTask', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire({
                            title: 'Success!',
                            text: 'Task added Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        });
                      
                      navigate(location?.state?.from || '/dashboard/manageTask');
                    }
                    console.log(data)
                })
    }
    return (
        <div>
        <div className="bg-[#CBE4E9] p-4 md:p-4 lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-extrabold">
              Add Task
            </h2>
            
          </div>
          <form  onSubmit={handleTask}>
         
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
                  className="select input input-bordered w-full"
                  id="selectPriority"
                  required
                >
                     <option value="" disabled selected>
                        Select priority
                      </option>
                  {priority.map((priority, index) => (
                    <option key={index} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
                
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <label className="input-group">
                <DatePicker
                selected={taskDate} 
                onChange={(date) => setTaskDate(date)} 
                placeholderText="Select a date"
                name="taskDate"
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