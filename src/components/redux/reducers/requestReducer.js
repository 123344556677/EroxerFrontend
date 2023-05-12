import * as actionTypes from '../constants';


export const getAllRequestReducer = (state = {requests: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_REQUEST_SUCCESS:
            return { userRequests: action.payload }
        case actionTypes.GET_ALL_REQUEST_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};
export const getAllAcceptedRequestReducer = (state = {accpetedRequests: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_ACCEPTED_REQUEST_SUCCESS:
            return { accpetedRequests: action.payload }
        case actionTypes.GET_ALL_ACCEPTED_REQUEST_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};