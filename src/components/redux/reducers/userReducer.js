import * as actionTypes from '../constants';


export const getUserByIdReducer = (state = {user: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_USER_SUCCESS:
            return { userData: action.payload }
        case actionTypes.GET_USER_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};