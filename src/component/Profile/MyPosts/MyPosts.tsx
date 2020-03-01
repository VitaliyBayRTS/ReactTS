import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';
import { PostDataInterface } from '../../..';

interface PropsInterface {
    postData: Array<PostDataInterface>
}

const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    
    let PostDataElements = props.postData.map( p => <Post text={p.text} name={p.name} like={p.like} />);
    
    return (
        <div className={s.post_box}>
            My post
            <div>
                <textarea ></textarea>
                <button>Add Post</button>
            </div>
            <div>
                {PostDataElements}
            </div>
        </div>
    )
}

export default MyPosts;