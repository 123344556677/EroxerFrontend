import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { cartReducer } from './reducers/cartReducer';
import { getPostsReducer } from './reducers/postReducer';
import { getAdsReducer } from './reducers/adsReducer';
import { getUserByIdReducer } from './reducers/userReducer';

const reducer = combineReducers({
    getUserById:getUserByIdReducer,
    getPosts: getPostsReducer,
    getAds: getAdsReducer,
    

    
})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;