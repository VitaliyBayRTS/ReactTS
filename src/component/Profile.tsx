import React from 'react';
import s from './Profile.module.scss';

function Profile(): any {
    return (
        <div className={s.content}>
            <div >
                <div>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20191010/pngtree-blue-glitter-dreamy-background-image_317748.jpg" alt="" />
                </div>
                <div>
                    ava + description
                </div>
                <div>
                    My post
                </div>
                <div>
                    New Post
                </div>
                <div>
                    <div className={s.item}>
                        Post 1
                    </div>
                    <div className={s.item}>
                        Post 1
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;