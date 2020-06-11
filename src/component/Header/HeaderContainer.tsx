import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from './../../redux/authMeReducer';
import { stateType } from '../../redux/redux-store';

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
    profileImage: string | null
}

type mapDipatchToPropsType = {
    logout: () => void
}

type OwnProps = {

}

type MyProps = mapStateToPropsType & mapDipatchToPropsType & OwnProps

class HeaderContainer extends React.Component<MyProps>{

    render() {
        return <Header {...this.props}/>
    }
    
}

let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        profileImage: state.auth.userImage
    }
}

export default connect<mapStateToPropsType, mapDipatchToPropsType, OwnProps, stateType>
(mapStateToProps, { logout})(HeaderContainer);