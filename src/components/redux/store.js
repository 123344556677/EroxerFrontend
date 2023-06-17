import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import { cartReducer } from './reducers/cartReducer';
import { getPostsReducer } from './reducers/postReducer';
import { getAdsReducer } from './reducers/adsReducer';
import { getAllUsers, getUserByIdReducer } from './reducers/userReducer';
import { getAllAcceptedRequestReducer, getAllRequestReducer, getAllSenderRequestReducer, getAllSubscriptionsReducer } from './reducers/requestReducer';
import { getListByIdReducer } from './reducers/listReducer';
import { getAllCallReducer } from './reducers/callReducer';
import { getAllCreatorRequest } from './reducers/creatorReducer';
import { getPaymentReducer,getAllTip, getPaymentRequestReducer } from './reducers/paymentReducer';
import { getContactByIdReducer } from './reducers/contactReducer';

const reducer = combineReducers({
    getUserById:getUserByIdReducer,
    getPosts: getPostsReducer,
    getAds: getAdsReducer,
    getAllUsers:getAllUsers,
    getAllRequestReducer:getAllRequestReducer,
    getAllAcceptedRequestReducer:getAllAcceptedRequestReducer,
    getAllSenderRequestReducer: getAllSenderRequestReducer,
    getListByIdReducer: getListByIdReducer,
    getAllCallReducer:getAllCallReducer,
    getAllCreatorRequest:getAllCreatorRequest,
    getPaymentReducer:getPaymentReducer,
    getAllTip:getAllTip,
    getAllSubscriptionsReducer:getAllSubscriptionsReducer,
    getPaymentRequestReducer:getPaymentRequestReducer,
    getContactById:getContactByIdReducer


    

    
})
// const persistConfig = {
//   key: 'myStore',
//   storage,
//   // other configuration options if needed
// };
// const persistedReducer = persistReducer(persistConfig, reducer);


const middleware = [thunk];

const store = createStore(
    // persistedReducer,
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
// const persistor = persistStore(store);
export  default store;