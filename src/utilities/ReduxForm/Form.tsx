import React, { FunctionComponent } from 'react';
import s from './ReduxForm.module.scss';
import { WrappedFieldProps } from 'redux-form';

export const Textarea: FunctionComponent<WrappedFieldProps> = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched;
   return (<div>
        <textarea className={hasError ? s.error : ""} {...input} {...props}/>
        {hasError && <span className={s.errorText}>{meta.error}</span>}
   </div>)
}

export const Input: FunctionComponent<WrappedFieldProps> = ({input, meta, ...props}) => {
    let hasError = meta.error && meta.touched;
   return (<div>
        <input className={hasError ? s.error : ""} {...input} {...props}/>
        {hasError && <span className={s.errorText}>{meta.error}</span>}
   </div>)
}