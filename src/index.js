import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import squaresReducer from './reducers/squares-reducer';

const store = createStore(squaresReducer);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
)