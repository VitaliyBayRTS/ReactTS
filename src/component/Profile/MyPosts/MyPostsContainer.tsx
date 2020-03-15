import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import { PostDataInterface } from '../../../redux/store';
import MyPosts from './MyPosts';

interface PropsInterface {
    state: PostDataInterface
    dispatch: any
}


const MyPostsContainer: FunctionComponent<PropsInterface> = (props) => {
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let onChangeAction = (text: string | undefined) => {
        props.dispatch(newPostTextActionCreator(text));
    }
    
    return (
        <MyPosts addPost={addPost} 
                newPostText={onChangeAction}
                postData={props.state.PostData}
                newPostTextValue={props.state.newPostText} />
    )
}

export default MyPostsContainer;