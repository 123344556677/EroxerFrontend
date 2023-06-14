import * as actionTypes from '../constants';


export const getPaymentReducer = (state = {payment: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_PAYMENT_SUCCESS:
            return { payment: action.payload }
        case actionTypes.GET_PAYMENT_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};
export const getAllTip= (state = {recieverTip: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_TIP_SUCCESS:
            return { recieverTip: action.payload }
        case actionTypes.GET_TIP_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};