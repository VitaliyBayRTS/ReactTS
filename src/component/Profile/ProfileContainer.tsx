import React, { FunctionComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo, getProfileThunk} from '../../redux/profileReducer';
import { withRouter, Redirect } from 'react-router-dom';

interface MyProps {
    setPofileInfo: any
    profile: any
    match: any
    getProfileThunk: any
    isAuth: any
}

class ProfileClass extends React.Component<MyProps> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = 2;
        this.props.getProfileThunk(userId);
    }

    render() {
        if(!this.props.isAuth) return <Redirect to="/login"/>
        return <Profile {...this.props} profileInfo={this.props.profile}/>
    }
}

let mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profileInfo,
        isAuth: state.auth.isAuth
    }
}

let router = withRouter<any, any>(ProfileClass);

let ProfileContainer = connect(mapStateToProps, {setPofileInfo, getProfileThunk})(router);
export default ProfileContainer;