import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware  from '@redux-saga/core';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if(process.env.NODE_ENV === 'development') middlewares.push(logger)
const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)

export default store

