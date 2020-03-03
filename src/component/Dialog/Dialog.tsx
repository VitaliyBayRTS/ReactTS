import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { DialogDataInterface } from '../../redux/state';

interface PropsInterface {
    dialogData: DialogDataInterface
    addMessage: any
}

const Dialog: FunctionComponent<PropsInterface> = (props) => {
    let DialogItemElemets = props.dialogData.DialogItemData.map( u =>  <DialogItem id={u.id} name={u.name}/>);
    let DialogMessageElemets = props.dialogData.DialogMessageData.map( m => <DialogMessage text={m.text}/>);

    let componentElement = React.createRef<HTMLTextAreaElement>()

    let sendMessage = () => {
        let text: string | undefined = componentElement.current?.value;
        props.addMessage(text);
    }

    return (
        <div className={s.dialogBox}>            
            <div className={s.dialogItem}>
                {DialogItemElemets}
            </div>
            <div className={s.dialogMessage}>
                {DialogMessageElemets}
                <div>
                    <textarea ref={componentElement}></textarea>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;