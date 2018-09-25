import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/game';

import { createStore } from "redux"


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <Game  />
  </Provider>, document.getElementById('root'));
registerServiceWorker();






