import React, { FunctionComponent } from 'react';
import MyProfile from './MyProfile/Profile';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { profileInfoType } from '../../types/types';

interface PropsInterface {
    profileInfo: profileInfoType | null,
    status: string,
    isOwner: boolean,
    updateUserStatusThunk: (status: string) => void,
    savePhoto: (photo: File) => void,
    saveProfileInfo: (profile: profileInfoType) => void
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