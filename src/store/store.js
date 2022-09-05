import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);

// Root reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

export const persistor = persistStore(store);
