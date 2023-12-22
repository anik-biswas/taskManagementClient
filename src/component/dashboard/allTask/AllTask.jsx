import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import { AuthContext } from "../../../firebase/AuthProvider";

const itemsPerPage = 4; 
const AllTask = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const location = useLocation();
    const navigate = useNavigate();
    const [tasks,setTasks]= useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTask, setSelectedTask] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/task')
          .then(res => res.json())
          .then(data => {
            setTasks(data);
          });
      }, []);
    
      const userTasks = tasks.filter(task => task.email === email);
      const [taskDate, setTaskDate] = useState(null);
      const [currentPage, setCurrentPage] = useState(0);

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedTasks = userTasks.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(userTasks.length / itemsPerPage);

    //setTests(displayedTests)
      const openModal = (user) => {
        console.log(user)
        setTaskDate(null)
        setSelectedTask(user);
        
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
      };

      const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Test won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`https://diagnostic-server-site.vercel.app/dashboard/test/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                            const remainingTests = userTasks.filter(test=> test._id !== id);
                            setTasks(remainingTests);
                    
                        }
                    })

            }
        })
    }
    
    const handleUpdateTest = async (e) => {
        // try {
        //     e.preventDefault();
    
        //     const form = new FormData(e.currentTarget);
        //     const name = form.get('name');
        //     const description = form.get('description');
        //     const price = form.get('price');
        //     const slot = form.get('slot');
        //     const testDate = form.get('testDate');
        //     const imageFile = form.get('testImg');
    
        //     let imageUrl = selectedTest?.testImg; 
    
        //     if (imageFile && imageFile.size > 0) {
        //         const imgbbFormData = new FormData();
        //         imgbbFormData.append('image', imageFile);
                
        //         const imgbbRes = await fetch(image_hosting_api, {
        //             method: 'POST',
        //             body: imgbbFormData,
        //         });
    
        //         if (!imgbbRes.ok) {
        //             throw new Error('Image upload failed');
        //         }
    
        //         const imgbbData = await imgbbRes.json();
        //         imageUrl = imgbbData.data.url;
        //     }
    
        //     const updateTest = { name, description, testDate, price, slot, testImg: imageUrl };
    
        //     const response = await fetch(`https://diagnostic-server-site.vercel.app/dashboard/test/${selectedTest._id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'content-type': 'application/json',
        //         },
        //         body: JSON.stringify(updateTest),
        //     });
    
        //     if (!response.ok) {
        //         throw new Error('Test update failed');
        //     }
    
        //     const data = await response.json();
    
        //     if (data.success) {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: 'Test Updated Successfully',
        //             icon: 'success',
        //             confirmButtonText: 'Ok',
        //         });
        //         closeModal()
        //         // navigate(location?.state?.from || '/dashboard/manageTest');
        //         // window.location.reload();
        //         const updatedTest= await fetch(`https://diagnostic-server-site.vercel.app/test`);
        //         const updatedTestData = await updatedTest.json();

        //     setTests(updatedTestData);

        //     } else {
        //         console.log('No update');
        //     }
        // } catch (error) {
        //     console.error('Error updating test:', error);
        //     // Handle the error (show a message to the user, etc.)
        // }
    };

    const filteredTask = userTasks.filter((task) =>
  task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      console.log(filteredTask)
    return (
        <div>
        
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        {isModalOpen && selectedTask && (
            <div className="fixed inset-0 z-50 overflow-auto bg-[#CBE4E9]   bg-opacity-50 flex">
            <div className="relative p-4 max-w-xl m-auto bg-[#CBE4E9] w-full">
            <div className=" md:p-4 lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-xl mb-3 md:text-2xl lg:text-2xl font-extrabold">
              Update Test
            </h2>

            <p className="text-right">
              <button className="text-center text-lg bg-red-400 w-6 h-6" onClick={closeModal}>x</button>
            </p>
          </div>
           <form onSubmit={handleUpdateTest} >
         
            <div className="md:flex  mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Test Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedTask?.name} 
                    
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              
            </div>
            
            <input type="submit" value="Update Task" className="btn btn-block" />
            
          </form> 
        </div>
            
        </div>
        </div>

          )}  
          <form>
        <div className="my-4 mx-4">
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
            Search by Task Name
          </label>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search by Test Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        </form>
            <table className="table">
                        
                        <thead>
                            <tr className="text-center">
                                <th></th>
                                <th className="text-red-400">Title</th>
                                <th className="text-red-400">Description </th>
                                <th className="text-red-400">Priority</th>
                                <th className="text-red-400">Status</th>
                                <th className="text-red-400">update</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {filteredTask.map((task, index) => (
                                <tr className="text-center" key={task._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{task.name}</td>
                                    <td className="text-justify">
                                    {task.description.length > 20
                                        ? `${task.description.slice(0, 20)}...`
                                        : task.description}
                                    </td>
                                    <td>{task.priority}</td>
                                    <td>{task.status}</td>
                                    <td><button onClick={() => openModal(task)} >Edit</button></td>
                                    <td>
                                    <FaTrash  onClick={() => handleDelete(task._id)}  className="text-red-500"></FaTrash>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 
        </div>
        </div>
    );
};

export default AllTask;