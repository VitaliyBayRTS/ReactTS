import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../../redux/state';

interface PropsInterface {
    state: any
    addPost: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile />
            <MyPosts state={props.state.PostData}
                    addPost={props.addPost}/>
        </div>
    )
}

export default Profile;