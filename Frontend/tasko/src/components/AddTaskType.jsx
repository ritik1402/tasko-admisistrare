import React,{useEffect, useState} from 'react'
// import taskServices from '../services/taskServices.js'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import Button from '../components/UI/Button'

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
    <div className='flex flex-col  justify-evenly bg-white rounded-2xl p-4'>
      <label className='mb-4 text-2xl font-bold '>Task Type</label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Add a task type' className='border-2'/>
      <button onClick={handleAddTaskType} className='border-2 rounded-2xl w-[150px] p-2 m-4'>Add Task Type</button>
    </div>
  )
}

export default AddTaskType
