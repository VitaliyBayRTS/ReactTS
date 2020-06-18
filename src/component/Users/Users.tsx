import React, { FunctionComponent } from "react";
import Paginator from "../../utilities/Paginator/Paginator";
import User from "./User/User";
import { usersType } from "../../types/types";

type PropsInterface = {
    users: Array<usersType>,
    usersCount: number,
    pageSize: number,
    currentPage: number,
    isAuth: boolean,
    onPaginationClick: (p: number) => void,
    disableUsers: Array<number>,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void
}

let Users: FunctionComponent<PropsInterface> = (props) => {

    return <div>
        <Paginator itemCount={props.usersCount} 
                    pageSize={props.pageSize} 
                    currentPage={props.currentPage}
                    onPaginationClick={props.onPaginationClick}
                    />
        {props.users.map((u: any) => <User disableUsers={props.disableUsers}
                        isAuth={props.isAuth}
                        unfollowThunk={props.unfollowThunk}
                        followThunk={props.followThunk}
                        key={u.id}
                        userData={u}
            /> 
        )}
    </div>
}

export default Users;