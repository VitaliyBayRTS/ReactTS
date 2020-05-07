import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/witAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state: any) => {
    return {
        dialogData: state.dialogPage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage : (value: string) => {
            dispatch(addMessageActionCreator(value))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
withAuthRedirect
)
(Dialog) as React.ComponentType<any>;;