import React, { useEffect, useState } from "react";
import { getAllTasks } from "../services/taskServices";
import { getCommentsByTaskId } from "../services/commentServices.js";

const Comments = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleTaskChange = async (e) => {
    const taskId = e.target.value;
    setSelectedTaskId(taskId);

    if (taskId) {
      const commentData = await getCommentsByTaskId(taskId);
      setComments(commentData);
      console.log("Fetched comments: ", commentData);
    } else {
      setComments([]);
    }
  };

  const columns = ["Comment", "Task Name", "From User"];

  const validComments = comments?.filter((c) => c.comment && c.comment.trim());

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-[#273F4F] mb-4">
        View Task Comments
      </h2>

      <label className="block mb-2 font-semibold">Select Task</label>
      <select
        onChange={handleTaskChange}
        className="w-full border p-2 rounded mb-6"
        value={selectedTaskId}
      >
        <option value="">-- Select Task --</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.taskName} | from: {task.user?.userName} | to:{" "}
            {task.assignedUser?.userName} | {task.createdAt}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments:</h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-[var(--secondary)] text-[var(--small-color)] p-2">
              {columns.map((col, index) => (
                <th key={index} className="text-left px-4 py-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!validComments || validComments.length === 0) ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No comments available
                </td>
              </tr>
            ) : (
              validComments.map((comment, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{comment.comment}</td>
                  <td className="px-4 py-2">{comment.task?.taskName}</td>
                  <td className="px-4 py-2">{comment.user?.userName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;

