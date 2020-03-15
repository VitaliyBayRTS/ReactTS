import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../../redux/store';

interface PropsInterface {
    state: any
    dispatch: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    // debugger;
    return (
        <div>
            <MyProfile />
            <MyPosts state={props.state}
                    dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;