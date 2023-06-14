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