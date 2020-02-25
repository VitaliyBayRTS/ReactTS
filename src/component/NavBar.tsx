import React from 'react';
import '../App.scss';

function NavBar(): any {
    return (
        <div className="nav">
            <nav>
                <ul>
                    <li>Profile</li>
                    <li>Messages</li>
                    <li>News</li>
                    <li>Music</li>
                    <li>Settings</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;