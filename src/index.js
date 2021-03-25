import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

const defState = {
  token: undefined,
  timer: new Date(),
  timerId: undefined,
  user_id: undefined,
  user_info: undefined,
};

const reducer = (state = defState, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return { ...state, timer: action.payload };
    case 'UPDATE_TIMER_ID':
      return { ...state, timerId: action.payload };
    case 'UPDATE_TOKEN':
      return { ...state, token: action.payload };
    case 'UPDATE_USER_ID':
      return { ...state, user_id: action.payload };
    case 'UPDATE_USER_INFO':
      return { ...state, user_info: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
