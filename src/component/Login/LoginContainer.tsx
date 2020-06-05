import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { login } from './../../redux/authMeReducer';


class LoginContainer extends React.Component<any> {
    render() {
        return <Login login={this.props.login} isAuth={this.props.isAuth} captchaUrl={this.props.captchaUrl}/>
    }
}

let mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps,{login})(LoginContainer);