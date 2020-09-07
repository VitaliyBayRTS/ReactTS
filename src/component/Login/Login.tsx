import React, { FunctionComponent }from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import { Input } from '../../utilities/ReduxForm/Form';
import { required } from '../../utilities/validator/validator';
import { Redirect } from 'react-router-dom';
import s from './../../utilities/ReduxForm/ReduxForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from '../../redux/usersSelectors';
import {stateType} from '../../redux/redux-store';
import { login } from '../../redux/authMeReducer';

type IFormProps = {
    handleSubmit: () => void,
    error: string,
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type IDispatchProps = {
    captchaUrl: string | null
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
            {props.captchaUrl && <img src={props.captchaUrl} className={s.captchaImg} alt="captch"/>}
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

type formDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}



export const Login: FunctionComponent = () => {

    const isAuthValue = useSelector(isAuth)
    const captchaUrl = useSelector((state: stateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()

    let onSubmit = (formData: formDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if(isAuthValue) return <Redirect to="/profile" />

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}