import React, { FunctionComponent } from 'react';
import NotsItems from './NotsItems/NotsItems';

interface notsInterface  {
    addNote: any
    newNoteText: any
    newNoteTextValue: any
    sidebarData: any
}

const Nots: FunctionComponent<notsInterface> = (props) => {
    let noteItems = props.sidebarData.map((n: any) => <NotsItems key={n.id} text={n.text}/>)
    let componentRef = React.createRef<HTMLTextAreaElement>();
    
    let addNote = () => {
        props.addNote();
    }

    let onChangeAction = () => {
        props.newNoteText(componentRef.current?.value);
    }
   
    return(
        <div>
            <div>
                {noteItems}
            </div>
            <div>
                <textarea ref={componentRef} onChange={onChangeAction} value={props.newNoteTextValue}></textarea>
                <button onClick={addNote}>Guardar</button>
            </div>
            
        </div>
    );
}

export default Nots;