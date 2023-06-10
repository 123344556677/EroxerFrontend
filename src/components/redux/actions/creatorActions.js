import * as actionTypes from '../constants';
import axios from "axios";
// const url = 'http://localhost:5000';
const url ="https://sore-red-millipede-boot.cyclic.app/"

export const getAllCreatorRequest = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllCreatorsRequest`);
        dispatch({ type: actionTypes.GET_ALL_CREATOR_REQUEST_SUCCESS, payload:data });
        console.log(data,"=========>all-user")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_CREATOR_REQUEST_FAIL, payload: error.response });
    }
};
export const getReduxCreatorById = (state, userId)  => {
    try {
      return state?.creatorRequest?.find(user => user?.userId === userId);

    } catch (error) {
       
    }
};