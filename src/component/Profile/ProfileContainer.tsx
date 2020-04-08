import React, { FunctionComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo, getProfileThunk} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';

interface MyProps {
    setPofileInfo: any
    profile: any
    match: any
    getProfileThunk: any
}

class ProfileClass extends React.Component<MyProps> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = 2;
        this.props.getProfileThunk(userId);
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profile}/>
    }
}

let mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profileInfo
    }
}

let router = withRouter<any, any>(ProfileClass);

let ProfileContainer = connect(mapStateToProps, {setPofileInfo, getProfileThunk})(router);
export default ProfileContainer;