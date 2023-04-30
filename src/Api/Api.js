import axios from 'axios'

const url = 'http://localhost:5000';
export const socketUrl = 'ws://localhost:6000';


//auth
export const register = async (values) => {
    return await axios.post(`${url}/reg`, values);
}
export const login = async (values) => {
    return await axios.post(`${url}/log`, values);
}
export const googleReg = async (values) => {
    return await axios.post(`${url}/googleReg`, values);
}
export const updateUser = async (values) => {
    return await axios.put(`${url}/updateUser`, values);
}
export const getUsersById = async (values) => {
    return await axios.post(`${url}/userById`, values);
}
export const updatePassword = async (values) => {
    return await axios.put(`${url}/updatePassword`, values);
}
//post
export const createPost = async (values) => {
    return await axios.post(`${url}/createPost`, values);
}
export const getAllPosts= async () => {
    return await axios.get(`${url}/getAllPost`);
}
//ad
export const createAd = async (values) => {
    return await axios.post(`${url}/createAd`, values);
}
export const getAllAds= async () => {
    return await axios.get(`${url}/getAllAd`);
}
export const getAdsById= async (id) => {
    return await axios.get(`${url}/getAdById/${id}`);
}


//chat 
export const sendMessage= async (values) => {
    return await axios.post(`${url}/sendMessage`, values);
}
export const getAllChatsById= async (values) => {
    return await axios.post(`${url}/getAllChatsById`, values);
}


