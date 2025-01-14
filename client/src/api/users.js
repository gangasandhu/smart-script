import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;


const getUsers = async () => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
}

const getUser = async (id) => {
  const response = await axios.get(`${baseURL}/users/${id}`);
  return response.data;
}

const updateUser = async(id, data) => {
  const response = await axios.put(`${baseURL}/users/${id}`, data);
  return response.data;
}


export { getUsers, getUser, updateUser };
