import React, { FunctionComponent } from 'react';
import s from './Post.module.scss';

interface PropsInterface {
    text: string
    like: number
}

const Post: FunctionComponent<PropsInterface> = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img src="https://www.shareicon.net/data/512x512/2015/09/20/104337_avatar_512x512.png" alt="" />
                <div>
                    <p>{props.text}</p>
                </div>
                <p className={s.like}>Like: {props.like}</p>
            </div>
        </div>
    )
}

export default Post;