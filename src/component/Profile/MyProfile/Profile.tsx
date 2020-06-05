import React, { FunctionComponent, useState } from 'react';
import s from './MyProfile.module.scss';
import Preloader from '../../common/Preloader/Preloader';
import UserPhoto from './../../../assets/img/user.jpeg';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import ProfileDataForm from './ProfileDataForm';

interface PropsInterface {
    profileInfo: any
    status: any
    updateUserStatusThunk: any
    isOwner: any
    savePhoto: any
    saveProfileInfo: any
}

const MyProfile: FunctionComponent<PropsInterface> = ({profileInfo, ...props}) => {

    let [editMode, setEditMode] = useState(false);

    if(!profileInfo) {
        return <Preloader />
    }

    const selectedPhoto = (e: any) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (dataForm: any) => {
        props.saveProfileInfo(dataForm).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div>
                <div>
                    <img className={s.userPhoto} src={profileInfo.photos.large || UserPhoto} alt=""/>
                    {props.isOwner && <input type="file" onChange={selectedPhoto}/>}
                    { editMode 
                        ? <ProfileDataForm initialValues={profileInfo} onSubmit={onSubmit} /> 
                        : <ProfileData profileInfo={profileInfo} isOwner={props.isOwner} changeEditMode={() => {setEditMode(true)}}/> }
                    <ProfileStatusWithHook status={props.status} updateUserStatusThunk={props.updateUserStatusThunk}/>
                </div>
            </div>
        </div>
    )
}

const ProfileData: FunctionComponent<any> = ({profileInfo, isOwner, changeEditMode}) => {
    return <div>
        {isOwner && <button onClick={changeEditMode}>Edit Information</button>}
        <div>
            <b>Full Name: </b> {profileInfo.fullName}
        </div>
        <div>
            <b>About me: </b> {profileInfo.aboutMe}
        </div>
        <div>
            <b>Looking for a job: </b> {profileInfo.lookingForAJob ? "Yes" : "No"}
        </div>
        <div>
            <b>My profesional skills: </b> {profileInfo.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(profileInfo.contacts).map((key: any) => {
                return <Contacts key={key} contactKey={key} contactValue={profileInfo.contacts[key]}/>
            })}
        </div>
    </div>
}


const Contacts: FunctionComponent<any> = ({contactKey, contactValue}) => {
    return <div className={s.contactItem}>
        <span><b>{contactKey}: </b>{contactValue}</span>
    </div>
}

export default MyProfile;