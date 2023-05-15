import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
const url = 'http://localhost:5000';


export const getListById = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${url}/getListById`,values);
        dispatch({ type: actionTypes.GET_LIST_SUCCESS, payload: data });
        console.log(data,"=========>data-list-redux")

    } catch (error) {
        dispatch({ type: actionTypes.GET_LIST_FAIL, payload: error.response });
    }
};
export const deleteListById = (values) => async (dispatch) => {
    try {
        console.log(values,"------------->redux values")
        
        dispatch({ type: actionTypes.DELETE_LIST_SUCCESS, payload: values });
       

    } catch (error) {
        dispatch({ type: actionTypes.DELETE_LIST_FAIL, payload: error.response });
    }
};