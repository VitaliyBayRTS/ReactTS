import React, { FunctionComponent }from 'react';
import {Field, reduxForm} from 'redux-form';
import { Input } from '../../utilities/ReduxForm/Form';
import { required } from '../../utilities/validator/validator';
import { Redirect } from 'react-router-dom';
import s from './../../utilities/ReduxForm/ReduxForm.module.scss';


let LoginForm: FunctionComponent<any> = (props) => {
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
            <div>
                <button>Login</button>
            </div> 
        </form>
    )
}


let LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

interface propsInter {
    login: any
    isAuth: any
}

let Login: FunctionComponent<propsInter> = (props) => {
    let onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if(props.isAuth) return <Redirect to="/profile" />

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login;