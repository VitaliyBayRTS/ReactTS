import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from './../../redux/authMeReducer';

interface MyProps {
    isAuth: any
    login: any
    logout: any
    profile: any
}

class HeaderContainer extends React.Component<MyProps>{

    render() {
        return <Header {...this.props}/>
    }
    
}

let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        profile: state.profilePage.profileInfo
    }
}

export default connect(mapStateToProps, { logout})(HeaderContainer);