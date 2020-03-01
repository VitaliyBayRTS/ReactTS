import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

interface DialogItemInteface  {
    id: number
    name: string
}
const DialogItemData: Array<DialogItemInteface> = [
    {id: 1, name: "User 1"},
    {id: 2, name: "User 2"},
    {id: 3, name: "User 3"},
    {id: 4, name: "User 4"},
    {id: 5, name: "User 5"},
    {id: 6, name: "User 6"}
];

interface DialogMessageInterface {
    text: string
};
const DialogMessageData: Array<DialogMessageInterface> = [
    {text: "PrePrePre"},
    {text: "PrePrePrePrePrePrePrePrePre"},
    {text: "OMG, i am in YouTube"}
];
export interface DialogDataInterface {
    DialogItemData: Array<DialogItemInteface>
    DialogMessageData: Array<DialogMessageInterface>
}


export interface PostDataInterface {
    text: string
    name: string
    like: number
};

const PostData: Array<PostDataInterface> = [
    {text: "Super puper ninja 1", name: "Ninja 1", like: 4},
    {text: "OMG I'm in Internet", name: "Ninja 2", like: 2},
    {text: "Join to my way of samurai", name: "Ninja 3", like: 13}
];

const DialogData: DialogDataInterface = {
    DialogItemData, DialogMessageData
}

ReactDOM.render(<App dialogDate = {DialogData} postData={PostData}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
