import * as actionTypes from '../constants';




export const getAllCreatorRequest = (state = {creatorRequest: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_CREATOR_REQUEST_SUCCESS:
            return { creatorRequest: action.payload }
        case actionTypes.GET_ALL_CREATOR_REQUEST_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};