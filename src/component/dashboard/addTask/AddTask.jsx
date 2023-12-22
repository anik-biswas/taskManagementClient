import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../firebase/AuthProvider";
import Swal from "sweetalert2";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const email = user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [taskDate, setTaskDate] = useState(null);

  const handleTask = async (data) => {
    try {
        const formattedDate = data.taskDate.toLocaleDateString('en-US');
     const task = { ...data, email, status: "to-do", taskDate: formattedDate };
      console.log(task)
      
      const response = await fetch(
        "https://taskmanagement-server-eta.vercel.app/dashboard/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      const responseData = await response.json();

      if (responseData.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Task added Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });

        reset(); 
        navigate(location?.state?.from || "/dashboard/manageTask");
      } else {
        
        console.error("Error adding task:", responseData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#CBE4E9] p-4 md:p-4 lg:p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-extrabold">
            Add Task
          </h2>
        </div>
        <form onSubmit={handleSubmit(handleTask)}>
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
                  {...register("name", { required: "Task title is required" })}
                />
              </label>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="input input-bordered w-full"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </label>
              {errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
              )}
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
                  {...register("priority", { required: "Priority is required" })}
                >
                  <option value="" defaultValue="" disabled>
                    Select priority
                  </option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </label>
              {errors.priority && (
                <span className="text-red-500">{errors.priority.message}</span>
              )}
            </div>
            <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="input-group">
              <Controller
            control={control}
            name="taskDate"
            render={({ field }) => (
                <DatePicker
                {...field}
                selected={field.value || null}
                onChange={(date) => field.onChange(date)}
                placeholderText="Select a date"
                className="input input-bordered w-full"
                />
            )}
            />
              </label>
              {errors.taskDate && (
                <span className="text-red-500">{errors.taskDate.message}</span>
              )}
            </div>
          </div>

          <input type="submit" value="Add Task" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default AddTask;
