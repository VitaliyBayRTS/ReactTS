import React, { FunctionComponent, useState, useEffect } from 'react';
// import s from './MyProfile.module.scss';

interface PropsInterface {
    status: string
    updateUserStatusThunk: any
}

let ProfileStatusWithHook: FunctionComponent<PropsInterface> = (props) => {
    
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    let activeEditMode = () => {
        setEditMode(true)
    }

    let deactiveEditMode = () => {
        setEditMode(false)
        props.updateUserStatusThunk(status)
    }

    let onChangeStatus = (e: any) => {
        setStatus(e.currentTarget.value);
    }

        return (
            <>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activeEditMode}><b>Status: </b>{props.status || "-----"}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input onChange={onChangeStatus} onBlur={deactiveEditMode} autoFocus value={status} />
                    </div>
                }
            </>
        )
}

export default ProfileStatusWithHook;