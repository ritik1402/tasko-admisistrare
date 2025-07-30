import React,{useEffect, useState} from 'react'
// import taskServices from '../services/taskServices.js'
import axios from 'axios';
import {toast} from 'react-hot-toast'

const AddTaskType = () => {

    const [name, setName] = useState('')

    const handleAddTaskType = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/task/addtaskType',
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }
    );

    console.log(response.data);
    toast.success("Task Type Added Successfully");
  } catch (error) {
    console.error("Unable to add task type", error);
    toast.error("Something went wrong");
  }
};




  return (
    <div>
      <label>Task Type</label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Add a task type' className='border-2'/>
      <button onClick={handleAddTaskType}>Add Task Type</button>
    </div>
  )
}

export default AddTaskType
