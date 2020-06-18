import React, { FunctionComponent } from 'react';
import s from './DialogItem.module.scss';
import { NavLink } from 'react-router-dom';
import userFoto from '../../../assets/img/user.jpeg';

interface PropsDialogItem {
    id: number
    name: string
}

const DialogItem: FunctionComponent<PropsDialogItem> = (props) => {

    let path = '/dialog/' + props.id;

    return <div className={s.dialogItemBox}>
        <img src={userFoto} alt=""/>
        <NavLink to={path} className={s.user} activeClassName={s.selected}>{props.name}</NavLink> 
    </div>
}

export default DialogItem;