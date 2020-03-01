import React, { FunctionComponent } from 'react';


interface PropsMessage {
    text: string
}

const DialogMessage: FunctionComponent<PropsMessage> = (props) => {
    return <div>
        {props.text}
    </div>
}

export default DialogMessage;