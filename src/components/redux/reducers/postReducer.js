import * as actionTypes from '../constants';


export const getPostsReducer = (state = {posts: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_POSTS_SUCCESS:
            return { posts: action.payload }
        case actionTypes.GET_POSTS_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};