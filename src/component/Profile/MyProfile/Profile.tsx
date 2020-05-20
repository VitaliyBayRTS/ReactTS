import React, { FunctionComponent } from 'react';
import s from './MyProfile.module.scss';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'
import UserPhoto from './../../../assets/img/user.jpeg';
import ProfileStatusWithHook from './ProfileStatusWithHook';

interface PropsInterface {
    profileInfo: any
    status: any
    updateUserStatusThunk: any
}

const MyProfile: FunctionComponent<PropsInterface> = (props) => {
    if(!props.profileInfo) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <div>
                    <img className={s.userPhoto} src={props.profileInfo.photos.large || UserPhoto} alt=""/>
                    <ProfileStatusWithHook status={props.status} updateUserStatusThunk={props.updateUserStatusThunk}/>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;