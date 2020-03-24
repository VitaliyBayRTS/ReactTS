import React, { FunctionComponent } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {setPofileInfo} from '../../redux/profileReducer';
import Axios from 'axios';
import Preloader from '../common/Preloader/Preloader';

interface MyProps {
    setPofileInfo: any
    profile: any
}

class ProfileClass extends React.Component<MyProps> {

    componentDidMount() {
        Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then((response: any) => {
            this.props.setPofileInfo(response.data);
        })
    }

    render() {
        return <>
            {/* {!this.props.profile ? <Preloader /> : */}
            <Profile {...this.props} profileInfo={this.props.profile}/>
        </>
    }
}

let mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile
    }
}

let ProfileContainer = connect(mapStateToProps, {setPofileInfo })(ProfileClass);
export default ProfileContainer;