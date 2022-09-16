import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
import { PersistConfig } from 'redux-persist';

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middleware.push(logger);

// Root reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
