import React, { FunctionComponent } from "react";
import Paginator from "../../utilities/Paginator/Paginator";
import User from "./User/User";

interface PropsInterface {
    users: any
    usersCount: any
    pageSize: any
    currentPage: any
    onPaginationClick: any
    disableUsers: any
    unfollowThunk: any
    followThunk: any
}

let Users: FunctionComponent<PropsInterface> = (props) => {

    return <div>
        <Paginator itemCount={props.usersCount} 
                    pageSize={props.pageSize} 
                    currentPage={props.currentPage}
                    onPaginationClick={props.onPaginationClick}
                    />
        {props.users.map((u: any) => <User disableUsers={props.disableUsers}
                        unfollowThunk={props.unfollowThunk}
                        followThunk={props.followThunk}
                        key={u.id}
                        userData={u}
            /> 
        )}
    </div>
}

export default Users;