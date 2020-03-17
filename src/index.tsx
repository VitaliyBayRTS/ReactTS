import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/redux-store';
import { Provider } from "react-redux";
import App from './App';

let rerenderEntireTree = (state: any): void => {
    ReactDOM.render(
        <Provider store={store}>
            <App store={store} />
        </Provider>
        ,
        document.getElementById('root'));
}
rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});