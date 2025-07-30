import axios from "axios";

const BASE_URL = "http://localhost:8000/api/user";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/createuser`, formData);
    return response.data;
  } catch (error) {
    console.log("signup  failed",error);

  }
}

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    console.log("login failed", error);
    return null; 
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('http://localhost:8000/api/user/getusers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("get user failed", error);
    return []; 
  }
};

