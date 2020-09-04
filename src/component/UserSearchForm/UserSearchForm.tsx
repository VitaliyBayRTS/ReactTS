import React, { FC } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
    onFilterApply: (fitler: FilterType) => void
}

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}

let UserSearchForm: FC<PropsType> = React.memo((props) => {

    let onSubmitForm = (values: FormType, {setSubmitting}: {setSubmitting: (value: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterApply(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
       initialValues={{ term: '', friend: 'null'}}
       onSubmit={onSubmitForm}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Onlu Unfolowed</option>
            </Field>
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
    </div>
})

export default UserSearchForm