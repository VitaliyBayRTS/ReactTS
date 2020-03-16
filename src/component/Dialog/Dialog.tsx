import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { addMessageActionCreator, newMessageTextActionCreator } from '../../redux/dialogReducer';
import { DialogDataInterface } from '../../redux/store';

interface PropsInterface {
    sendMessage: any
    newMessageText: any
    newMessageTextValue: any
    dialogData: any
}

const Dialog: FunctionComponent<PropsInterface> = (props) => {
    let DialogItemElemets = props.dialogData.DialogItemData.map( (u: any) =>  <DialogItem id={u.id} name={u.name}/>);
    let DialogMessageElemets = props.dialogData.DialogMessageData.map( (m: any)=> <DialogMessage text={m.text}/>);

    let componentElement = React.createRef<HTMLTextAreaElement>()

    let sendMessage = () => {
        props.sendMessage();
        // props.dispatch(addMessageActionCreator())
    }

    let onChangeAction = () => {
        props.newMessageText(componentElement.current?.value);
        // props.dispatch(newMessageTextActionCreator(componentElement.current?.value));
    }

    return (
        <div className={s.dialogBox}>            
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
                <div>
                    <textarea ref={componentElement} onChange={onChangeAction} value={props.newMessageTextValue}/>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;