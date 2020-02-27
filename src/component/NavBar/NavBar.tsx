import React, { FunctionComponent, Props } from 'react';
import s from './NavBar.module.scss';
import { Link } from 'react-router-dom';

interface PropsInterface {

}


const NavBar: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div className={s.nav}>
            <nav>
                <ul>
                    <li>
                        <Link to="/profile" className={`${s.item} ${s.active}`}>Profile</Link>
                    </li>
                    <li>
                        <Link to="/dialog" className={s.item}>Messages</Link>
                    </li>
                    <li>
                        <Link to="/#" className={s.item}>News</Link>
                    </li>
                    <li>
                        <Link to="/#" className={s.item}>Music</Link>
                    </li>
                    <li>
                        <Link to="/#" className={s.item}>Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;