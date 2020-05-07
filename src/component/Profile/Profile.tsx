import React, { FunctionComponent } from 'react';
import MyProfile from './MyProfile/Profile';
import MyPostsContainer from './MyPosts/MyPostsContainer';

interface PropsInterface {
    profileInfo: any
    status: any
    updateUserStatusThunk: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile profileInfo={props.profileInfo} status={props.status} updateUserStatusThunk={props.updateUserStatusThunk}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;