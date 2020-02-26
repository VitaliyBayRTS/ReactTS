import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';

interface PropsInterface {

}

const MyPosts: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div className={s.post_box}>
            My post
            <div>
                <textarea ></textarea>
                <button>Add Post</button>
            </div>
            <div>
                <Post text="Super puper ninja 1" name="Ninja 1" like={4} />
                <Post text="OMG I'm in Internet" name="Ninja 2" like={2}/>
                <Post text="Join to my way of samurai" name="Ninja 3" like={13}/>
            </div>
        </div>
    )
}

export default MyPosts;