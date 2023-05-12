import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
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
export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllUsers`);
        dispatch({ type: actionTypes.GET_ALL_USER_SUCCESS, payload:data });
        console.log(data,"=========>all-user")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_USER_FAIL, payload: error.response });
    }
};

export const getReduxUserById = (state, userId) => {
//   const { users } = state;
  return state?.allUsers?.find(user => user?._id === userId);
//    console.log( profileUser,"=========>profile-user")
}
