import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/redux-store';
import App from './App';

let rerenderEntireTree = (state: any): void => {
    ReactDOM.render(<App store={store}/>, 
        document.getElementById('root'));
}
rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});