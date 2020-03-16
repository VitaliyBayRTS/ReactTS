import React, { FunctionComponent } from 'react';
import { newNoteTextActionCreator, addNoteActionCreator } from '../../../redux/sidebarReducer';
import Nots from './Nots';

interface notsInterface  {
    store: any
}

const NotsContainer: FunctionComponent<notsInterface> = (props) => {
    
    let onChangeAction = (text: string | undefined)  => {
        props.store.dispatch(newNoteTextActionCreator(text));
    }
    
    let addNote = () => {
        props.store.dispatch(addNoteActionCreator());
    }
    return(
        <Nots sidebarData={props.store.getState().sidebarPage.sidebarData} 
            newNoteText={onChangeAction}
            addNote={addNote}
            newNoteTextValue={props.store.getState().sidebarPage.newNoteText}/>
    );
}

export default NotsContainer;