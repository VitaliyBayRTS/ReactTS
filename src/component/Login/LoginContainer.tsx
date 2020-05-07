import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { login } from './../../redux/authMeReducer';


class LoginContainer extends React.Component<any> {
    render() {
        return <Login login={this.props.login} isAuth={this.props.isAuth}/>
    }
}

let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,{login})(LoginContainer);