import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface PropsDialogItem {
    id: number
    name: string
}

const DialogItem: FunctionComponent<PropsDialogItem> = (props) => {

    let path = '/dialog/' + props.id;

    return <div>
         <NavLink to={path} >{props.name}</NavLink> 
    </div>
}

export default DialogItem;