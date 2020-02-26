import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';

interface PropsInterface {

}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div className={s.content}>
            <div >
                <div>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20191010/pngtree-blue-glitter-dreamy-background-image_317748.jpg" alt="" />
                </div>
                <div>
                    ava + description
                </div>
                <MyPosts />
            </div>
        </div>
    )
}

export default Profile;