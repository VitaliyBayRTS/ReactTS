import React, { FunctionComponent } from 'react';
import { addMessageActionCreator, newMessageTextActionCreator } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/witAuthRedirect';
import { compose } from 'redux';

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

export default compose(connect(mapStateToProps, mapDispatchToProps),
withAuthRedirect
)
(Dialog) as React.ComponentType<any>;;