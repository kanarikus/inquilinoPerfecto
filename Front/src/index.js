import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,combineReducers, applyMiddleware} from 'redux'
import loginReducer from './store/loginReducer'
import registerReducer from './store/registerReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
})

const localStorageMiddleware = store => next => action =>{
  let result = next(action)
  localStorage.setItem("session",JSON.stringify(store.getState()))
  return result
}

const saved =localStorage.getItem("session")
const initialStore = saved ? JSON.parse(saved) : undefined
const store = createStore(rootReducer, initialStore,applyMiddleware(localStorageMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
