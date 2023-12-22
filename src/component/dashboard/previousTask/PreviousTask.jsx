import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import { AuthContext } from "../../../firebase/AuthProvider";
const itemsPerPage = 4;
const PreviousTask = () => {
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
    
      const userTasks = tasks.filter(task => task.email === email && task.status==='completed');
      const [taskDate, setTaskDate] = useState(null);
      const [currentPage, setCurrentPage] = useState(0);
      const priority = ['Low', 'Moderate' , 'High'];
      const status = ['to-do', 'ongoing', 'completed'];
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedTasks = userTasks.slice(indexOfFirstItem, indexOfLastItem);

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
        console.log(id)
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

                fetch(`http://localhost:5000/dashboard/task/${id}`, {
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
    
    const filteredTask = userTasks.filter((task) =>
  task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      console.log(filteredTask)
    return (
        <div>
        
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
         
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
                                <th className="text-red-400">Date</th>
                                <th className="text-red-400">Status</th>
                                
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
                                    <td>{task.taskDate}</td>
                                    <td>{task.status}</td>
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

export default PreviousTask;
