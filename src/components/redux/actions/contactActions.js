import * as actionTypes from '../constants';
import axios from 'axios';
const url ="https://sore-red-millipede-boot.cyclic.app/"
// const url = 'http://localhost:5000';


export const getContactById = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/getContactById`,values);
        dispatch({ type: actionTypes.GET_CONTACT_SUCCESS, payload: data });
        console.log(data,"=========>requestAccptedData")

    } catch (error) {
        dispatch({ type: actionTypes.GET_CONTACT_FAIL, payload: error.response });
    }
};