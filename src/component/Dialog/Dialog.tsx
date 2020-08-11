import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { Field, reduxForm } from 'redux-form';
import { maxLength } from '../../utilities/validator/validator';
import { Textarea } from '../../utilities/ReduxForm/Form';
import { dialogDataType } from '../../types/types';

type PropsInterface = {
    sendMessage: (value: string) => void
    dialogData: dialogDataType
}

const Dialog: FunctionComponent<PropsInterface> = (props) => {
    let DialogItemElemets = props.dialogData.DialogItemData.map((u: any) => <DialogItem key={u.id} id={u.id} name={u.name} />);
    let DialogMessageElemets = props.dialogData.DialogMessageData.map((m: any) => <DialogMessage key={m.id} text={m.text} />);

    let sendMessage = (value: any) => {
        props.sendMessage(value.messageBody);
    }

    return (
        <div className={s.dialogBox}>
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
                <MessageForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}

let maxLength10 = maxLength(10);

const ReduxMessageForm: FunctionComponent<any> = (props) => {
    return (<div>
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="messageBody" validate={[maxLength10]}/>
            <button>Send Message</button>
        </form>
    </div>);
} 

let MessageForm = reduxForm({form: "message"})(ReduxMessageForm);

export default Dialog;