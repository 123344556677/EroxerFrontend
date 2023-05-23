import * as actionTypes from '../constants';


export const getPostsReducer = (state = {posts: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_POSTS_SUCCESS:
            return { posts: action.payload }
        case actionTypes.GET_POSTS_FAIL:
            return { error: action.payload }
        case actionTypes.Poll_Counter_Increment:
        const { objectIndex, counterIndex } = action.payload;
      const updatedArray = [...state.getPost.posts];
      const updatedObject = { ...updatedArray[objectIndex] };
      updatedObject.options[counterIndex].counter += 1; // Increment the counter variable
      updatedArray[objectIndex] = updatedObject;
      return {
        ...state,
        posts: updatedArray
      };
            
        default:
            return state
    }
};