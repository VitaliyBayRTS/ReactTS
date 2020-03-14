import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/state';
import App from './App';
import state from './redux/state';
interface PropsInterface {
    state: any
}


let rerenderEntireTree = (state: any): void => {
    ReactDOM.render(<App store={store}/>, 
        document.getElementById('root'));
}

rerenderEntireTree(store.getState);

store.subscriber(rerenderEntireTree);