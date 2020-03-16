import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

interface PropsInterface {
    store: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile />
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;