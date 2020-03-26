import React, { FunctionComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo} from '../../redux/profileReducer';
import Axios from 'axios';
import Preloader from '../common/Preloader/Preloader';
import { withRouter } from 'react-router-dom';

interface MyProps {
    setPofileInfo: any
    profile: any
    match: any
}

class ProfileClass extends React.Component<MyProps> {

    componentDidMount() {
        console.log(this)
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then((response: any) => {
            this.props.setPofileInfo(response.data);
        })
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
let mapDispatchToProps = (dispatch: any) => {
    return {
        setPofileInfo: (profile: any) => {
            dispatch(setPofileInfo({ type: setPofileInfo, profile}))
        }
    }
}

let router = withRouter<any, any>(ProfileClass);

let ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(router);
export default ProfileContainer;