import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AuthContext } from '../../../firebase/AuthProvider';

const ManageTask = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/task')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      });
  }, []);

  const userTasks = tasks.filter(task => task.email === email);

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside of the list

    const movedTask = userTasks[result.source.index];
    const updatedStatus = result.destination.droppableId;

    // Optimistic UI update
    const updatedTasks = [...userTasks];
    movedTask.status = updatedStatus;
    setTasks(updatedTasks);

    // Update the backend with the new task status
    await updateTaskStatus(movedTask._id, updatedStatus);
  };

  const updateTaskStatus = async (taskId, updatedStatus) => {
    // try {
    //   const response = await fetch(`http://localhost:5000/updateTaskStatus/${taskId}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ status: updatedStatus }),
    //   });

    //   if (!response.ok) {
    //     console.error(`Failed to update task status for task ID ${taskId}.`);
    //     // Handle error or retry the update
    //   }
    // } catch (error) {
    //   console.error('Error updating task status:', error);
    //   // Handle error or retry the update
    // }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {['to-do', 'ongoing', 'completed'].map((columnId, index) => (

          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  listStyle: 'none',
                  padding: '8px',
                  margin: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '200px',
                }}
              >
                <h2>{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</h2>
                {userTasks
                  .filter(task => task.status === columnId)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={(task._id).toString()} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            margin: '8px 0',
                            padding: '8px',
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'grab',
                          }}
                        >
                          <strong>{task.name}</strong>: {task.description}
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ManageTask;
