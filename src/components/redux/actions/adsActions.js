import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
const url = 'http://localhost:5000';


export const getAds = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllAd`);;
        dispatch({ type: actionTypes.GET_Ads_SUCCESS, payload: data });
        console.log(data,"=========>data-redux")

    } catch (error) {
        dispatch({ type: actionTypes.GET_Ads_FAIL, payload: error.response });
    }
};