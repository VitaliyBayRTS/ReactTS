import React, { FunctionComponent } from 'react';
import { addMessageActionCreator, newMessageTextActionCreator } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { connect } from 'react-redux';

let mapStateToProps = (state: any) => {
    return {
        newMessageTextValue: state.dialogPage.newMessageText,
        dialogData: state.dialogPage,
        isAuth: state.auth.isAuth
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