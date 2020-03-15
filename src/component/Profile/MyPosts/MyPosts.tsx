import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { addPostActionCreator,  newPostTextActionCreator} from '../../../redux/profileReducer';
import { PostDataInterface } from '../../../redux/state';

interface PropsInterface {
    state: PostDataInterface
    dispatch: any
}


const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    let PostDataElements = props.state.PostData.map( p => <Post text={p.text} like={p.like} />);
    let componentRef = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let onChangeAction = () => {
        props.dispatch(newPostTextActionCreator(componentRef.current?.value));
    }
    
    return (
        <div className={s.post_box}>
            My post
            <div>
                <textarea ref={componentRef} onChange={onChangeAction} value={props.state.newPostText}/>
                <button onClick={addPost}>Add Post</button>
            </div>
            <div>
                {PostDataElements}
            </div>
        </div>
    )
}

export default MyPosts;