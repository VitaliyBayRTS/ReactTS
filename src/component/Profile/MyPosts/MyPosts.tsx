import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import { PostDataInterface } from '../../../redux/store';

interface PropsInterface {
    postData: any
    addPost: any
    newPostText: any
    newPostTextValue: any
}


const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    let PostDataElements = props.postData.map( (p: any) => <Post text={p.text} like={p.like} />);
    let componentRef = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        props.addPost();
    };

    let onChangeAction = () => {
        props.newPostText(componentRef.current?.value);
    }
    
    return (
        <div className={s.post_box}>
            My post
            <div>
                <textarea ref={componentRef} onChange={onChangeAction} value={props.newPostTextValue}/>
                <button onClick={addPost}>Add Post</button>
            </div>
            <div>
                {PostDataElements}
            </div>
        </div>
    )
}

export default MyPosts;