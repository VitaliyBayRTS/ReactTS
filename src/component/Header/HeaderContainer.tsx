import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from './../../redux/authMeReducer';

interface MyProps {
    isAuth: any
    login: any
    logout: any
}

class HeaderContainer extends React.Component<MyProps>{

    render() {
        return <Header {...this.props}/>
    }
    
}

let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { logout})(HeaderContainer);