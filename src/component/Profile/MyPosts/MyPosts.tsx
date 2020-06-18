import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../../utilities/validator/validator';
import { Textarea } from '../../../utilities/ReduxForm/Form';
import { postDataType } from '../../../types/types';

interface PropsInterface {
    postData: Array<postDataType>,
    addPost: (value: string) => void
}

const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    
    let PostDataElements = props.postData.map( (p: any) => <Post key={p.id} text={p.text} like={p.like} />);

    let addPost = (value: any) => {
        props.addPost(value.postBody);
        console.log(value.postBody)
    };
    
    return (
        <div className={s.post_box}>
            My post
            <AddReduxForm onSubmit={addPost}/>
            <div>
                {PostDataElements}
            </div>
        </div>
    )
}

let maxLength20 = maxLength(20);

const AddPost: FunctionComponent<any> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="postBody" validate={[maxLength20]}/>
            <button>Add Post</button>
        </form>
    )
}

let AddReduxForm = reduxForm({form: "post"})(AddPost);

export default MyPosts;