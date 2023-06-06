import * as actionTypes from '../constants';
import axios from 'axios';
const url ="https://sore-red-millipede-boot.cyclic.app/"
// const url = 'http://localhost:5000';


export const getCallById = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/getCallById`,values);
        dispatch({ type: actionTypes.GET_ALL_CALL_SUCCESS, payload: data });
        console.log(data,"=========>CALL DATA")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_CALL_FAIL, payload: error.response });
    }
};