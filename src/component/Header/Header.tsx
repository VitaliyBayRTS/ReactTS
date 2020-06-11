import React, { FunctionComponent } from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import cub from '../../assets/img/cub.png';

interface myProps {
    isAuth: boolean
    login: string | null
    logout: () => void
    profileImage: string | null
}



const Header: FunctionComponent<myProps> = (props) => {
    return (
        <div className={s.header}>
             <header>
                {props.isAuth && props.profileImage ?
                <div className={s.userBox}>  
                    <img src={props.profileImage} alt=""/>
                    <span>{props.login}</span>
                </div> : <div></div> }
                <div>
                    <img src={cub} alt=""/>
                </div>
                <div>
                    {props.isAuth ? <button onClick={props.logout}>LogOut</button> 
                    : <div><NavLink to="/login">Login</NavLink></div>}
                </div>
            </header>
        </div>
    )
}

export default Header;