import React, { FunctionComponent } from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import MyProfile from './MyProfile/Profile';
import { PostDataInterface } from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

interface PropsInterface {
    state: any
    dispatch: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile />
            <MyPostsContainer state={props.state}
                    dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;