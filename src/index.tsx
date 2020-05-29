import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/redux-store';
import { Provider } from "react-redux";
import App from './App';
import SocialApp from './App';

let rerenderEntireTree = (state: any): void => {
    ReactDOM.render(<SocialApp />, document.getElementById('root'));
}
rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});