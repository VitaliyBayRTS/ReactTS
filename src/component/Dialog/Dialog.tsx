import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { DialogDataInterface } from '../../redux/state';

interface PropsInterface {
    dialogData: DialogDataInterface
    addMessage: any
    changeMessageText: any
}

const Dialog: FunctionComponent<PropsInterface> = (props) => {
    // debugger;
    let DialogItemElemets = props.dialogData.DialogItemData.map( u =>  <DialogItem id={u.id} name={u.name}/>);
    let DialogMessageElemets = props.dialogData.DialogMessageData.map( m => <DialogMessage text={m.text}/>);

    let componentElement = React.createRef<HTMLTextAreaElement>()

    let sendMessage = () => {
        props.addMessage();
    }

    let onChangeAction = () => {
        props.changeMessageText(componentElement.current?.value);
    }

    return (
        <div className={s.dialogBox}>            
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
                <div>
                    <textarea ref={componentElement} onChange={onChangeAction} value={props.dialogData.newMessageText}/>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;