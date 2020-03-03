import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { PostDataInterface } from '../../../redux/state';

interface PropsInterface {
    state: Array<PostDataInterface>
    addPost: any
}

const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    // debugger;
    let PostDataElements = props.state.map( p => <Post text={p.text} name={p.name} like={p.like} />);
    let componentRef = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        let text: string | undefined = componentRef.current?.value;
        props.addPost(text);
    };

    
    return (
        <div className={s.post_box}>
            My post
            <div>
                <textarea ref={componentRef}></textarea>
                <button onClick={addPost}>Add Post</button>
            </div>
            <div>
                {PostDataElements}
            </div>
        </div>
    )
}

export default MyPosts;