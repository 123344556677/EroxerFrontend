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

export const getAllUsers = (state = {users: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_USER_SUCCESS:
            return { allUsers: action.payload }
        case actionTypes.GET_ALL_USER_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};