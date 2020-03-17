import React, { FunctionComponent } from 'react';
import { addMessageActionCreator, newMessageTextActionCreator } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { connect } from 'react-redux';

// interface PropsInterface {
//     store: any
// }

// const DialogContainer: FunctionComponent<PropsInterface> = (props) => {
//     let state = props.store.getState().dialogPage;

//     let sendMessage = () => {
//         props.store.dispatch(addMessageActionCreator())
//     }

//     let onChangeAction = (text: string | undefined) => {
//         props.store.dispatch(newMessageTextActionCreator(text));
//     }

//     return (
//         <Dialog sendMessage={sendMessage} 
//                 newMessageText={onChangeAction}
//                 newMessageTextValue={state.newMessageText}
//                 dialogData={state}/>
//     )
// }

let mapStateToProps = (state: any) => {
    return {
        newMessageTextValue: state.dialogPage.newMessageText,
        dialogData: state.dialogPage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage : () => {
            dispatch(addMessageActionCreator())
        },
        newMessageText: (text: string | undefined) => {
            dispatch(newMessageTextActionCreator(text));
        }
    }
}

const SuperDialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default SuperDialogContainer;