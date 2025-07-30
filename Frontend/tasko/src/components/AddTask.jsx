import React, { useEffect, useState } from 'react';
import { getTaskTypes, createTask } from '../services/taskServices.js';
import { getUser } from '../services/userServices.js';

const AddTask = () => {
  const [taskTypes, setTaskTypes] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    taskName: "",
    assignTo: "",
    taskType: "",
    taskStatus: "Not Started",
    comment: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const token = localStorage.getItem('token');
      const [taskTypesData, usersData] = await Promise.all([
        getTaskTypes(),
        getUser(token)
      ]);
      setTaskTypes(taskTypesData);
      setUsers(usersData);
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const response = await createTask(form);
    console.log(response);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#273F4F]">Add a New Task</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700">Task Name</label>
          <input type="text" name="taskName" className="w-full border p-2 rounded"
            value={form.taskName} onChange={handleChange} />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Assign To</label>
          <select name="assignTo" className="w-full border p-2 rounded" onChange={handleChange} value={form.assignTo}>
            <option value="">Assign To</option>
            {users?.map((user, index) => (
              <option key={index} value={user.id}>{user.userName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Task Type</label>
          <select name="taskType" className="w-full border p-2 rounded" onChange={handleChange} value={form?.taskType}>
            <option value="">Select type</option>
            {taskTypes.map((type, index) => (
              <option key={index} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Task Status</label>
          <select name="taskStatus" className="w-full border p-2 rounded" onChange={handleChange} value={form.taskStatus}>
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Add a Comment</label>
          <textarea name="comment" placeholder="Write a comment" className="w-full border p-2 rounded"
            value={form.comment} onChange={handleChange} />
        </div>

        <div>
          <button className="bg-[#273F4F] hover:bg-[#273F4]" type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
