import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
const url = 'http://localhost:5000';


export const getRequestById = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/getRequestById`,values);
        dispatch({ type: actionTypes.GET_ALL_REQUEST_SUCCESS, payload: data });
        console.log(data,"=========>requestAccptedData")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_REQUEST_FAIL, payload: error.response });
    }
};
export const getAllAcceptedUsers = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/getAllAcceptedUsers`,values);
        dispatch({ type: actionTypes.GET_ALL_ACCEPTED_REQUEST_SUCCESS, payload: data });
        console.log(data,"=========>requestData")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_ACCEPTED_REQUEST_FAIL, payload: error.response });
    }
};