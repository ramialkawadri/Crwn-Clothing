import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
    process.env.NODE_ENV === 'development' && logger,
    thunk,
].filter(Boolean);

// Root reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

export const persistor = persistStore(store);
