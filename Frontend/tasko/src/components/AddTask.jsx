import React, { useEffect, useState } from "react";
import { createTask } from "../services/taskServices.js";

import { toast } from "react-hot-toast";
import Button from "../components/UI/Button.jsx";
import { createComment } from "../services/commentServices.js";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../app/User/user";
import { fetchTaskTypes } from "../app/TaskType/taskTypeSlice";

const AddTask = () => {
  const [form, setForm] = useState({
    taskName: "",
    assignTo: "",
    taskType: "",
    taskStatus: "",
  });
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleAddComment = () => {
    setComments([...comments, ""]);
    setShowCommentBox(true);
  };

  const handleCommentChange = (index, value) => {
    const updated = [...comments];
    updated[index] = value;
    setComments(updated);
  };

  const dispatch = useDispatch();
  const { data: users, isLoading: usersLoading } = useSelector(
    (state) => state.users
  );
  const { data: taskTypes, isLoading: taskTypesLoading } = useSelector(
    (state) => state.taskTypes
  );

  useEffect(() => {
    if (!users) {
      dispatch(fetchUsers());
    }
    if (!taskTypes) {
      dispatch(fetchTaskTypes());
    }
  }, [dispatch, users, taskTypes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.taskName || !form.assignTo || !form.taskType) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await createTask(form);
      toast.success("Task Added Successfully");
      const taskId = response?.task?.id;

      if (taskId && comments.length > 0) {
        for (const comment of comments) {
          if (comment.trim()) {
            await createComment(taskId, comment);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#273F4F]">Add a New Task</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700">
            Task Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="taskName"
            className="w-full border p-2 rounded"
            value={form.taskName}
            onChange={handleChange}
            placeholder="Enter Task name"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Assign To<span className="text-red-500">*</span>
          </label>
          <select
            name="assignTo"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={form.assignTo}
          >
            <option value="">Assign To</option>
            {usersLoading ? (
              <option>Loading...</option>
            ) : (
              users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Task Type<span className="text-red-500">*</span>
          </label>
          <select
            name="taskType"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={form?.taskType}
          >
            <option value="">Select type</option>
            {taskTypesLoading ? (
              <option>Loading...</option>
            ) : (
              taskTypes?.map((type, index) => (
                <option key={index} value={type.name}>
                  {type.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Task Status<span className="text-red-500">*</span>
          </label>
          <select
            name="taskStatus"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={form.taskStatus}
          >
            <option value="Not_Started">Not Started</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="flex flex-col-reverse gap-2">
          <label
            className="block font-medium text-blue-700 cursor-pointer"
            onClick={handleAddComment}
          >
            Add a Comment
          </label>

          {showCommentBox &&
            comments.map((comment, index) => (
              <textarea
                key={index}
                className="w-full border p-2 rounded"
                placeholder={`Comment ${index + 1}`}
                value={comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            ))}
        </div>

        <div>
          <Button>Add Task</Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
