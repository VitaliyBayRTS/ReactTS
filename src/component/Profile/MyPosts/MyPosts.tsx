import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { PostDataInterface } from '../../../redux/state';

interface PropsInterface {
    state: PostDataInterface
    addPost: any
    changePostText: any
}

const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    // debugger;
    let PostDataElements = props.state.PostData.map( p => <Post text={p.text} like={p.like} />);
    let componentRef = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        props.addPost();
    };

    let onChangeAction = () => {
        props.changePostText(componentRef.current?.value);
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