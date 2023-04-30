import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import { cartReducer } from './reducers/cartReducer';
import { getPostsReducer } from './reducers/postReducer';
import { getAdsReducer } from './reducers/adsReducer';
import { getUserByIdReducer } from './reducers/userReducer';

const reducer = combineReducers({
    getUserById:getUserByIdReducer,
    getPosts: getPostsReducer,
    getAds: getAdsReducer,
    

    
})
const persistConfig = {
  key: 'myStore',
  storage,
  // other configuration options if needed
};
const persistedReducer = persistReducer(persistConfig, reducer);


const middleware = [thunk];

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export  {store,persistor};