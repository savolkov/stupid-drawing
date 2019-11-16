import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootSaga from './sagas/sagas';
import App from './App';
import * as serviceWorker from './serviceWorker';
import linesReducer from './reducers/linesReducer';
import mouseReducer from './reducers/mouseReducer';
import setupSocket from './sockets/sockets';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  linesState: linesReducer,
  mouseState: mouseReducer,
});

/* eslint-disable no-underscore-dangle */
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);
/* eslint-enable */

const socket = setupSocket(store.dispatch);
// @ts-ignore
sagaMiddleware.run(rootSaga, { socket });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
