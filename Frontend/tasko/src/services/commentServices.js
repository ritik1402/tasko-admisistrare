import axios from 'axios';


export const getCommentsByTaskId = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8000/api/comment/getcomment/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Failed to fetch comments", err);
    return [];
  }
};

export  const createComment = async (taskId, comment) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:8000/api/comment/addcomment/${taskId}`,{comment},
       {
      headers :{
        Authorization: `Bearer ${token}`,
      }
  });
  return response.data;
  }
catch (err) {
    console.log("Something went wrong", err);
}
}

