import React, { FunctionComponent } from 'react';
import { newNoteTextActionCreator, addNoteActionCreator } from '../../../redux/sidebarReducer';
import Nots from './Nots';
import { connect } from 'react-redux';

// interface notsInterface  {
//     store: any
// }

// const NotsContainer: FunctionComponent<notsInterface> = (props) => {
    
//     let onChangeAction = (text: string | undefined)  => {
//         props.store.dispatch(newNoteTextActionCreator(text));
//     }
    
//     let addNote = () => {
//         props.store.dispatch(addNoteActionCreator());
//     }
//     return(
//         <Nots sidebarData={props.store.getState().sidebarPage.sidebarData} 
//             newNoteText={onChangeAction}
//             addNote={addNote}
//             newNoteTextValue={props.store.getState().sidebarPage.newNoteText}/>
//     );
// }

let mapStateToProps = (state: any) => {
    return {
        sidebarData: state.sidebarPage.sidebarData,
        newNoteTextValue: state.sidebarPage.newNoteText
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addNote: () => {
            dispatch(addNoteActionCreator());
        },
        newNoteText: (text: string | undefined) => {
            dispatch(newNoteTextActionCreator(text));
        }
    }
}

const SuperNotsContainer = connect(mapStateToProps, mapDispatchToProps)(Nots);

export default SuperNotsContainer;