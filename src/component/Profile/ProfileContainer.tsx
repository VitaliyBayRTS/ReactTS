import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo, getProfileThunk, getUserStatusThunk, updateUserStatusThunk} from '../../redux/profileReducer';
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
}

class ProfileClass extends React.Component<MyProps> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId =  this.props.autorizedUserId;
        this.props.getProfileThunk(userId);
        this.props.getUserStatusThunk(userId);
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profile}
             status={this.props.status} updateUserStatusThunk={this.props.updateUserStatusThunk}/>
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
    connect(mapStateToProps, {setPofileInfo, getProfileThunk, getUserStatusThunk, updateUserStatusThunk}),
    withRouter,
    withAuthRedirect
)(ProfileClass) as React.ComponentType<any>;