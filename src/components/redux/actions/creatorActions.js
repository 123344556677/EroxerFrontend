import * as actionTypes from '../constants';
import axios from "axios";
const url = 'http://localhost:5000';

export const getAllCreatorRequest = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllCreatorsRequest`);
        dispatch({ type: actionTypes.GET_ALL_CREATOR_REQUEST_SUCCESS, payload:data });
        console.log(data,"=========>all-user")

    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_CREATOR_REQUEST_FAIL, payload: error.response });
    }
};