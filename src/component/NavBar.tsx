import React from 'react';
import s from './NavBar.module.scss';

function NavBar(): any {
    return (
        <div className={s.nav}>
            <nav>
                <ul>
                    <li className={`${s.item} ${s.active}`}>Profile</li>
                    <li className={s.item}>Messages</li>
                    <li className={s.item}>News</li>
                    <li className={s.item}>Music</li>
                    <li className={s.item}>Settings</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;