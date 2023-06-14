import * as actionTypes from '../constants';
import axios from 'axios';
// const url ="https://sore-red-millipede-boot.cyclic.app/"
const url = 'http://localhost:5000';


export const getPayments = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${url}/getAllPayment`);
        dispatch({ type: actionTypes.GET_PAYMENT_SUCCESS, payload: data });
        console.log(data,"=========>data-redux")

    } catch (error) {
        dispatch({ type: actionTypes.GET_PAYMENT_FAIL, payload: error.response });
    }
};