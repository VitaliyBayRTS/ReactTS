import React from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/cub.png';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../redux/usersSelectors';
import { stateType } from '../../redux/redux-store';
import { logout as logoutThunk } from './../../redux/authMeReducer';


const Header: React.FC = () => {

    const isAuthValue = useSelector(isAuth)
    const login = useSelector((state: stateType) => state.auth.login)
    const profileImage = useSelector((state: stateType) => state.auth.userImage)

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={s.header}>
             <header>
                {isAuthValue && profileImage ?
                <div className={s.userBox}>  
                    <img src={profileImage} alt=""/>
                    <span>{login}</span>
                </div> : <div></div> }
                <div>
                    <img src={logo} alt=""/>
                </div>
                <div>
                    {isAuthValue ? <button onClick={logout}>LogOut</button> 
                    : <div><NavLink to="/login">Login</NavLink></div>}
                </div>
            </header>
        </div>
    )
}

export default Header;