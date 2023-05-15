import * as actionTypes from '../constants';


export const getListByIdReducer = (state = {list: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_LIST_SUCCESS:
            return { list: action.payload }
        case actionTypes.GET_LIST_FAIL:
            return { error: action.payload }
        case actionTypes.DELETE_LIST_SUCCESS:
            const updatedObjects = state.filter((obj) => obj._id !== action.payload);
            return { list: updatedObjects  }
         case actionTypes.DELETE_LIST_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};