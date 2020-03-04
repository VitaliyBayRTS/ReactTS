import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
// import state from './state';
import {addPost, addMessage, changeMessageText, changePostText} from './state';
interface PropsInterface {
    state: any
}


export let rerenderEntireTree = (state: any): void => {
    ReactDOM.render(<App state={state} 
                    addPost={addPost} 
                    addMessage={addMessage} 
                    changeMessageText={changeMessageText}
                    changePostText={changePostText}/>, 
        document.getElementById('root'));
}