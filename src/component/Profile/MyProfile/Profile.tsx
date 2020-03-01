import React, { FunctionComponent } from 'react';
import s from './MyProfile.module.scss';

interface PropsInterface {

}

const MyProfile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <div >
                <div>
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20191010/pngtree-blue-glitter-dreamy-background-image_317748.jpg" alt="" />
                </div>
                <div>
                    ava + description
                </div>
            </div>
        </div>
    )
}

export default MyProfile;