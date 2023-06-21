import axios from 'axios'

const url = 'http://localhost:5000';
// export const socketUrl = 'ws://localhost:6000';
// const url ="https://sore-red-millipede-boot.cyclic.app/"


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
export const googleLogin = async (values) => {
    return await axios.post(`${url}/googleLogin`, values);
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
export const initiateEmailVerification = async (values) => {
    return await axios.post(`${url}/sendCode`, values);
}
export const verifyCode= async (values) => {
   
    return await axios.post(`${url}/verifyCode`, values);
}
export const deleteAccount= async (values) => {
   
    return await axios.post(`${url}/deleteAccount`, values);
}
export const changeOnlineStatus= async (values) => {
   
    return await axios.put(`${url}/updateOnlienStatus`, values);
}
export const verifyStatus= async (values) => {
   
    return await axios.post(`${url}/updateVerifyStatus`, values);
}
export const liveStreamStatus= async (values) => {
   
    return await axios.put(`${url}/updateLiveStreamStatus`, values);
}
export const updateThumbPic= async (values) => {
   
    return await axios.put(`${url}/updateThumbPic`, values);
}
export const updateUserCover = async (values) => {
    return await axios.put(`${url}/updateUserCover`, values);
}
export const updateUserProfile = async (values) => {
    return await axios.put(`${url}/updateUserProfile`, values);
}
//post
export const createPost = async (values) => {
    return await axios.post(`${url}/createPost`, values);
}
export const getAllPosts= async () => {
    return await axios.get(`${url}/getAllPost`);
}
export const pollcounterIncrement= async (values) => {
    return await axios.post(`${url}/pollCounterIncrement`,values);
}
export const updatePost= async (values) => {
    return await axios.put(`${url}/updatePost`,values);
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
export const AdCounterIncrement= async (values) => {
    return await axios.put(`${url}/counterIncrement`,values);
}



//chat 
export const sendMessage= async (values) => {
    return await axios.post(`${url}/sendMessage`, values);
}
export const getAllChatsById= async (values) => {
    return await axios.post(`${url}/getAllChatsById`, values);
}
export const makeCall= async (values) => {
    return await axios.post(`${url}/newCall`, values);
}
export const makeAlert= async (values) => {
    return await axios.post(`${url}/sendAlert`, values);
}
export const getLastMessage= async (values) => {
    return await axios.post(`${url}/lastMessage`, values);
}
export const updateReadStatus= async (values) => {
    return await axios.post(`${url}/updateLastRead`, values);
}
export const updateCallStatus= async (values) => {
    return await axios.put(`${url}/changeCallStatus`, values);
}
export const updateAllCallStatus= async (values) => {
    return await axios.put(`${url}/changeAllCallStatus`, values);
}
//Request
export const sendRequest= async (values) => {
    return await axios.post(`${url}/makeRequest`, values);
}
export const changeStatus= async (values) => {
    return await axios.put(`${url}/changeRequestStatus`, values);
}
export const getRequestByRecieverId= async (values) => {
    return await axios.post(`${url}/getRequestById`, values);
}
export const updateNotiStatus= async (values) => {
    return await axios.put(`${url}/updateNotiStatus`, values);
}

//list
export const addList= async (values) => {
    return await axios.post(`${url}/addToList`, values);
}
export const deleteListDataById= async (values) => {
    return await axios.post(`${url}/deleteListDataById`, values);
}
//creator
export const applyForCreator= async (values) => {
    return await axios.post(`${url}/applyForCreator`, values);
}
export const changeCreatorStatus= async (values) => {
    return await axios.put(`${url}/updateVideoStatus`, values);
}
//poll
export const createPoll= async (values) => {
    return await axios.post(`${url}/createPoll`, values);
}
//payment
export const createPayment= async (values) => {
    return await axios.post(`${url}/createPayment`, values);
    
}
export const createPaymentRequest= async (values) => {
    return await axios.post(`${url}/createPaymentRequest`, values);
    
}
export const sendTip= async (values) => {
    return await axios.post(`${url}/sendTip`, values);
}
export const sendLiveTip= async (values) => {
    return await axios.post(`${url}/liveTip`, values);
}
export const updatePaymentRequest= async (values) => {
    return await axios.put(`${url}/changePaymentRequestStatus`, values);
}

//contact
export const createContact= async (values) => {
    return await axios.post(`${url}/createContact`, values);
}



