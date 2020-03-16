import React, { FunctionComponent } from 'react';
import { addMessageActionCreator, newMessageTextActionCreator } from '../../redux/dialogReducer';
import Dialog from './Dialog';

interface PropsInterface {
    store: any
}

const DialogContainer: FunctionComponent<PropsInterface> = (props) => {
    let state = props.store.getState().dialogPage;

    let sendMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    let onChangeAction = (text: string | undefined) => {
        props.store.dispatch(newMessageTextActionCreator(text));
    }

    return (
        <Dialog sendMessage={sendMessage} 
                newMessageText={onChangeAction}
                newMessageTextValue={state.newMessageText}
                dialogData={state}/>
    )
}

export default DialogContainer;