import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:8000/api/user";

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

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/createuser`, formData);
    return response.data;
  } catch (error) {
    if (handleTokenError(error)) return;
    console.log("signup  failed", error);
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    if (handleTokenError(error)) return;
    console.log("login failed", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8000/api/user/getusers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (handleTokenError(error)) return;
    console.log("get user failed", error);
    return [];
  }
};
