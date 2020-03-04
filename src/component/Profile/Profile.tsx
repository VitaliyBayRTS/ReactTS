import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../../redux/state';

interface PropsInterface {
    state: any
    addPost: any
    changePostText: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    // debugger;
    return (
        <div>
            <MyProfile />
            <MyPosts state={props.state}
                    addPost={props.addPost}
                    changePostText={props.changePostText}/>
        </div>
    )
}

export default Profile;