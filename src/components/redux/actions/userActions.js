import * as actionTypes from '../constants';
import axios from 'axios';

const url = 'http://localhost:5000';


export const getUserById = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/userById`, values);;
        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: data?.data });
        console.log(data,"=========>data-user")

    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_FAIL, payload: error.response });
    }
};
