import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { Redirect } from 'react-router-dom';

interface PropsInterface {
    sendMessage: any
    newMessageText: any
    newMessageTextValue: any
    dialogData: any
    isAuth: any
}

const Dialog: FunctionComponent<PropsInterface> = (props) => {
    let DialogItemElemets = props.dialogData.DialogItemData.map((u: any) => <DialogItem key={u.id} id={u.id} name={u.name} />);
    let DialogMessageElemets = props.dialogData.DialogMessageData.map((m: any) => <DialogMessage key={m.id} text={m.text} />);

    let componentElement = React.createRef<HTMLTextAreaElement>()

    let sendMessage = () => {
        props.sendMessage();
    }

    let onChangeAction = () => {
        props.newMessageText(componentElement.current?.value);
    }

    if(!props.isAuth) {
        return <Redirect to="/login"/>
    }
    return (
        <div className={s.dialogBox}>
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
                <div>
                    <textarea ref={componentElement} onChange={onChangeAction} value={props.newMessageTextValue} />
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;