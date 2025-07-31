import React, { useState, useEffect } from "react";
import { getAllTasks } from "../services/taskServices";
import { inProgress, pending, completed } from "../services/filterServices";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const column = [
    "Name",
    "Type",
    "Status",
    "From User",
    "To User",
    "At Time",
    "Option",
  ];
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleFilter = async (status) => {
    setActiveFilter(status);
    if (status === "ALL") {
      const data = await getAllTasks();
      setTasks(data);
    } else if (status === "IN_PROGRESS") {
      const data = await inProgress();
      setTasks(data);
    } else if (status === "COMPLETED") {
      const data = await completed();
      setTasks(data);
    } else if (status === "PENDING") {
      const data = await pending();
      setTasks(data);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edittask/${id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-[#273F4F] mb-4">View Tasks</h2>
      <div className="flex gap-4 mb-4 border-b-gray-400 border-b-2">
        <button
          onClick={() => handleFilter("ALL")}
          className="text-blue-500 hover:border-b-0 hover:border-2 border-transparent hover:border-blue-500"
        >
          All
        </button>
        <button
          onClick={() => handleFilter("IN_PROGRESS")}
          className="text-blue-500 hover:border-b-0 hover:border-2 border-transparent hover:border-blue-500"
        >
          In Progress
        </button>
        <button
          onClick={() => handleFilter("COMPLETED")}
          className="text-blue-500 hover:border-b-0 hover:border-2 border-transparent hover:border-blue-500"
        >
          Completed
        </button>
        <button
          onClick={() => handleFilter("PENDING")}
          className="text-blue-500 hover:border-b-0 hover:border-2 border-transparent hover:border-blue-500"
        >
          Pending
        </button>
      </div>

      <table className="w-full border-collapse border border-[#273F4F]">
        <thead>
          <tr>
            {column.map((item, index) => (
              <th
                key={index}
                className="border border-[#273F4F] p-2 text-[var(--small-color)] bg-[var(--secondary)]"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border border-[#273F4F] p-2">{task.taskName}</td>
              <td className="border border-[#273F4F] p-2">
                {task.taskType?.name}
              </td>
              <td className="border border-[#273F4F] p-2">{task.taskStatus}</td>
              <td className="border border-[#273F4F] p-2">
                {task.user?.userName}
              </td>
              <td className="border border-[#273F4F] p-2">
                {task.assignedUser?.userName}
              </td>
              <td className="border border-[#273F4F] p-2">
                {new Date(task.createdAt).toLocaleString()}
              </td>
              <td className="border border-[#273F4F] p-2">
                <button
                  className="text-blue-400 hover:underline cursor-pointer"
                  onClick={() => handleEdit(task._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTask;
