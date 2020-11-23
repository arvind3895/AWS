import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";


import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

import rootSaga from './sagas';
import reducer from "./reducers/index";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
