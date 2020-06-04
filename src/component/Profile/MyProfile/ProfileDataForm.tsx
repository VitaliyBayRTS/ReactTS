import React, { FunctionComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../../utilities/ReduxForm/Form';
import s from './MyProfile.module.scss';
import e from './../../../utilities/ReduxForm/ReduxForm.module.scss';

const ProfileDataForm: FunctionComponent<any> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {props.error && <div className={e.commonError}> {props.error} </div>}
        <div>
            <b>Full Name: </b> <Field placeholder="Full Name" name="fullName" component={Input} validate={[]}/>
        </div>
        <div>
            <b>About me: </b> <Field placeholder="About me" name="aboutMe" component={Textarea} validate={[]}/>
        </div>
        <div>
            <b>Looking for a job: </b> <Field placeholder="Looking for a job" name="lookingForAJob" component={Input} 
                validate={[]} type="checkbox"/>
        </div>
        <div>
            <b>My profesional skills: </b> <Field placeholder="My profesional skills" name="lookingForAJobDescription" 
                component={Textarea} validate={[]}/>
        </div>
        <div>
            <b>Contacts: </b> {Object.keys(props.initialValues.contacts).map((key: any) => {
                return <div key={key} className={s.contactItem}>
                    <b>{key}: </b> <Field placeholder={key} name={"contacts." + key} component={Input} validate={[]}/>
                </div>
            })}
        </div>
    </form>)
}

const ProfileDataReduxForm = reduxForm({form: 'profileData'})(ProfileDataForm);

export default ProfileDataReduxForm;