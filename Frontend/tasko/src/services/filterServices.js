import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const fetchFilteredTasks = async (status) => {
  try {
    const token = getToken();
    const res = await axios.get(`http://localhost:8000/api/task/viewTask?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const pending = () => fetchFilteredTasks("PENDING");
export const completed = () => fetchFilteredTasks("COMPLETED");
export const inProgress = () => fetchFilteredTasks("IN_PROGRESS");
