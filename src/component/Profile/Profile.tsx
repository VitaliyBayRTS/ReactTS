import React, { FunctionComponent } from 'react';
import MyProfile from './MyProfile/Profile';
import MyPostsContainer from './MyPosts/MyPostsContainer';

interface PropsInterface {
    profileInfo: any
    status: any
    updateUserStatusThunk: any
    isOwner: any
    savePhoto: any
    saveProfileInfo: any
}

const Profile: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <MyProfile savePhoto={props.savePhoto} 
                isOwner={props.isOwner} 
                profileInfo={props.profileInfo} 
                status={props.status} 
                updateUserStatusThunk={props.updateUserStatusThunk}
                saveProfileInfo={props.saveProfileInfo}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;