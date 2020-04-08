import React, { FunctionComponent } from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';

interface myProps {
    isAuth: any
    login: any
}

const Header: FunctionComponent<myProps> = (props) => {
    return (
        <div className={s.header}>
             <header>
                <img src="https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg" alt=""/>
                <div>
                    {props.isAuth ? props.login : <NavLink to="/login">Login</NavLink>}
                </div>
            </header>
        </div>
    )
}

export default Header;