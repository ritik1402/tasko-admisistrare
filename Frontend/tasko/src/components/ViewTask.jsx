import React, { useState, useEffect } from "react";
import { getAllTasks, editTask } from "../services/taskServices.js";
import { inProgress, pending, completed } from "../services/filterServices.js";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const columns = [
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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const data = await getAllTasks();
    setTasks(data);
    setLoading(false);
  };

  const handleFilter = async (status) => {
    setActiveFilter(status);
    setLoading(true);
    if (status === "ALL") {
      await fetchAll();
    } else {
      const filterMap = {
        IN_PROGRESS: inProgress,
        COMPLETED: completed,
        PENDING: pending,
      };
      const data = await filterMap[status]();
      setTasks(data);
      setLoading(false);
    }
  };

  const handleEditClick = (taskId, currentStatus) => {
    setEditingTaskId(taskId);
    setEditedStatus(currentStatus);
  };

  const handleSaveClick = async (taskId) => {
    await editTask(taskId, { taskStatus: editedStatus });
    setEditingTaskId(null);
    setEditedStatus("");
    fetchAll();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-[#273F4F] mb-6">View Tasks</h2>

     
      <div className="flex gap-4 mb-6 border-b pb-2 border-gray-400">
        {["ALL", "IN_PROGRESS", "COMPLETED", "PENDING"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`text-blue-600 px-4 py-1 rounded-md transition-all my-4 duration-200 ${
              activeFilter === status
                ? " font-semibold underline"
                : "hover:bg-blue-50 hover:border-2 hover:border-b-0 "
            }`}
          >
            {/* {status.replace("_", " ")} */}
            {status}
          </button>
        ))}
      </div>

     
      {loading ? (
        <div className="text-center mt-20">
          <div className="inline-block w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[#273F4F] rounded">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="border border-[#273F4F] bg-[var(--secondary)] px-4 py-2 text-left text-sm font-medium text-[var(--small-color)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <input
                      readOnly
                      className="bg-transparent outline-none w-full"
                      value={task.taskName}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      readOnly
                      className="bg-transparent outline-none w-full"
                      value={task.taskType?.name}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {editingTaskId === task.id ? (
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="border p-1 rounded w-full"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    ) : (
                      <input
                        readOnly
                        className="bg-transparent outline-none w-full"
                        value={task.taskStatus}
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      readOnly
                      className="bg-transparent outline-none w-full"
                      value={task.user?.userName}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      readOnly
                      className="bg-transparent outline-none w-full"
                      value={task.assignedUser?.userName}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      readOnly
                      className="bg-transparent outline-none w-full"
                      value={new Date(task.createdAt).toLocaleString()}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {editingTaskId === task.id ? (
                      <button
                        onClick={() => handleSaveClick(task.id)}
                        className="text-green-600 font-medium hover:underline"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEditClick(task.id, task.taskStatus)
                        }
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && !loading && (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
