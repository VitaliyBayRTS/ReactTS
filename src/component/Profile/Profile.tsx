import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../..';

interface PropsInterface {
    postData: Array<PostDataInterface>
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile />
            <MyPosts postData={props.postData}/>
        </div>
    )
}

export default Profile;