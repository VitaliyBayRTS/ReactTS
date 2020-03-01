import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import { NavLink } from 'react-router-dom';

interface PropsInterface {

}

interface PropsDialogItem {
    id: number
    name: string
}

interface PropsMessage {
    text: string
}

const DialogItem: FunctionComponent<PropsDialogItem> = (props) => {

    let path = '/dialog/' + props.id;

    return <div>
         <NavLink to={path} >{props.name}</NavLink> 
    </div>
}

const DialogMessage: FunctionComponent<PropsMessage> = (props) => {
    return <div>
        {props.text}
    </div>
}
/*
    Block for Dialog Items Elemets (interface, Array of users info (Objects), mapping of Array)
*/
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
let DialogItemElemets = DialogItemData.map( u =>  <DialogItem id={u.id} name={u.name}/>);

/*
    Block for Dialog Message Elemets (interface, Array of message info (Objects), mapping of Array)
*/
interface DialogMessageInterface {
    text: string
};
const DialogMessageData: Array<DialogMessageInterface> = [
    {text: "PrePrePre"},
    {text: "PrePrePrePrePrePrePrePrePre"},
    {text: "OMG, i am in YouTube"}
];
let DialogMessageElemets = DialogMessageData.map( m => <DialogMessage text={m.text}/>);


const Dialog: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div className={s.dialogBox}>            
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
            </div>
        </div>
    )
}

export default Dialog;