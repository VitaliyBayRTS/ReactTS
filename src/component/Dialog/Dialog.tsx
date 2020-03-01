import React, { FunctionComponent } from 'react';
import s from './Dialog.module.scss';
import DialogItem from './DialogItem/DialogItem';
import DialogMessage from './DialogMessages/DialogMessage';
import { DialogDataInterface } from '../..';

interface PropsInterface {
    dialogData: DialogDataInterface
}

const Dialog: FunctionComponent<PropsInterface> = ({dialogData}) => {
    let DialogItemElemets = dialogData.DialogItemData.map( u =>  <DialogItem id={u.id} name={u.name}/>);
    let DialogMessageElemets = dialogData.DialogMessageData.map( m => <DialogMessage text={m.text}/>);

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