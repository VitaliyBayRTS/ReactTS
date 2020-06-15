import React from 'react';
import { DialogActions } from '../../redux/dialogReducer';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/witAuthRedirect';
import { compose } from 'redux';
import { stateType } from '../../redux/redux-store';
import { dialogDataType } from '../../types/types';

type MapStateToPropsType = {
    dialogData: dialogDataType
}

type MapDispatchToPropsType = {
    sendMessage: (value: string) => void
}

type OwnProps ={ 

}

let mapStateToProps = (state: stateType): MapStateToPropsType => {
    return {
        dialogData: state.dialogPage
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        sendMessage : (value: string) => {
            dispatch(DialogActions.addMessageActionCreator(value))
        }
    }
}


export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, stateType>(mapStateToProps, mapDispatchToProps),
withAuthRedirect
)
(Dialog) as React.ComponentType<any>;