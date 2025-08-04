import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "http://localhost:8000/api/task";
// const token = localStorage.getItem("token");

const handleTokenError = (err) => {
  if (
    err.response &&
    (err.response.status === 401 || err.response.status === 403)
  ) {
    toast.error("Token expired");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return true;
  }
  return false;
};

export const getTaskTypes = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8000/api/task/taskType",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (handleTokenError(err)) return [];
    console.log("Failed to fetch task types", err);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/addTask`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (handleTokenError(err)) return null;
    console.log("Something went wrong", err);
    return null;
  }
};

export const getAllTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8000/api/task/viewTask",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (handleTokenError(err)) return [];
    console.log("Failed to fetch tasks", err);
    return [];
  }
};

export const editTask = async (id, task) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BASE_URL}/edittask/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (handleTokenError(err)) return null;
    console.log("Something went wrong", err);
    return null;
  }
};
