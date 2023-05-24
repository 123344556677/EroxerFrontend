import * as actionTypes from '../constants';


export const getPostsReducer = (state = {posts: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_POSTS_SUCCESS:
            return { posts: action.payload }
        case actionTypes.GET_POSTS_FAIL:
            return { error: action.payload }
        case actionTypes.Poll_Counter_Increment:
  const { objectId, objectContainingCounterId, counterValue } = action.payload;
  const updatedArray = state.posts.map((object) => {
    if (object._id === objectId) {
      const updatedOptions = object.options.map((option) => {
        if (option._id === objectContainingCounterId && option.counter === counterValue) {
          return { ...option, counter: option.counter + 1 };
        }
        return option;
      });
      return { ...object, options: updatedOptions };
    }
    return object;
  });
  return {
    ...state,
    posts: updatedArray
  };
     
            
        default:
            return state
    }
};