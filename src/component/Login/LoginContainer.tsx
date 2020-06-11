import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { login } from './../../redux/authMeReducer';
import { stateType } from '../../redux/redux-store';

type mapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string
}

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
}

type OwnProps = {

}

type PropsType = mapStateToPropsType & mapDispatchToPropsType & OwnProps

class LoginContainer extends React.Component<PropsType> {
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

export default connect<mapStateToPropsType, mapDispatchToPropsType, OwnProps, stateType>
(mapStateToProps,{login})(LoginContainer);