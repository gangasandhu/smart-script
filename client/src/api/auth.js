import axios from "axios";
import { getUser } from "./users";

const baseURL = import.meta.env.VITE_BACKEND_URL;


const register = async (user) => {
    const response = await axios.post(`${baseURL}/auth/register`, user);
    const { token, userRegistered } = response.data;
    localStorage.setItem('AuthenticatedUser', JSON.stringify({ token, userId: userRegistered.id }));
    return userRegistered;
}

const login = async (userData) => {
    const response = await axios.post(`${baseURL}/auth/login`, userData);
    const { token, user } = response.data;
    localStorage.setItem('AuthenticatedUser', JSON.stringify({ token, userId: user.id }));
    return user;
}

const getAuthUser = async () => {
    const authUser = JSON.parse(localStorage.getItem('AuthenticatedUser'));
    if (!authUser) return null;
    const user = await getUser(authUser.userId);
    return user;
}



export { register, login, getAuthUser };