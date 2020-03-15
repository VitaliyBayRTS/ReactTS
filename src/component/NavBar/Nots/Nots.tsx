import React, { FunctionComponent } from 'react';
import NotsItems from './NotsItems/NotsItems';
import { newNoteTextActionCreator, addNoteActionCreator } from '../../../redux/sidebarReducer';

interface notsInterface  {
    state: any
    dispatch: any
}

const Nots: FunctionComponent<notsInterface> = (props) => {
    // debugger;
    let noteItems = props.state.sidebarData.map((n: any) => <NotsItems text={n.text}/>)
    let componentRef = React.createRef<HTMLTextAreaElement>();
    
    let onChangeAction = () => {
        props.dispatch(newNoteTextActionCreator(componentRef.current?.value));
    }
    
    let addNote = () => {
        props.dispatch(addNoteActionCreator());
    }
    return(
        <div>
            <div>
                {noteItems}
            </div>
            <div>
                <textarea ref={componentRef} onChange={onChangeAction} value={props.state.newNoteText}></textarea>
                <button onClick={addNote}>Guardar</button>
            </div>
            
        </div>
    );
}

export default Nots;