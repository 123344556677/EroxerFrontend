import * as actionTypes from '../constants';


export const getContactByIdReducer = (state = {contactById: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_CONTACT_SUCCESS:
            return { contactById: action.payload }
        case actionTypes.GET_CONTACT_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};