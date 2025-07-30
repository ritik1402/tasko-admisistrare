import axios from 'axios';


 const getToken = async () => {
    const token =   localStorage.getItem('token');
}

export const getCommnets = async (id) => {
    try {
        const token = await getToken();
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response.data;
    }
    catch (error) {
        console.error("Something went wrong", error);
    }
}