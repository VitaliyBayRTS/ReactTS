import React, { FunctionComponent } from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import cub from '../../assets/img/cub.png';

interface myProps {
    isAuth: any
    login: any
    logout: any
    profile: any
}



const Header: FunctionComponent<myProps> = (props) => {
    
    if(props.profile == null) {
        return <Preloader />
    }

    return (
        <div className={s.header}>
             <header>
                {props.isAuth && 
                <div className={s.userBox}>  
                    <img src={props.profile.photos.small} alt=""/>
                    <span>{props.login}</span>
                </div>}
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