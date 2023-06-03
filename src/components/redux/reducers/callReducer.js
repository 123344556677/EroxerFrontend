import * as actionTypes from '../constants';


export const getAllCallReducer = (state = {call: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_ALL_CALL_SUCCESS:
            return { call: action.payload }
        case actionTypes.GET_ALL_CALL_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};