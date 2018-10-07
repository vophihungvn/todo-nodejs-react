import { applyMiddleware, createStore, compose } from 'redux';
import createSaga from 'redux-saga';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import logger from 'redux-logger';
import history from '../history';
import reducer from './reducer';
import sagas from './sagas';

const sagaMiddleware = createSaga();
const t = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
const composeEnhancers = t || compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    // errorHandling,
    logger,
    routerMiddleware(history),
    sagaMiddleware
  )
);

const store = createStore(connectRouter(history)(reducer), enhancer);
sagaMiddleware.run(sagas);
export default store;
