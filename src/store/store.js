import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    process.env.NODE_ENV === 'development' && logger,
    sagaMiddleware,
].filter(Boolean);

// Root reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
