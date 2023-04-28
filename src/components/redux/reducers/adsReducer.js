import * as actionTypes from '../constants';


export const getAdsReducer = (state = {ads: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_Ads_SUCCESS:
            return { ads: action.payload }
        case actionTypes.GET_Ads_FAIL:
            return { error: action.payload }
        default:
            return state
    }
};