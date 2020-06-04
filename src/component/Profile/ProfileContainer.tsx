import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo, getProfileThunk, getUserStatusThunk, 
    updateUserStatusThunk, savePhoto, saveProfileInfo} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/witAuthRedirect';

interface MyProps {
    setPofileInfo: any
    profile: any
    match: any
    getProfileThunk: any
    isAuth: any
    getUserStatusThunk: any
    status: any
    updateUserStatusThunk: any
    autorizedUserId: any
    savePhoto: any
    saveProfileInfo: any
}

class ProfileClass extends React.Component<MyProps> {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) userId =  this.props.autorizedUserId;
        this.props.getProfileThunk(userId);
        this.props.getUserStatusThunk(userId);
    }

    componentDidMount() {
        this.updateProfile();
    }
    componentDidUpdate(prevProps: MyProps, prevState: any, snapshot: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile();
        }
        
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profile}
             status={this.props.status} updateUserStatusThunk={this.props.updateUserStatusThunk}
            isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhoto} saveProfileInfo={this.props.saveProfileInfo}/>
    }
}


let mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profileInfo,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId
    }
}

export default compose(
    connect(mapStateToProps, {setPofileInfo, getProfileThunk, getUserStatusThunk, updateUserStatusThunk, savePhoto, saveProfileInfo}),
    withRouter,
    withAuthRedirect
)(ProfileClass) as React.ComponentType<any>;