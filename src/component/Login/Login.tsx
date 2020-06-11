import React, { FunctionComponent }from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import { Input } from '../../utilities/ReduxForm/Form';
import { required } from '../../utilities/validator/validator';
import { Redirect } from 'react-router-dom';
import s from './../../utilities/ReduxForm/ReduxForm.module.scss';

interface IFormProps {
    handleSubmit: () => void
    error: string
}

interface IDispatchProps {
    captchaUrl: string
}

let LoginForm = (props: IDispatchProps & InjectedFormProps<IFormProps, IDispatchProps>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div onSubmit={props.handleSubmit}>
                <Field placeholder="Email" name="email" component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder="Password" suggested="current-password" name="password" component={Input} type="password" validate={[required]}/>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component={Input}/> Remember me
            </div>
            {props.error && <div className={s.commonError}> {props.error} </div>}
            {props.captchaUrl && <img src={props.captchaUrl} alt="asd"/>}
            { props.captchaUrl && <div>
                <Field placeholder="Input symbols of image" name="captcha" component={Input} validate={[required]}/>
            </div> }
            <div>
                <button>Login</button>
            </div> 
        </form>
    )
}


let LoginReduxForm = reduxForm<IFormProps, IDispatchProps>({form: 'login'})(LoginForm);

interface propsInter {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
    isAuth: boolean
    captchaUrl: string
}

let Login: FunctionComponent<propsInter> = (props) => {
    let onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth) return <Redirect to="/profile" />

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

export default Login;