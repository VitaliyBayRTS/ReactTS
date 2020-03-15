import React, { FunctionComponent } from 'react';

interface notsInterface  {
    text: string
}

const NotsItems: FunctionComponent<notsInterface> = (props) => {
    return(
        <div>
            <p>{props.text}</p>
        </div>
    );
}

export default NotsItems;