import * as actionTypes from '../constants';
import axios from 'axios';

const url = 'http://localhost:5000';


export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllPost`);;
        dispatch({ type: actionTypes.GET_POSTS_SUCCESS, payload: data });
        console.log(data,"=========>data-redux")

    } catch (error) {
        dispatch({ type: actionTypes.GET_POSTS_FAIL, payload: error.response });
    }
};