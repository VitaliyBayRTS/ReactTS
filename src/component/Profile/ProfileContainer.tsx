import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfileThunk, getUserStatusThunk, 
    updateUserStatusThunk, savePhoto, saveProfileInfo} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/witAuthRedirect';
import { profileInfoType, photosType } from '../../types/types';
import { stateType } from '../../redux/redux-store';

type mapStateToPropsType = {
    profile: profileInfoType | null,
    autorizedUserId: number | null,
    status: string
}

type OwnProps = {
    match: any
}

type mapDispatchToPropsType = {
    getProfileThunk: (userId: number) => void,
    getUserStatusThunk: (userId: number) => void,
    updateUserStatusThunk: (status: string) => void,
    savePhoto: (photo: photosType) => void,
    saveProfileInfo: (profile: profileInfoType) => void
}

type MyProps = mapStateToPropsType & mapDispatchToPropsType & OwnProps;

type OwnStateType = {

}

class ProfileClass extends React.Component<MyProps> {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = this.props.autorizedUserId;
        this.props.getProfileThunk(userId);
        this.props.getUserStatusThunk(userId);
    }

    componentDidMount() {
        this.updateProfile();
    }
    componentDidUpdate(prevProps: MyProps, prevState: OwnStateType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile();
        }
        
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profile}
             status={this.props.status} updateUserStatusThunk={this.props.updateUserStatusThunk}
            isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto} 
            saveProfileInfo={this.props.saveProfileInfo}/>
    }
}


let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profileInfo,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId
    }
}

export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, OwnProps, stateType>
    (mapStateToProps, {getProfileThunk, getUserStatusThunk, updateUserStatusThunk, savePhoto, saveProfileInfo}),
    withRouter,
    withAuthRedirect
)(ProfileClass) as React.ComponentType<any>;