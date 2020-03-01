import React, { FunctionComponent } from 'react';
import s from './MyPosts.module.scss';
import Post from './Posts/Post';

interface PropsInterface {

}

interface PostDataInterface {
    text: string
    name: string
    like: number
};

const PostData: Array<PostDataInterface> = [
    {text: "Super puper ninja 1", name: "Ninja 1", like: 4},
    {text: "OMG I'm in Internet", name: "Ninja 2", like: 2},
    {text: "Join to my way of samurai", name: "Ninja 3", like: 13}
];

let PostDataElements = PostData.map( p => <Post text={p.text} name={p.name} like={p.like} />);



const MyPosts: FunctionComponent<PropsInterface> = (props) => {
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