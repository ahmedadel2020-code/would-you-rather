import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middleware))


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

