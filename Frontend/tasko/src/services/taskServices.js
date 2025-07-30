import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/task';
const token = localStorage.getItem('token');

export const getTaskTypes = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('http://localhost:8000/api/task/taskType', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch task types", err);
    return [];
  }
};


export const createTask = async (task) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`${BASE_URL}/addTask`, task, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    console.log("Something went wrong", err);
    return null;
  }
};
