import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
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

export const getReduxPostsById = (state, userId) => {
//   const { users } = state;
//   return state?.posts?.find(post => post?.userId === userId);
  const filteredArray = state?.posts?.filter((item) => {
  // Replace with your condition
  return item?.userId === userId
});
return filteredArray
//    console.log( ,"=========>profile-user")
}
export const incrementCounter = (objectIndex, counterIndex) => async (dispatch) => {
    try {
        return {
    type: actionTypes.Poll_Counter_Increment ,
    payload: {
      objectIndex,
      counterIndex
    }
        // const { data } = await axios.get(`${url}/getAllPost`);;
        // dispatch({ type: actionTypes.GET_POSTS_SUCCESS, payload: data });
        // console.log(data,"=========>data-redux")
}

    } catch (error) {
        dispatch({ type: actionTypes.GET_POSTS_FAIL, payload: error.response });
    }
};