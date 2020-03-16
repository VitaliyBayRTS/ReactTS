import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import { PostDataInterface } from '../../../redux/store';
import MyPosts from './MyPosts';

interface PropsInterface {
    store: any
}

const MyPostsContainer: FunctionComponent<PropsInterface> = (props) => {
    let addPost = () => {
        props.store.dispatch(addPostActionCreator());

    };

    let onChangeAction = (text: string | undefined) => {
        props.store.dispatch(newPostTextActionCreator(text));
    }
    
    return (
        <MyPosts addPost={addPost} 
                newPostText={onChangeAction}
                postData={props.store.getState().profilePage.PostData}
                newPostTextValue={props.store.getState().profilePage.newPostText} />
    )
}

export default MyPostsContainer;